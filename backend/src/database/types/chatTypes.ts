import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
class VisitorType {
  @Field(() => ID)
  id: string;
}

@ObjectType()
class VendorType {
  @Field(() => ID)
  id: string;
}

@ObjectType()
class OfferingType {
  @Field(() => ID)
  id: string;
}

@ObjectType()
export class ChatType {
  @Field(() => ID)
  chatId: string;

  @Field({nullable: true})
  offeringId: string;

  @Field()
  vendorId: string;

  @Field()
  visitorId: string;

  @Field(() => VisitorType, { nullable: true })
  visitor: VisitorType;

  @Field(() => VendorType, { nullable: true })
  vendor: VendorType;
  
  @Field(() => OfferingType, { nullable: true })
  offering: OfferingType;

  @Field(() => [MessageType])
  messages: MessageType[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class MessageType {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field()
  senderId: string;

  @Field()
  senderType: string;

  @Field()
  timestamp: Date;
}