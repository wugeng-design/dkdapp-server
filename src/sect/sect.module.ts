import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SectService } from './sect.service';
import { SectController } from './sect.controller';
import { Sect, SectSchema } from './sect.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Sect.name, schema: SectSchema }])],
  controllers: [SectController],
  providers: [SectService],
  exports: [SectService],
})
export class SectModule {}