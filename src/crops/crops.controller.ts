import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CropsService } from './crops.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('crops')
@UseGuards(JwtAuthGuard) // Lahat ng endpoints dito, need ng token
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Post()
  create(@Body() createCropDto: any, @Request() req: any) {
    return this.cropsService.create(createCropDto, req.user.userId);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.cropsService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.cropsService.findOne(+id, req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: any, @Request() req: any) {
    return this.cropsService.update(+id, updateData, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.cropsService.remove(+id, req.user.userId);
  }
}