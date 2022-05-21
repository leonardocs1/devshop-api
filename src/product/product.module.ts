import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from './product.entity'
import { ProductResolver } from './product.resolver'
import { ProductService } from './product.service'
import { ProductSlugIsUnique } from './validations/ProductSlugIsUnique'
import { s3 } from 'src/utils/s3'

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService, ProductResolver, ProductSlugIsUnique, s3]
})
export class ProductModule {}
