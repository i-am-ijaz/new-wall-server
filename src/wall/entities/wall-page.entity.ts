import { WallDocument } from './wall.entity';

export class WallPage {
  previous: string;
  next: string;
  current: string;
  data: WallDocument[];
}
