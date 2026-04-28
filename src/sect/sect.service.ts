import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sect, SectDocument } from './sect.schema';
import { CreateSectDto } from './dto/create-sect.dto';
import { UpdateSectDto } from './dto/update-sect.dto';

@Injectable()
export class SectService {
  constructor(@InjectModel(Sect.name) private sectModel: Model<SectDocument>) {}

  async create(createSectDto: CreateSectDto): Promise<Sect> {
    const existingSect = await this.sectModel.findOne({ name: createSectDto.name }).exec();
    if (existingSect) {
      throw new ConflictException('派系名称已存在');
    }

    const createdSect = new this.sectModel(createSectDto);
    return createdSect.save();
  }

  async findAll(): Promise<Sect[]> {
    return this.sectModel.find({ isActive: true }).sort({ dynasty: 1, name: 1 }).exec();
  }

  async findOne(id: string): Promise<Sect> {
    const sect = await this.sectModel.findById(id).exec();
    if (!sect) {
      throw new NotFoundException('派系不存在');
    }
    return sect;
  }

  async findByName(name: string): Promise<Sect | null> {
    return this.sectModel.findOne({ name, isActive: true }).exec();
  }

  async update(id: string, updateSectDto: UpdateSectDto): Promise<Sect> {
    const updatedSect = await this.sectModel.findByIdAndUpdate(id, updateSectDto, { new: true }).exec();
    if (!updatedSect) {
      throw new NotFoundException('派系不存在');
    }
    return updatedSect;
  }

  async remove(id: string): Promise<Sect> {
    const sect = await this.sectModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).exec();
    if (!sect) {
      throw new NotFoundException('派系不存在');
    }
    return sect;
  }

  async search(keyword: string): Promise<Sect[]> {
    return this.sectModel.find({
      isActive: true,
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { dynasty: { $regex: keyword, $options: 'i' } },
        { practice: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    }).exec();
  }

  async findByDynasty(dynasty: string): Promise<Sect[]> {
    return this.sectModel.find({ dynasty, isActive: true }).sort({ name: 1 }).exec();
  }
}