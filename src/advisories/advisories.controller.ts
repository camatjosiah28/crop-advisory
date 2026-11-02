import { Controller, Get, Post, Param, UseGuards, Request, InternalServerErrorException } from '@nestjs/common';
import { AdvisoriesService } from './advisories.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('advisories')
@UseGuards(JwtAuthGuard)
export class AdvisoriesController {
  constructor(private readonly advisoriesService: AdvisoriesService) {}

  @Post('generate/:cropId')
  async generate(@Param('cropId') cropId: string, @Request() req: any) {
    try {
      // Siguraduhing number si userId
      return await this.advisoriesService.generateAdvisory(+cropId, Number(req.user.userId));
    } catch (error) {
      console.error("BACKEND ERROR:", error);
      throw new InternalServerErrorException(String(error));
    }
  }

  @Get()
  async getHistory(@Request() req: any) {
    return this.advisoriesService.getHistory(Number(req.user.userId));
  }
}