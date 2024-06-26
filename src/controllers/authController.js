import { createToken, decodeToken } from "../config/jwt.js";
import responseApi from "../config/response.js";
import prisma from "../models/prisma.js";
import bcrypt from "bcrypt";
import { exclude } from "../utils/helpers.js";

export const handleSignUp = async (req, res) => {
    try {
        const { email, password, fullName, age } = req.body;
        
        const isUserExist = await prisma.nguoi_dung.findFirst({
            where: {
                email,
            },
        });

        if (isUserExist) {
            responseApi(res, 400, "", "Account existed" );
        } else {
            const newUser = {
                email,
                mat_khau: bcrypt.hashSync(password, 10),
                ho_ten: fullName,
                tuoi: parseInt(age),
            };

            const newAccount = await prisma.nguoi_dung.create({
                data: newUser,
            });
            responseApi(res, 200, newAccount, "Successful");
        }
    } catch (err) {
        console.error(err);
        responseApi(res, 500, err, "Failed")
    }
};

export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.nguoi_dung.findFirst({
            where: {
                email,
            }
        });

        if (user) {
            if (bcrypt.compareSync(password, user.mat_khau)) {
                const token = createToken({ userId: user.nguoi_dung_id });

                responseApi(res, 200, token, "Successfully login");
            } else {
                responseApi(res, 400, "", "Incorrect password");
            }
        } else {
            responseApi(res, 400, "", "Invalid account");
        }
    } catch (err) {
        responseApi(res, 500, err, "Failed");
    }
}

export const handleGetUser = async (req, res) => {
    try {
        const { token } = req.headers;
        const { userId } = decodeToken(token);

        const data = await prisma.nguoi_dung.findUnique({
            where: {
                nguoi_dung_id: userId,
            },
            include: {
                hinh_anh: {
                    where: {
                        nguoi_dung_id: userId,
                    },
                },
                luu_anh: {
                    where: {
                        nguoi_dung_id: userId,
                    },
                },
            },
        });
        const userWithoutPassword = exclude(data, ['mat_khau'])

        responseApi(res, 200, userWithoutPassword, "Successful");
    } catch (err) {
        responseApi(res, 500, err, "Failed");
    }
}

export const handleUpdateUserInfo = async (req, res) => {
    try {
        const { userId } = decodeToken(req.headers.token);

        const currentUserData = await prisma.nguoi_dung.findUnique({
            where: {
                nguoi_dung_id: userId,
            },
        });

        const newUserData = {
            ...currentUserData,
            ...req.body,
        }
        
        await prisma.nguoi_dung.update({
            where: {
                nguoi_dung_id: currentUserData.nguoi_dung_id,
            },
            data: newUserData,
        })

        responseApi(res, 200, exclude(newUserData, ['mat_khau']), "Successful");
    } catch (err) {
        responseApi(res, 500, err, "Failed");
    }
}