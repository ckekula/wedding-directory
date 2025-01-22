import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { Chat } from './chat.entity';
import { VisitorEntity } from './visitor.entity';
import { VendorEntity } from './vendor.entity';
import { Field, ObjectType, ID} from 'node_modules/@nestjs/graphql';

@ObjectType()
@Entity()
export class Message {

    @Field(()=> ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => Chat)
    @ManyToOne(() => Chat, chat => chat.messages)
    chat: Chat;

    @Field(() => VisitorEntity, { nullable: true }) 
    @ManyToOne(() => VisitorEntity, visitor => visitor.messages)
    visitorSender: VisitorEntity;

    @Field(() => VendorEntity, { nullable: true })
    @ManyToOne(() => VendorEntity, vendor => vendor.messages)
    vendorSender: VendorEntity;

    @Field()
    @Column()
    content: string;

    @Field()
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    timestamp: Date;
}