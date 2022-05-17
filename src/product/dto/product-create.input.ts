import { Field, InputType, Float } from '@nestjs/graphql'
import { IsUUID, Length, Matches, Validate } from 'class-validator'
import { ProductSlugIsUnique } from '../validations/ProductSlugIsUnique'

@InputType()
export class ProductCreateInput {
  @Field()
  @Length(3)
  name: string

  @Field()
  @Length(3)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  @Validate(ProductSlugIsUnique)
  slug: string

  @Field()
  @IsUUID()
  category: string

  @Field()
  @Length(20)
  description: string

  @Field({ nullable: true })
  sku: string

  @Field(type => Float, { nullable: true })
  price: number

  @Field(type => Float, { nullable: true })
  weight: number
}
