import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { VisitorEntity } from "./visitor.entity";
import { VendorEntity } from "./vendor.entity";
import { Message } from "./message.entity";
import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class Chat {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => VisitorEntity)
  @ManyToOne(() => VisitorEntity, (visitor) => visitor.chatsAsVisitor)
  visitor: VisitorEntity;

  @Field(() => VendorEntity)
  @ManyToOne(() => VendorEntity, (vendor) => vendor.chatsAsVendor)
  vendor: VendorEntity;

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @Field()
  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;
}
