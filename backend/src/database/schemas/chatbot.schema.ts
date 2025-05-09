import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Message {
  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  timestamp: Date;
}

@Schema()
export class Conversation extends Document {
  @Prop({ required: true, unique: true })
  conversationId: string;

  @Prop([Message])
  messages: Message[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);