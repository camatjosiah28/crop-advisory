import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crop } from './entities/crop.entity';

@Injectable()
export class CropsService {
  constructor(
    @InjectRepository(Crop)
    private cropsRepository: Repository<Crop>,
  ) {}

  async create(cropData: any, userId: number) {
    const newCrop = this.cropsRepository.create({
      ...cropData,
      user: { userId },
    });
    return this.cropsRepository.save(newCrop);
  }

  async findAllByUser(userId: number) {
    return this.cropsRepository.find({
      where: { user: { userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, userId: number) {
    return this.cropsRepository.findOne({
      where: { cropId: id, user: { userId } },
    });
  }

  async update(id: number, updateData: any, userId: number) {
    // Sinisiguro natin na yung farmer lang na may-ari ang pwedeng mag-update
    await this.cropsRepository.update(
      { cropId: id, user: { userId } },
      updateData,
    );
    return this.findOne(id, userId);
  }

  async remove(id: number, userId: number) {
    const crop = await this.findOne(id, userId);
    if (crop) {
      return this.cropsRepository.remove(crop);
    }
    return null;
  }
}