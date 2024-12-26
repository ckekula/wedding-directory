import { GuestListEntity } from '../entities/guestlist.entity';
import { VisitorEntity } from '../entities/visitor.entity';
import { Repository } from 'typeorm';

export type GuestListRepositoryType = Repository<GuestListEntity> & {
  createGuestList(
    createGuestListInput: Partial<GuestListEntity>,
    review: VisitorEntity,
  ): Promise<GuestListEntity>;

  updateGuestList(
    id: string,
    updateGuestListInput: Partial<GuestListEntity>,
  ): Promise<GuestListEntity>;

  deleteGuestList(id: string): Promise<boolean>;

  findGuestListById(id: string): Promise<GuestListEntity | null>;

  // findGuestListByFilters(
  //   name?: string,
  //   status?: string
  // ): Promise<GuestListEntity[]>;

  //findGuestListByOffering(id: string): Promise<GuestListEntity[]>;
};
