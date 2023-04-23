import { Injectable } from '@nestjs/common';
import { Menu } from './menu.model';
import { MenuGenre } from './menu-genre.enum';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu2 } from './schemas/menu.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MenusService {
  constructor(@InjectModel('menu') private menuModel: Model<Menu2>) {}
  private menus: Menu[] = [];
  findAll(): Menu[] {
    return this.menus;
  }

  // findById(id: string): Menu[] {
  //   return this.menus.filter((menu) => menu.id === id);
  // }

  findByGenre(genre: MenuGenre): Menu[] {
    return this.menus.filter((menu) => menu.genre === genre);
  }

  create(createMenuDto: CreateMenuDto): Menu {
    const menu: Menu = {
      ...createMenuDto,
    };
    this.menus.push(menu);
    return menu;
  }
  //
  //
  //
  //
  //
  //
  //

  async createMongo(createMenuDto: CreateMenuDto): Promise<Menu2> {
    const createdMenu = new this.menuModel(createMenuDto);
    return createdMenu.save();
  }

  async findAllMongo() {
    return await this.menuModel.find().exec();
  }

  async deleteMongo(id: string) {
    const deletedMenu = await this.menuModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedMenu;
  }
}
