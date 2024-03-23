import { createToken } from "../config/jwt.js";
import responseApi from "../config/response.js";
import prisma from "../models/prisma.js";
import bcrypt from "bcrypt";

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