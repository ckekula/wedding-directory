import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { VendorModule } from "./modules/vendor/vendor.module";
import { VisitorModule } from "./modules/visitor/visitor.module";
import { AuthModule } from "./modules/auth/auth.module";
import { OfferingModule } from "./modules/offering/offering.module";
import { UploadModule } from "./modules/upload/upload.module";
import { GuestListModule } from "./modules/guestlist/guestlist.module";
import { BudgetToolModule } from "./modules/budget/budget_tool.module";
import { BudgetItemModule } from "./modules/budget/budget_item.module";
import { ChecklistModule } from "./modules/checklist/checklist.module";
import { MyVendorsModule } from "./modules/myVendors/myVendors.module";
import { ReviewModule } from "./modules/review/review.module";
import { PackageModule } from "./modules/package/package.module";
import { ChatModule } from "./modules/chat/chat.module";
import { MongooseModule } from "@nestjs/mongoose";
import { StripeModule } from "./modules/stripe/stripe.module";
import { PaymentModule } from "./modules/payment/payment.module";
import { ChatbotModule } from "./modules/ai/chatbot.module";
import { VectorSearchModule } from "./modules/ai/vector-search.module";
import { EmbeddingsModule } from "./modules/ai/embeddings.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: "postgres",
        url: process.env.DATABASE_URL,
        ssl: true,
        entities: [join(__dirname, "**", "*.entity.{ts,js}")],
        synchronize: process.env.TYPEORM_SYNC === "true",
      }),
    }),
    AuthModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ChatModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "dist/graphql/schema.gql",
      playground: true,
    }),

    VendorModule,
    VisitorModule,
    OfferingModule,
    GuestListModule,
    UploadModule,
    BudgetToolModule,
    BudgetItemModule,
    UploadModule,
    ChecklistModule,
    MyVendorsModule,
    ReviewModule,
    PackageModule,
    StripeModule,
    PaymentModule,
    ChatbotModule,
    VectorSearchModule,
    EmbeddingsModule
  ],
})
export class AppModule {}
