import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advisory } from './entities/advisory.entity';
import { Crop } from '../crops/entities/crop.entity';

@Injectable()
export class AdvisoriesService {
  constructor(
    @InjectRepository(Advisory)
    private advisoriesRepository: Repository<Advisory>,
    @InjectRepository(Crop)
    private cropsRepository: Repository<Crop>,
  ) {}

  async generateAdvisory(cropId: number, userId: number) {
    const crop = await this.cropsRepository.findOne({
      where: { cropId, user: { userId } },
    });

    if (!crop) {
      throw new NotFoundException('Crop not found');
    }

    const today = new Date();
    const plantingDate = new Date(crop.plantingDate);
    const diffTime = Math.abs(today.getTime() - plantingDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const mockWeather = { rainfall: 55, temperature: 36 };

    let advisoryType = 'Normal';
    let riskLevel = 'Low';
    let message = `Weather is favorable for your ${crop.cropType}.`;

    if (mockWeather.rainfall > 50 && diffDays < 14) {
      advisoryType = 'Flood Risk';
      riskLevel = 'High';
      message = `Heavy rain (${mockWeather.rainfall}mm) expected. Your young ${crop.cropType} is only ${diffDays} days old. Ensure proper drainage to prevent flooding.`;
    } 
    else if (mockWeather.temperature > 35) {
      if (crop.cropType === 'Rice') {
        advisoryType = 'Irrigation Reminder';
        riskLevel = 'Medium';
        message = `High heat (${mockWeather.temperature}°C) expected. Rice needs constant water. Maintain 2-3cm water level in your paddy.`;
      } else if (crop.cropType === 'Tomato' || crop.cropType === 'Eggplant') {
        advisoryType = 'Heat Stress Alert';
        riskLevel = 'High';
        message = `Extreme heat (${mockWeather.temperature}°C) can cause flower drop in ${crop.cropType}. Water deeply early morning and use mulch.`;
      } else {
        advisoryType = 'Irrigation Reminder';
        riskLevel = 'Medium';
        message = `High heat (${mockWeather.temperature}°C) expected. Irrigate your ${crop.cropType} early morning or late afternoon.`;
      }
    }
    else if (mockWeather.rainfall > 20 && mockWeather.rainfall <= 50) {
      if (crop.cropType === 'Corn') {
         advisoryType = 'Pest Warning';
         riskLevel = 'Medium';
         message = `Moderate rain and humidity may attract Fall Armyworms in your Corn. Inspect leaves regularly.`;
      }
    }

    const newAdvisory = this.advisoriesRepository.create({
      crop,
      advisoryType,
      riskLevel,
      message,
    });

    return this.advisoriesRepository.save(newAdvisory);
  }

  async getHistory(userId: number) {
    return this.advisoriesRepository.find({
      where: { crop: { user: { userId } } },
      relations: ['crop'] as any,
      order: { createdAt: 'DESC' },
    });
  }
}