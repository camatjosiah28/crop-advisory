import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvisoriesService } from './advisories.service';
import { AdvisoriesController } from './advisories.controller';
import { Advisory } from './entities/advisory.entity';
import { Crop } from '../crops/entities/crop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Advisory, Crop])],
  controllers: [AdvisoriesController],
  providers: [AdvisoriesService],
})
export class AdvisoriesModule {}