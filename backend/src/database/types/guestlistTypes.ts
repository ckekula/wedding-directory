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

  findGuestListsByVisitor(id: string): Promise<GuestListEntity[]>;
};
