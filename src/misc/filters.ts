import { HttpException, HttpStatus } from "@nestjs/common";

export const imageFilter = (request, file, callback) => {
    if (!file.originalname.match(/\.(jpg|png)/)) {
        callback(new HttpException("Unsupported media type", HttpStatus.UNSUPPORTED_MEDIA_TYPE), false);
        return;
    }

    if (!(file.mimetype.includes("jpeg") || file.mimetype.includes("png"))) {
        callback(new HttpException("Unsupported media type", HttpStatus.UNSUPPORTED_MEDIA_TYPE), false);
        return;
    }

    callback(null, true);

};