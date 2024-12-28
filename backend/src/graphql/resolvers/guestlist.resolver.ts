import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { GuestListService } from '../../modules/guestlist/guestlist.service';
import { GuestListModel } from '../models/guestlist.model';
import { GuestListEntity } from '../../database/entities/guestlist.entity';
import { CreateGuestListInput } from '../inputs/createGuestList.input';
import { Query } from '@nestjs/graphql';
//import { GuestListFilterInput } from '../inputs/';
import { UpdateGuestListInput } from '../inputs/updateGuestList.input';

@Resolver()
export class GuestListResolver {
  constructor(private readonly guestlistService: GuestListService) {}

  @Mutation(() => GuestListModel)
  async createGuestList(
    @Args('input') input: CreateGuestListInput,
  ): Promise<GuestListEntity> {
    return this.guestlistService.createGuestList(input);
  }

  @Mutation(() => GuestListModel)
  async updateGuestList(
    @Args('id') id: string,
    @Args('input') input: UpdateGuestListInput,
  ): Promise<GuestListEntity> {
    return this.guestlistService.updateGuestList(id, input);
  }

  @Mutation(() => Boolean)
  async deleteGuestList(@Args('id') id: string): Promise<boolean> {
    return this.guestlistService.deleteGuestList(id);
  }

  @Query(() => GuestListModel)
  async findGuestListById(@Args('id') id: string): Promise<GuestListEntity> {
    return this.guestlistService.findGuestListById(id);
  }

  // @Query(() => [GuestListModel])
  // async findGuestLists(
  //   @Args('filter', { nullable: true }) filter?: GuestListFilterInput
  // ): Promise<GuestListEntity[]> {
  //   return this.guestlistService.findGuestListsByFilters(filter || {});
  // }

  @Query(() => [GuestListModel])
  async findGuestListsByVisitor(
    @Args('id') id: string,
  ): Promise<GuestListEntity[]> {
    return this.guestlistService.findGuestListsByVisitor(id);
  }
}
