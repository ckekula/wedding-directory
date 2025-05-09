import { Module } from '@nestjs/common';
import { GuestListResolver } from '../../graphql/resolvers/guestlist.resolver';
import { GuestListService } from './guestlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitorEntity } from '../../database/entities/visitor.entity';
import { GuestListEntity } from '../../database/entities/guestlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GuestListEntity, VisitorEntity])],
  providers: [GuestListResolver, GuestListService],
  exports: [GuestListService],
})
export class GuestListModule {}
