import { Product } from './product.entity'
import { ProductCreateInput } from './dto/product-create.input'
import { Category } from 'src/category/category.entity'
import { ProductUpdateInput } from './dto/product-update.input'
import { ProductPublic } from './dto/product'

export class ProductMapper {
  public static toEntity(input: ProductCreateInput): Product {
    const entity = new Product()
    entity.name = input.name
    entity.slug = input.slug
    entity.description = input.description

    const category = new Category()
    category.id = input.category
    entity.category = category
    entity.sku = input.sku
    entity.price = input.price
    entity.weight = input.weight
    entity.stock = input.stock

    entity.optionNames = input.optionNames

    // TODO
    entity.variations = input.variations

    return entity
  }

  public static fromUpdateToEntity(input: ProductUpdateInput): Product {
    const entity = new Product()
    entity.id = input.id
    entity.name = input.name
    entity.slug = input.slug
    entity.description = input.description

    const category = new Category()
    category.id = input.category
    entity.category = category
    return entity
  }

  public static fromEntityToPublic(entity: Product): ProductPublic {
    const product = new ProductPublic()
    product.id = entity.id
    product.name = entity.name
    product.slug = entity.slug
    product.description = entity.description
    product.category = entity.category.toString()
    product.price = entity.price
    product.images = entity.images
    product.variations = entity.variations
    product.optionNames = entity.optionNames
    return product
  }
}
