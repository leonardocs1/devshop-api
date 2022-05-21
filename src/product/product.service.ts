import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from './product.entity'
import { s3 } from 'src/utils/s3'
import * as sharp from 'sharp'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private s3: s3
  ) {}

  async create(input: Product): Promise<Product> {
    return this.productRepository.save(input)
  }

  async findById(id: string): Promise<Product> {
    return this.productRepository.findOne(id, { loadRelationIds: true })
  }

  async findBySlug(slug: string): Promise<Product> {
    return this.productRepository.findOne({ where: [{ slug }] })
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ loadRelationIds: true })
  }

  async update(input: Product): Promise<Product> {
    await this.productRepository.update(input.id, {
      name: input.name,
      slug: input.slug,
      description: input.description,
      category: input.category
    })
    return input
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.productRepository.delete(id)
      return true
    } catch (err) {
      return false
    }
  }

  async uploadImage(
    id: string,
    createReadStream: () => any,
    filename: string,
    mimetype: string
  ): Promise<boolean> {
    const product = await this.productRepository.findOne(id)
    if (!product) {
      return false
    }
    if (!product.images) {
      product.images = []
    }
    const stream = createReadStream().pipe(sharp().resize(300))
    const url = await this.s3.upload(
      stream,
      mimetype,
      'devshop-storage',
      id + '-' + filename
    )

    product.images.push(url)

    await this.productRepository.update(id, {
      images: product.images
    })
    return true
  }
}
