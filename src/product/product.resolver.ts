import { Args, Mutation, Query } from '@nestjs/graphql'
import { Resolver } from '@nestjs/graphql'
import { ProductPublic } from './dto/product'
import { ProductCreateInput } from './dto/product-create.input'
import { ProductService } from './product.service'
import { Product } from './product.entity'
import { Category } from 'src/category/category.entity'
import { ProductMapper } from './product.mapper'

@Resolver(of => ProductPublic)
export class ProductResolver {
  constructor(private readonly producService: ProductService) {}

  @Query(returns => [ProductPublic], { name: 'getAllProducts' })
  async getAllProducts(): Promise<ProductPublic[]> {
    return await this.producService.findAll()
  }

  @Mutation(returns => ProductPublic, { name: 'createProduct' })
  async createProduct(
    @Args('input') input: ProductCreateInput
  ): Promise<ProductPublic> {
    return this.producService.create(ProductMapper.toEntity(input))
  }
}
