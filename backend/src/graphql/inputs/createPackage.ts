import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePackageInput {

    @Field()
    vendor_id: string;

    @Field()
    category: string;

    @Field()
    bus_phone: string;

    @Field()
    bus_email: string;

    @Field()
    about: string;

    @Field()
    pfp: string;

    @Field()
    address: string;

    @Field()
    city: string;

    @Field()
    latitude: string;

    @Field()
    longitude: string;

    @Field()
    experience: string;

    @Field()
    website : string;

    @Field()
    instagram: string;

    @Field()
    facebook: string;

    @Field()
    x: string;

    @Field()
    tiktok: string;
}
