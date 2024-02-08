import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AuthServiceModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'auth_queue',
                queueOptions: {
                    durable: false,
                },
            }
        }
    );
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true
    }));
    await app.listen();
}
bootstrap();
