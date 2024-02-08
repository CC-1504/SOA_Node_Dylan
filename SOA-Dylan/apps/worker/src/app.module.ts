import { Module } from '@nestjs/common';
import { workerModule } from './worker/worker.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
    }),
    workerModule, 
    PrismaModule]
})
export class workerServiceModule {}
