import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';
import createHttpError from 'http-errors';

const storage = multer.diskStorage({
    // destination: function (req, file, callback) {
    //     callback(null, TEMP_UPLOAD_DIR);
    // },
    destination: TEMP_UPLOAD_DIR,
    filename: function (req, file, callback) {
        const uniqueSuffix = Date.now();
        callback(null, `${uniqueSuffix}_${file.originalname}`);
    },
});

const limits = {
    fileSize: 1024 * 1024 * 5, //5mb
};

const fileFilter = (req, file, callback) => {
    const extension = file.originalname.split(".").pop();
    if (extension === "exe") {
        return callback(createHttpError(400, "exe not valid extension"));
    };
    callback(null, true);
};

export const upload = multer({
    storage,
    limits,
    fileFilter,
});