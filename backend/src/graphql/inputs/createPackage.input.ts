import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePackageInput {

    @Field()
    vendor_id: string;

    @Field()
    category: string;

    @Field()
    bus_phone?: string;

    @Field()
    bus_email?: string;

    @Field()
    about?: string;

    @Field()
    experience?: string;

    @Field()
    start_price?: string;

    @Field()
    website?: string;

    @Field()
    instagram?: string;

    @Field()
    facebook?: string;

    @Field()
    x?: string;

    @Field()
    tiktok?: string;
}
