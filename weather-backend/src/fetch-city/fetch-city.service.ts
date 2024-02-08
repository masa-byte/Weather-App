import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { geoApiUrl } from 'config';

@Injectable()
export class FetchCityService {
    params = {
        name: '',
        count: 1,
        format: 'json',
        language: 'en',
    }

    async fetchCityParams(name: string): Promise<any> {
        this.params.name = name;
        try {
            const response = await axios.get(geoApiUrl, {
                params: this.params,
            });

            return response.data;
        } catch (error) {
            console.error('Error making Geocoding API request:', error.message);
            throw error;
        }
    }
}
