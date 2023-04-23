import { MenuGenre } from '../menu-genre.enum';
import { HydratedDocument } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type MenuDocument = HydratedDocument<Menu2>;

@Schema()
export class Menu2 {
  @Prop()
  name: string;

  @Prop()
  genre: MenuGenre;

  @Prop()
  memo: string;
}

export const MenuSchema = SchemaFactory.createForClass(Menu2);
