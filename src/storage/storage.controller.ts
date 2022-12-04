import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Config } from '../config';
const sharp = require('sharp');

export class ImageDetail {
  url: string;
  thumbnilUrl: string;
}

@ApiTags('Storage')
@Controller('storage')
export class StorageController {
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: Config.STORAGE_CONFIG.imagesPath,
        filename: StorageController.editFileName,
      }),
    } as MulterOptions),
  )
  async uploadedFile(@UploadedFile('file') file: Express.Multer.File) {
    console.log(StorageController.editFileName);
    const thumbnil = await this.generateThumbnil(file);

    return {
      url: `/storage/download/${file.filename}`,
      thumbnil: `/storage/download/${thumbnil}`,
    };
  }

  @Post('uploads')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: Config.STORAGE_CONFIG.imagesPath,
        filename: StorageController.editFileName,
      }),
    } as MulterOptions),
  )
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    let filePaths: ImageDetail[] = [];

    for (var index in files) {
      const thumbnil = await this.generateThumbnil(files[index]);
      filePaths.push({
        url: `/storage/download/${files[index].filename}`,
        thumbnilUrl: `/storage/download/${thumbnil}`,
      });
    }
    return {
      filePaths,
    };
  }

  private async generateThumbnil(file: Express.Multer.File): Promise<string> {
    const thumbnil = `thumbnail-${file.filename}`;
    await sharp(file.path)
      .resize(200, 200)
      .toFile(`storage/images/${thumbnil}`, (err, resizeImage) => {
        if (err) {
          console.log(err);
        } else {
          console.log('');
        }
      });
    return thumbnil;
  }

  private static editFileName = (
    _req: any,
    file: { originalname: string },
    callback: (arg0: any, arg1: string) => void,
  ) => {
    const fileExtName = extname(file.originalname);
    const timeInMillis = new Date().getTime();

    const filename = `${timeInMillis}${fileExtName}`;
    callback(null, filename);
  };
}
