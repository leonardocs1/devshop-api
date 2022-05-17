import { Category } from 'src/category/category.entity'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

interface ProductVariation {
  optionName1: string
  optionName2: string
  sku: string
  price: number
  weight: number
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 250, nullable: false })
  name: string

  @Column({ length: 900, nullable: false })
  description: string

  @Column({ length: 250, nullable: false })
  slug: string

  // Product N -> 1 Category
  @ManyToOne(type => Category, category => category.id)
  category: Category

  @Column({ type: 'jsonb', nullable: true })
  optionNames: string[]

  @Column({ type: 'jsonb', nullable: true })
  variations: ProductVariation[]
}
