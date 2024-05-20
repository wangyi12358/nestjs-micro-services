import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ContactInput {
  @Field()
  email: string;
  @Field({ nullable: true })
  lastName?: string;
  @Field({ nullable: true })
  firstName?: string;
  @Field({ nullable: true })
  phone?: string;
  @Field({ nullable: true })
  message?: string;
}
