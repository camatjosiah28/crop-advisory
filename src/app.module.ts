import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CropsModule } from './crops/crops.module';
import { AdvisoriesModule } from './advisories/advisories.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT as string, 10) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'crop_advisory_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'super_secret_key_para_sa_crop_system_123',
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
    AuthModule,
    CropsModule,
    AdvisoriesModule, // <--- Idagdag ito
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}