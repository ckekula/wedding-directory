import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PortfolioResolver } from 'src/graphql/resolvers/portfolio.resolver';
import { PortfolioService } from './portfolio.service';

@Module({
  imports: [HttpModule],
  providers: [PortfolioResolver, PortfolioService],
})
export class PortfolioModule {}
