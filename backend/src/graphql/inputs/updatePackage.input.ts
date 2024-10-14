import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdatePackageInput {

    @Field({ nullable: true })
    category: string;

    @Field({ nullable: true })
    bus_phone: string;

    @Field({ nullable: true })
    bus_email: string;

    @Field({ nullable: true })
    about: string;

    @Field({ nullable: true })
    experience: string;

    @Field({ nullable: true })
    start_price: string;

    @Field({ nullable: true })
    website : string;

    @Field({ nullable: true })
    instagram: string;

    @Field({ nullable: true })
    facebook: string;

    @Field({ nullable: true })
    x: string;

    @Field({ nullable: true })
    tiktok: string;
}
