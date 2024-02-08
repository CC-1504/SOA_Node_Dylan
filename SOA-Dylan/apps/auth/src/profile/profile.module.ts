import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  exports: [ProfileService],
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [JwtModule, PrismaModule]
})
export class ProfileModule {}
