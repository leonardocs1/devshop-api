import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { s3 } from 'src/utils/s3'
import { Brand } from './brand.entity'
import { BrandResolver } from './brand.resolver'
import { BrandService } from './brand.service'
import { BrandSlugIsUnique } from './validations/BrandSlugIsUnique'

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  providers: [BrandService, BrandResolver, BrandSlugIsUnique, s3]
})
export class BrandModule {}
