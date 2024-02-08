import { Module } from '@nestjs/common';
import { UnitController } from './unit.controller';
import { UnitService } from './unit.service';
import { StorageModule } from './../storage/storage.module';
import { AuthModule } from 'apps/auth/src/auth/auth.module';
import { UserModule } from '../../../auth/src/user/user.module';

@Module({
  controllers: [UnitController],
  providers: [UnitService],
  exports: [UnitService],
  imports: [StorageModule, UserModule]
})
export class UnitModule {}
