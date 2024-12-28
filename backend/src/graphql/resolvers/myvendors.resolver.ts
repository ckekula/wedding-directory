import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MyVendorsModel } from "../models/myvendors.model";
import { MyVendorsService } from "src/modules/myvendors/myvendors.service";

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
    async addToMyVendors(
        @Args('visitorId') visitorId: string,
        @Args('category') category: string
    ) {
        return this.myVendorsService.addToMyVendors(visitorId, category);
    }

    @Mutation(() => [MyVendorsModel])
    async removeFromMyVendors(
        @Args('visitorId') visitorId: string,
        @Args('category') category: string
    ) {
        return this.myVendorsService.removeFromMyVendors(visitorId, category);
    }
}