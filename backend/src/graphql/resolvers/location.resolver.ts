import { Resolver, Query, Args } from '@nestjs/graphql';
import { LocationService } from 'src/modules/location/location.service';

@Resolver()
export class LocationResolver {
  constructor(private readonly placesService: LocationService) {}

  @Query(() => [String])
  async autocompleteLocation(@Args('input') input: string) {
    const result = await this.placesService.autocompleteLocation(input);
    return result.predictions.map((place) => place.description);
  }
}
