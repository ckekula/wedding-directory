import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MyVendorsModel } from "../models/myvendors.model";
import { MyVendorsService } from "src/modules/myvendors/myvendors.service";
import { myVendorsInput } from '../inputs/myVendors.input';

@Resolver(() => MyVendorsModel)
export class MyVendorsResolver {

    constructor(private readonly myVendorsService: MyVendorsService) {}

    @Query(() => [MyVendorsModel])
    async findAllMyVendorsByCategory(
        @Args('visitorId') visitorId: string,
        @Args('category') category: string
    ) {
        return this.myVendorsService.findAllMyVendorsById(visitorId, category);
    }

    @Mutation(() => [MyVendorsModel])
    async addToMyVendors(@Args('input') input: myVendorsInput) {
        return this.myVendorsService.addToMyVendors(input);
    }

    @Mutation(() => [MyVendorsModel])
    async removeFromMyVendors(@Args('input') input: myVendorsInput) {
        return this.myVendorsService.removeFromMyVendors(input);
    }
}