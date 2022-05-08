import { Injectable } from '@nestjs/common'
import { Brand } from './brand.entity'
import { Repository } from 'typeorm'
import { s3 } from 'src/utils/s3'
import * as fs from 'fs'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    private s3: s3
  ) {}

  async findAll(): Promise<Brand[]> {
    return this.brandRepository.find()
  }

  async findById(id: string): Promise<Brand> {
    return this.brandRepository.findOne(id)
  }

  async findBySlug(slug: string): Promise<Brand> {
    return this.brandRepository.findOne({ where: [{ slug }] })
  }

  async create(input: Brand): Promise<Brand> {
    return this.brandRepository.save(input)
  }

  async uploadLogo(
    id: string,
    createReadStream: () => any,
    filename: string,
    mimetype: string
  ): Promise<Brand> {
    const stream = createReadStream()
    await this.s3.upload(
      filename,
      stream,
      mimetype,
      'devshop-storage',
      id + '-' + filename
    )
    return null
  }

  async update(input: Brand): Promise<Brand> {
    await this.brandRepository.update(input.id, {
      name: input.name,
      slug: input.slug
    })
    return input
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.brandRepository.delete(id)
      return true
    } catch (err) {
      return false
    }
  }
}
