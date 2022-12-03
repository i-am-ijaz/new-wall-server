import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Config } from '../config';

@ApiTags('Storage')
@Controller('storage')
export class StorageController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: Config.STORAGE_CONFIG.storagePath,
        filename: StorageController.editFileName,
      }),
    } as MulterOptions),
  )
  uploadedFile(@UploadedFile('file') file: Express.Multer.File) {
    return {
      baseUrl: `/storage/download/${file.originalname}`,
    };
  }

  @Post('uploads')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: Config.STORAGE_CONFIG.storagePath,
        filename: StorageController.editFileName,
      }),
    } as MulterOptions),
  )
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    let filePaths: string[] = [];

    for (var index in files) {
      filePaths.push(`/storage/download/${files[index].originalname}`);
      files[index].filename;
    }
    return {
      baseUrl: filePaths,
    };
  }

  static editFileName = (
    _req: any,
    file: { originalname: string },
    callback: (arg0: any, arg1: string) => void,
  ) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    callback(null, `${name}${fileExtName}`);
  };
}
