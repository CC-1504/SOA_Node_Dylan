import { NestFactory } from '@nestjs/core';
import { StorageServiceModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        StorageServiceModule,
        {

            transport: Transport.TCP,
            options: {
                host: 'localhost',
                port: 8000
            }
        }
    );
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true
    }));
    await app.listen();
}
bootstrap();
