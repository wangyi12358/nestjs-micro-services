import { Type } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

export function PaginationResponse<T>(classRef: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PageType {
    @Field()
    total: number;

    @Field(() => [classRef], { nullable: true })
    list: T[];
  }
  return PageType;
}

@InputType()
export class PaginationInput {
  @Field()
  pageSize: number;

  @Field()
  current: number;

  get skip() {
    return (this.current - 1) * this.pageSize;
  }
}
