import { MenuGenre } from '../menu-genre.enum';

export class CreateMenuDto {
  readonly name: string;
  readonly genre: MenuGenre;
  readonly memo: string;
}
