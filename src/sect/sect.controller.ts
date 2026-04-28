import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SectService } from './sect.service';
import { CreateSectDto } from './dto/create-sect.dto';
import { UpdateSectDto } from './dto/update-sect.dto';

@Controller('sects')
export class SectController {
  constructor(private readonly sectService: SectService) {}

  @Post()
  async create(@Body() createSectDto: CreateSectDto) {
    const sect = await this.sectService.create(createSectDto);
    return {
      success: true,
      data: sect,
    };
  }

  @Get()
  async findAll(
    @Query('keyword') keyword?: string,
    @Query('dynasty') dynasty?: string,
  ) {
    let sects;
    if (keyword) {
      sects = await this.sectService.search(keyword);
    } else if (dynasty) {
      sects = await this.sectService.findByDynasty(dynasty);
    } else {
      sects = await this.sectService.findAll();
    }
    return {
      success: true,
      data: sects,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const sect = await this.sectService.findOne(id);
    return {
      success: true,
      data: sect,
    };
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string) {
    const sect = await this.sectService.findByName(name);
    return {
      success: true,
      data: sect,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSectDto: UpdateSectDto) {
    const sect = await this.sectService.update(id, updateSectDto);
    return {
      success: true,
      data: sect,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.sectService.remove(id);
    return {
      success: true,
      message: '删除成功',
    };
  }
}