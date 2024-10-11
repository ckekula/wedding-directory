import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePackageInput {

    @Field()
    vendor_id: string;

    @Field()
    name: string;
    
    @Field()
    category: string;

}
