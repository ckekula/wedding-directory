import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MyVendorsModel } from "../models/myVendors.model";
import { MyVendorsService } from "../../modules/myVendors/myVendors.service";

@Resolver(() => MyVendorsModel)
export class MyVendorsResolver {

    constructor(private readonly myVendorsService: MyVendorsService) {}

    @Query(() => [MyVendorsModel])
    async findAllMyVendorsByCategory(
        @Args('visitorId') visitorId: string,
        @Args('category') category: string
    ) {
        return this.myVendorsService.findAllMyVendorsByCategory(visitorId, category);
    }

    @Query(() => [MyVendorsModel])
    async findAllMyVendors(
        @Args('visitorId') visitorId: string,
    ) {
        return this.myVendorsService.findAllMyVendors(visitorId);
    }

    @Query(() => MyVendorsModel)
    async findMyVendorById(
        @Args('visitorId') visitorId: string,
        @Args('offeringId') offeringId: string
    ) {
        return this.myVendorsService.findMyVendorById(visitorId, offeringId);
    }

    @Mutation(() => MyVendorsModel)
    async addToMyVendors(
        @Args('visitorId') visitorId: string,
        @Args('offeringId') offeringId: string
    ) {
        return this.myVendorsService.addToMyVendors(visitorId, offeringId);
    }

    @Mutation(() => MyVendorsModel)
    async removeFromMyVendors(
        @Args('visitorId') visitorId: string,
        @Args('offeringId') offeringId: string
    ) {
        return this.myVendorsService.removeFromMyVendors(visitorId, offeringId);
    }
}