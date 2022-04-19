import { Injectable } from '@nestjs/common'
import { Category } from './category.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}
  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find()
  }

  async create(input: Category): Promise<Category> {
    return this.categoryRepository.save(input)
  }
}
