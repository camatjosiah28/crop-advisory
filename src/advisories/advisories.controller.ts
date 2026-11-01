import { Controller, Get, Post, Param, UseGuards, Request } from '@nestjs/common';
import { AdvisoriesService } from './advisories.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('advisories')
@UseGuards(JwtAuthGuard)
export class AdvisoriesController {
  constructor(private readonly advisoriesService: AdvisoriesService) {}

  @Post('generate/:cropId')
  generate(@Param('cropId') cropId: string, @Request() req: any) {
    return this.advisoriesService.generateAdvisory(+cropId, req.user.userId);
  }

  @Get()
  getHistory(@Request() req: any) {
    return this.advisoriesService.getHistory(req.user.userId);
  }
}