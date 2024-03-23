import jwt from "jsonwebtoken";

export const createToken = (data) => jwt.sign(data, "SECRET", { algorithm: "HS256" });

export const checkToken = (token) => jwt.verify(token, "SECRET", (err) => console.log(err));

export const decodeToken = (token) => jwt.decode(token)

export const midVerifyToken = (req, res, next) => {
    let { token } = req.headers;
    
    let check = checkToken(token)

    if (check == null)
        next()
    else
        responseApi(res, 401, "", check)
}