import { Injectable } from '@nestjs/common';
import { GuestListEntity } from '../../database/entities/guestlist.entity';
import { CreateGuestListInput } from '../../graphql/inputs/createGuestList.input';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VisitorEntity } from '../../database/entities/visitor.entity';
//import { GuestListFilterInput } from '../../graphql/inputs/';
import { GuestListRepository } from '../../database/repositories/guestlist.repository';
import { GuestListRepositoryType } from '../../database/types/guestlistTypes';
import { UpdateGuestListInput } from '../../graphql/inputs/updateGuestList.input';

@Injectable()
export class GuestListService {
  private guestlistRepository: GuestListRepositoryType;
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(VisitorEntity)
    private readonly visitorRepository: Repository<VisitorEntity>,
  ) {
    this.guestlistRepository = GuestListRepository(this.dataSource);
  }

  async createGuestList(
    createGuestListInput: CreateGuestListInput,
  ): Promise<GuestListEntity> {
    const visitor = await this.visitorRepository.findOne({
      where: { id: createGuestListInput.visitor_id },
    });

    if (!visitor) {
      throw new Error('Visitor not found');
    }
    return this.guestlistRepository.createGuestList(
      createGuestListInput,
      visitor,
    );
  }

  async updateGuestList(
    id: string,
    input: UpdateGuestListInput,
  ): Promise<GuestListEntity> {
    return this.guestlistRepository.updateGuestList(id, input);
  }

  async deleteGuestList(id: string): Promise<boolean> {
    return this.guestlistRepository.deleteGuestList(id);
  }

  async findGuestListById(id: string): Promise<GuestListEntity> {
    return this.guestlistRepository.findGuestListById(id);
  }

  async findGuestListsByVisitor(visitorId: string): Promise<GuestListEntity[]> {
    return this.guestlistRepository.findGuestListsByVisitor(visitorId);
  }
}
