import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenuGenre } from './menu-genre.enum';
import { Menu } from './menu.model';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu2 } from './schemas/menu.schema';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  findAll(): Menu[] {
    return this.menusService.findAll();
  }

  // @Get(':id')
  // findById(@Param('id', ParseUUIDPipe) id: string): Menu[] {
  //   return this.menusService.findById(id);
  // }

  @Get('genre/:genre')
  findByGenre(@Param('genre') genre: MenuGenre): Menu[] {
    return this.menusService.findByGenre(genre);
  }

  @Post()
  create(@Body() createMenuDto: CreateMenuDto): Menu {
    return this.menusService.create(createMenuDto);
  }

  //
  //
  //
  //
  //
  //
  //
  //

  @Post('/mongo')
  async createMongo(@Body() createMenuDto: CreateMenuDto): Promise<Menu2> {
    return await this.menusService.createMongo(createMenuDto);
  }

  @Get('/mongo')
  async findAllMongo() {
    return this.menusService.findAllMongo();
  }

  @Delete(':id')
  async deleteMongo(@Param('id') id: string) {
    return this.menusService.deleteMongo(id);
  }
}
