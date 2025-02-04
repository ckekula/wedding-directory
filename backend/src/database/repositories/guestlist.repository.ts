import { DataSource } from 'typeorm';
import { VisitorEntity } from '../entities/visitor.entity';
import { GuestListRepositoryType } from 'src/database/types/guestlistTypes';
import { GuestListEntity } from '../entities/guestlist.entity';

// Use the DataSource to get the base repository and extend it
export const GuestListRepository = (
  dataSource: DataSource,
): GuestListRepositoryType =>
  dataSource.getRepository(GuestListEntity).extend({
    async createGuestList(
      createGuestListInput: Partial<GuestListEntity>,
      visitor: VisitorEntity,
    ): Promise<GuestListEntity> {
      const guestlist = this.create({
        ...createGuestListInput,
        visitor,
      });
      return this.save(guestlist);
    },

    async updateGuestList(
      id: string,
      updateGuestListInput: Partial<GuestListEntity>,
    ): Promise<GuestListEntity> {
      const guestlist = await this.findOne({ where: { id } });
      if (!guestlist) {
        throw new Error('Service not found');
      }
      return this.save({
        ...guestlist,
        ...updateGuestListInput,
      });
    },

    async deleteGuestList(id: string): Promise<boolean> {
      const result = await this.delete({ id });
      return result.affected > 0;
    },

    async findGuestListById(id: string): Promise<GuestListEntity> {
      return this.findOne({
        relations: ['visitor'],
        where: { id },
      });
    },

    async findGuestListsByVisitor(id: string): Promise<GuestListEntity[]> {
      return this.createQueryBuilder('guestlist')
        .leftJoinAndSelect('guestlist.visitor', 'visitor') // Include visitor details
        .where('visitor.id = :id', { id })
        .getMany();
    },
  });
