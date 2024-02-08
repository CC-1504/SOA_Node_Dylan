import { Module } from '@nestjs/common';
import { workerController } from './worker.controller';
import { workerService } from './worker.service';

@Module({
  controllers: [workerController],
  providers: [workerService]
})
export class workerModule {}
