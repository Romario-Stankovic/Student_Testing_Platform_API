import { Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { StorageConfiguration } from 'src/configs/config';

@Controller("api/tests")
export class AppController {

  constructor(
  ) { }


  @Post("uploadPhoto")
  @UseInterceptors(FileInterceptor(
    "image",
    {
      storage: diskStorage({
        destination: StorageConfiguration.image.destination,
        filename: (request, file, callback) => {
          let originalName: string = file.originalname;
          let normalizedName = originalName.replace(/\s+/g, "-");
          let now = new Date();

          let datePart = "";
          let radnomPart = "";

          datePart += now.getFullYear().toString() + (now.getMonth() + 1).toString() + now.getDate().toString();
          radnomPart = new Array(10).fill(0).map(e => (Math.random() * 9).toFixed(0).toString()).join("");

          let fileName = datePart + "-" + radnomPart + "-" + normalizedName;
          callback(null, fileName);
          
        }
      }),
      fileFilter: (request, file, callback) => {
        if(!file.originalname.match(/\.(jpg|png)$/)){
          callback(new Error("Wrong file format"), false);
          return;
        }

        if(!(file.mimetype.includes("jpeg") || file.mimetype.includes("png"))){
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
  async uploadPhoto(@UploadedFile() image){
      console.log(image);
  }

}
