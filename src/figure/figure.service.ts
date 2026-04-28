import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Figure, FigureDocument } from './figure.schema';
import { CreateFigureDto } from './dto/create-figure.dto';
import { UpdateFigureDto } from './dto/update-figure.dto';

@Injectable()
export class FigureService {
  constructor(@InjectModel(Figure.name) private figureModel: Model<FigureDocument>) {}

  async create(createFigureDto: CreateFigureDto): Promise<Figure> {
    const existingFigure = await this.figureModel.findOne({ name: createFigureDto.name }).exec();
    if (existingFigure) {
      throw new ConflictException('人物名称已存在');
    }

    const createdFigure = new this.figureModel(createFigureDto);
    return createdFigure.save();
  }

  async findAll(): Promise<Figure[]> {
    return this.figureModel.find({ isActive: true }).sort({ eraOrder: 1, name: 1 }).exec();
  }

  async findOne(id: string): Promise<Figure> {
    const figure = await this.figureModel.findById(id).exec();
    if (!figure) {
      throw new NotFoundException('人物不存在');
    }
    return figure;
  }

  async findByName(name: string): Promise<Figure | null> {
    return this.figureModel.findOne({ name, isActive: true }).exec();
  }

  async update(id: string, updateFigureDto: UpdateFigureDto): Promise<Figure> {
    const updatedFigure = await this.figureModel.findByIdAndUpdate(id, updateFigureDto, { new: true }).exec();
    if (!updatedFigure) {
      throw new NotFoundException('人物不存在');
    }
    return updatedFigure;
  }

  async remove(id: string): Promise<Figure> {
    const figure = await this.figureModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).exec();
    if (!figure) {
      throw new NotFoundException('人物不存在');
    }
    return figure;
  }

  async search(keyword: string): Promise<Figure[]> {
    return this.figureModel.find({
      isActive: true,
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { era: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    }).exec();
  }
}