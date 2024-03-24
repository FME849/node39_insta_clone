import multer from "multer";

const storage = multer.diskStorage({
    destination: process.cwd() + '/public/img',
    filename: (req, file, cb) => {
        const newName = new Date().getTime() + '_' + file.originalname;
        cb(null, newName);
    }
});
const upload = multer({ storage });

export default upload;