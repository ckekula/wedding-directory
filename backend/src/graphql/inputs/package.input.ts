import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PackageInput {

    @Field()
    offering_id: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    pricing: number;
}
