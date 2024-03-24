import responseApi from "../config/response.js";
import prisma from "../models/prisma.js";

export const handleGetImages = async (req, res) => {
    try {
        const allImages = await prisma.hinh_anh.findMany();

        responseApi(res, 200, allImages, "Successful");
    } catch (err) {
        responseApi(res, 500, "", "Failed");
    } 
};

export const handleGetImagesByName = async (req, res) => {
    try {
        const {imgName} = req.params;
        const listImgByName = await prisma.hinh_anh.findMany({
            where: {
                ten_hinh: {
                    contains: imgName,
                },
            },
        });

        responseApi(res, 200, listImgByName, "Successful");
    } catch(err) {
        responseApi(res, 500, "", "Failed");
    }
}

export const handleGetImageDetail = async (req, res) => {
    try {
        const { imgId } = req.params;
        const imgDetail = await prisma.hinh_anh.findUnique({
            where: {
                hinh_id: imgId,
            },
            include: {
                binh_luan: true,
                nguoi_dung: true,
            }
        })
        
        responseApi(res, 200, imgDetail, "Successful");
    } catch(err) {
        responseApi(res, 500, "", "Failed");
    }
}
