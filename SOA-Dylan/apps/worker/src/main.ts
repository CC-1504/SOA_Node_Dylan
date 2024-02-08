import { NestFactory } from '@nestjs/core';
import { workerServiceModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        workerServiceModule,
        {
            transport: Transport.REDIS,
            options: {
                host: 'localhost',
                port: 6379
            }
        }
    );
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true
    }));
    await app.listen();
}
bootstrap();
