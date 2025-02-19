import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ChatSchema } from "../../database/schemas/chat.schema";
import { ChatService } from "./chat.service";
import { ChatResolver } from "src/graphql/resolvers/chat.resolver";
import { VisitorEntity } from "../../database/entities/visitor.entity";
import { VendorEntity } from "../../database/entities/vendor.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Chat", schema: ChatSchema }]),
    TypeOrmModule.forFeature([VisitorEntity, VendorEntity]),
  ],
  providers: [ChatService, ChatResolver],
  exports: [ChatService],
})
export class ChatModule {}
