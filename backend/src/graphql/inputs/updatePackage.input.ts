import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdatePackageInput {

    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    pricing: number;

    @Field(() => [String])
    features: string[];

    @Field(() => Boolean, { defaultValue: false })
    visible: boolean;
}
