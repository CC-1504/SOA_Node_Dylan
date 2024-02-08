import { Module } from '@nestjs/common';
import { productController } from './product.controller';
import { productService } from './product.service';
import { UnitModule } from '../unit/unit.module'; 

@Module({
    controllers: [productController],
    providers: [productService],
    imports: [UnitModule],
})
export class productModule {}
