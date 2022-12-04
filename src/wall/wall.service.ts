import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WallPage } from './entities/wall-page.entity';
import { Wall, WallDocument } from './entities/wall.entity';

@Injectable()
export class WallService {
  constructor(
    @InjectModel(Wall.name)
    private readonly wallModel: Model<WallDocument>,
  ) {}

  private static readonly PAGE_SIZE: number = 12;
  private totalRecords: number = 0;

  async create(wall: Wall): Promise<WallDocument> {
    return await this.wallModel.create(wall);
  }

  async getWallPage(pageNumber: number, fromTime: Date): Promise<WallPage> {
    const page: WallPage = new WallPage();

    page.data = await this.getWallPageContent(pageNumber, fromTime);

    await this.addPageLinks(page, pageNumber);
    return page;
  }

  private async getWallPageContent(
    pageNumber: number,
    fromTime: Date,
  ): Promise<WallDocument[]> {
    const pageStart: number = WallService.PAGE_SIZE * (pageNumber - 1);

    return this.wallModel
      .find({
        createdAt: { $lte: fromTime },
      })
      .sort({ createdAt: -1 })
      .skip(pageStart)
      .limit(WallService.PAGE_SIZE);
  }

  private async addPageLinks(
    page: WallPage,
    pageNumber: number,
  ): Promise<void> {
    page.current = `/contentposts/pages/${pageNumber}`;
    page.previous = this.calcPreviousPageLink(pageNumber);
    page.next = this.calcNextPageLink(pageNumber);

    this.totalRecords = await this.wallModel.countDocuments();
  }

  private calcPreviousPageLink(currentPageNumber: number) {
    let previousPageNumber: number = currentPageNumber - 1;

    if (this.doesPageExist(previousPageNumber)) return null;
    else return `/contentposts/pages/${previousPageNumber}`;
  }

  private calcNextPageLink(currentPageNumber: number) {
    let nextPageNumber: number = currentPageNumber + 1;

    if (this.doesPageExist(nextPageNumber)) return null;
    else return `/contentposts/pages/${nextPageNumber}`;
  }

  private doesPageExist(pageNumber: number): boolean {
    return Math.ceil(this.totalRecords / WallService.PAGE_SIZE) < pageNumber;
  }
}
