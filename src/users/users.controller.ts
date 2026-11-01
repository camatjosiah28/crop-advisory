import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile-data')
  async getProfileData(@Request() req: any) {
    const user = await this.usersService.findOneById(req.user.userId);
    if (!user) return { message: 'User not found' };
    return {
      fullName: user.fullName || 'Farmer',
      email: user.email,
      location: user.location || 'Not set',
      role: user.role
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-profile')
  async updateProfile(@Body() updateData: any, @Request() req: any) {
    return this.usersService.updateProfile(req.user.userId, updateData);
  }
  @UseGuards(JwtAuthGuard)
  @Get('admin/all-users')
  async getAllUsers() {
    const users = await this.usersService.findAllUsers();
    // Aalisin natin yung password sa bawat user
    return users.map(user => {
      const { password, ...result } = user;
      return result;
    });
  }
}