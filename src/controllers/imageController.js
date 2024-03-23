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

