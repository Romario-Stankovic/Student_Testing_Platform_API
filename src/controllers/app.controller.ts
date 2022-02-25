import { Body, Controller, Get, Head, Header, Param, Post, Put, Query, Req, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { StorageConfiguration } from 'src/configs/config';

import { Request } from 'express';

import { Express } from 'express';

@Controller("api/experimental")
export class AppController {

    constructor(
    ) { }


    @Post("uploadPhoto")
    @UseInterceptors(FileInterceptor(
        "file",
        {
            storage: diskStorage({
                destination: StorageConfiguration.image.destination,
                filename: (request, file, callback) => {
                    let originalName: string = file.originalname;
                    let normalizedName = originalName.replace(/\s+/g, "-");
                    let now = new Date();

                    let datePart = "";
                    let randomPart = "";

                    datePart += now.getFullYear().toString() + (now.getMonth() + 1).toString() + now.getDate().toString();
                    randomPart = new Array(10).fill(0).map(e => (Math.random() * 9).toFixed(0).toString()).join("");

                    let fileName = datePart + "-" + randomPart + "-" + normalizedName;
                    callback(null, fileName);

                }
            }),
            fileFilter: (request, file, callback) => {
                if (!file.originalname.match(/\.(jpg|png)$/)) {
                    callback(new Error("Wrong file format"), false);
                    return;
                }

                if (!(file.mimetype.includes("jpeg") || file.mimetype.includes("png"))) {
                    callback(new Error("Bad content"), false);
                    return;
                }

                callback(null, true);

            },
            limits: {
                files: 1,
                fileSize: StorageConfiguration.image.maxSize
            }
        }
    ))
    async uploadPhoto(@UploadedFile() image) {
        console.log(image);
    }

    @Post("uploadPhoto2")
    @UseInterceptors(FileInterceptor("file"))
    async uploadPhoto2(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
        console.log(req.headers);
        console.log(file);
    }

}
