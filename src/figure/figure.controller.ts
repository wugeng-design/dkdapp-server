import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FigureService } from './figure.service';
import { CreateFigureDto } from './dto/create-figure.dto';
import { UpdateFigureDto } from './dto/update-figure.dto';

@Controller('figures')
export class FigureController {
  constructor(private readonly figureService: FigureService) {}

  @Post()
  async create(@Body() createFigureDto: CreateFigureDto) {
    const figure = await this.figureService.create(createFigureDto);
    return {
      success: true,
      data: figure,
    };
  }

  @Get()
  async findAll(@Query('keyword') keyword?: string) {
    let figures;
    if (keyword) {
      figures = await this.figureService.search(keyword);
    } else {
      figures = await this.figureService.findAll();
    }
    return {
      success: true,
      data: figures,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const figure = await this.figureService.findOne(id);
    return {
      success: true,
      data: figure,
    };
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string) {
    const figure = await this.figureService.findByName(name);
    return {
      success: true,
      data: figure,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFigureDto: UpdateFigureDto) {
    const figure = await this.figureService.update(id, updateFigureDto);
    return {
      success: true,
      data: figure,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.figureService.remove(id);
    return {
      success: true,
      message: '删除成功',
    };
  }
}