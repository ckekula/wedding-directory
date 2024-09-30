import { Resolver, Query, Args } from '@nestjs/graphql';
import { PortfolioService } from 'src/modules/portfolio/portfolio.service';

@Resolver()
export class PortfolioResolver {
  constructor(private readonly placesService: PortfolioService) {}

  @Query(() => [String])
  async autocompleteLocation(@Args('input') input: string) {
    const result = await this.placesService.autocompleteLocation(input);
    return result.predictions.map((place) => place.description);
  }
}
