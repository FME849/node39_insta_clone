import fs from "fs";
import sharp from "sharp";
import responseApi from "../config/response.js";
import prisma from "../models/prisma.js";
import { decodeToken } from "../config/jwt.js";

export const handleGetImages = async (req, res) => {
    try {
        const allImages = await prisma.hinh_anh.findMany();

        responseApi(res, 200, allImages, "Successful");
    } catch (err) {
        responseApi(res, 500, err, "Failed");
    } 
};

export const handleSearchImagesByName = async (req, res) => {
    try {
        const { imgName } = req.query;
        const listImgByName = await prisma.hinh_anh.findMany({
            where: {
                ten_hinh: {
                    contains: imgName,
                },
            },
        });

        responseApi(res, 200, listImgByName, "Successful");
    } catch(err) {
        responseApi(res, 500, err, "Failed");
    }
}

export const handleGetImageDetail = async (req, res) => {
    try {
        const { imgId } = req.query;
        const imgDetail = await prisma.hinh_anh.findUnique({
            where: {
                hinh_id: parseInt(imgId),
            },
            include: {
                nguoi_dung: {
                    select: {
                        nguoi_dung_id: true,
                        email: true,
                        tuoi: true,
                        anh_dai_dien: true,
                    }
                },
            }
        })
        
        responseApi(res, 200, imgDetail, "Successful");
    } catch(err) {
        responseApi(res, 500, err, "Failed");
    }
}

export const handleGetCommentByImage = async (req, res) => {
    try {
        const { imgId } = req.query;
    
        const data = await prisma.binh_luan.findMany({
            where: {
                hinh_id: parseInt(imgId),
            },
        });

        responseApi(res, 200, data, "Successful");
    } catch(err) {
        responseApi(res, 500, err, "Failed")
    }
}

export const handleUploadImage = async (req, res) => {
    try {
        const { file, headers, body } = req;
        const imgPath = process.cwd() + '/public/img/' + file.filename;
        const imgBuffer = fs.readFileSync(imgPath);
        const [originalName] = file.filename.split('.');

        await sharp(imgBuffer).webp({quality: 70}).toFile(`${process.cwd()}/public/img/${originalName}.webp`);
        fs.rmSync(imgPath);

        const { userId } = decodeToken(headers.token);
        const newImage = {
            ten_hinh: originalName + '.webp',
            duong_dan: originalName + '.webp',
            mo_ta: body.description || '',
            nguoi_dung_id: userId,
        } 
        const newRecord = await prisma.hinh_anh.create({
            data: newImage,
        });

        responseApi(res, 200, newRecord, "Successful");
    } catch(err) {
        responseApi(res, 500, err, "Failed");
    }
}

export const handleCheckSavedImage = async (req, res) => {
    try {
        const { imgId, userId } = req.query;
    
        const data = await prisma.luu_anh.findFirst({
            where: {
                hinh_id: parseInt(imgId),
                nguoi_dung_id: parseInt(userId),
            },
        });

        responseApi(res, 200, data, 'Successful');
    } catch(err) {
        responseApi(res, 500, err, 'Failed');
    }
}

export const handleCommentOnImage = async (req, res) => {
    try {
        const { imgId, content } = req.body;
        const { userId } = decodeToken(req.headers.token);

        const newComment = {
            hinh_id: parseInt(imgId),
            nguoi_dung_id: parseInt(userId),
            noi_dung: content,
            ngay_binh_luan: new Date(),
        }
        const data = await prisma.binh_luan.create({
            data: newComment,
        });

        responseApi(res, 200, data, "Successful");
    } catch(err) {
        responseApi(res, 500, err, "Failed");
    }
}

export const handleDeleteImage = async (req, res) => {
    try {
        const { imgId } = req.query;
        const { userId } = decodeToken(req.headers.token);

        const image = await prisma.hinh_anh.findUnique({
            where: {
                hinh_id: parseInt(imgId),
            },
        })

        if (!image) {
            responseApi(res, 500, "There is no image", "Failed");
            return;
        }

        if (image.nguoi_dung_id !== userId) {
            responseApi(res, 401, "Do not have permission to delete image", "Denied");
        }

        const deleteComments = prisma.binh_luan.deleteMany({
            where: {
                hinh_id: image.hinh_id,
            },
        })

        const deleteSaved = prisma.luu_anh.deleteMany({
            where: {
                hinh_id: image.hinh_id,
            },
        })

        const deleteImage = prisma.hinh_anh.delete({
            where: {
                hinh_id: image.hinh_id,
            },
        })

        const transaction = await prisma.$transaction([deleteComments, deleteSaved, deleteImage]);

        if (transaction[2]) {
            fs.rmSync(`public/img/${transaction[2].duong_dan}`);
        }

        responseApi(res, 200, transaction, "Successful");
    } catch (err) {
        console.log(err);
        responseApi(res, 500, err, "Failed");
    }
}