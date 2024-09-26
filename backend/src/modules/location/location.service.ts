import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class LocationService {
  constructor(private readonly httpService: HttpService) {}

  async autocompleteLocation(input: string) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;

    const response = await this.httpService.get(url).toPromise();
    return response.data;
  }
}
