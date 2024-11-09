import { NestFactory } from '@nestjs/core';
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from '@nestjs/graphql';
import { printSchema } from 'graphql';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { VendorResolver } from '../graphql/resolvers/vendor.resolver';
import { VisitorResolver } from '../graphql/resolvers/visitor.resolver';
import { OfferingResolver } from '../graphql/resolvers/offering.resolver';
//import { ReviewResolver } from '../graphql/resolvers/review.resolver';

async function generateSchema() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  // Get the schema factory
  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);

  // Generate schema based on your resolvers
  const schema = await gqlSchemaFactory.create([
    VendorResolver,
    VisitorResolver,
    OfferingResolver,
 //   ReviewResolver,
  ]);
  const schemaPath = join(process.cwd(), 'dist/graphql/schema.gql');
  writeFileSync(schemaPath, printSchema(schema));

  console.log(`GraphQL schema written to ${schemaPath}`);
  await app.close();
}

generateSchema();
