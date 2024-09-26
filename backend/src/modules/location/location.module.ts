import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LocationResolver } from 'src/graphql/resolvers/location.resolver';
import { LocationService } from './location.service';

@Module({
  imports: [HttpModule],
  providers: [LocationResolver, LocationService],
})
export class LocationModule {}
