import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('AuthToken')
export class AuthSession {
  @Field({ nullable: false })
  id: string
}
