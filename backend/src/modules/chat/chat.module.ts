import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ChatSchema } from "../../database/schemas/chat.schema";
import { ChatService } from "./chat.service";
import { ChatResolver } from "../../graphql/resolvers/chat.resolver";
import { VisitorEntity } from "../../database/entities/visitor.entity";
import { VendorEntity } from "../../database/entities/vendor.entity";
import { OfferingEntity } from "../../database/entities/offering.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Chat", schema: ChatSchema }]),
    TypeOrmModule.forFeature([VisitorEntity, VendorEntity,OfferingEntity]),
  ],
  providers: [ChatService, ChatResolver],
  exports: [ChatService],
})
export class ChatModule {}
