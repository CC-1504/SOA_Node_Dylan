import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { Client, ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitRPC } from '@nestjs-plus/rabbitmq';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule, 
        ProfileModule,
        PrismaModule,
        UserModule
    ]
})
export class AuthServiceModule {}
