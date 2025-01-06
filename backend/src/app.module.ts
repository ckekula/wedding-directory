import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { VendorModule } from './modules/vendor/vendor.module';
import { VisitorModule } from './modules/visitor/visitor.module';
import { AuthModule } from './modules/auth/auth.module';
import { OfferingModule } from './modules/offering/offering.module';
import { UploadModule } from './modules/upload/upload.module';
import { GuestListModule } from './modules/guestlist/guestlist.module';
import { BudgetToolModule} from './modules/budget/budget_tool.module';
import { BudgetItemModule } from './modules/budget/budget_item.module';
import { ChecklistModule } from './modules/checklist/checklist.module';
import { MyVendorsModule } from './modules/myVendors/myVendors.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: true,
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: process.env.TYPEORM_SYNC === 'true',
      }),
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'dist/graphql/schema.gql',
      playground: true,
    }),

    VendorModule,
    VisitorModule,
    AuthModule,
    OfferingModule,
    GuestListModule,
    UploadModule,
    BudgetToolModule,
    BudgetItemModule,
    UploadModule,
    ChecklistModule,
    MyVendorsModule
  ],
})
export class AppModule {}
