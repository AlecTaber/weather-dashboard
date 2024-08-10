import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// TODO: Define a class for the Weather object
class Weather {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;

  constructor(
    temperature: number,
    description: string,
    humidity: number,
    windSpeed: number
  ) {
    this.temperature = temperature;
    this.description = description;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}

  private baseURL?: string;
  private apiKey?: string;
  private cityName?: string;

  constructor() {
    this.baseURL = process.env.WEATHER_API_BASE_URL || '';
    this.apiKey = process.env.WEATHER_API_KEY || '';
  }

  private async fetchLocationData(): Promise<any> {
    const query = this.buildGeocodeQuery();
    try {
      const response = await fetch(
        `${this.baseURL}/geocode?q=${query}&apiKey=${this.apiKey}`
      );
      return await response.json();
    } catch (err) {
      console.log('Error:', err);
      return null;
    }
  }

  private destructureLocationData(locationData: any): Coordinates {
    return {
      latitude: locationData.lat,
      longitude: locationData.lon,
    };
  }

  private buildGeocodeQuery(): string {
    return `${this.cityName}&limit=1&apiKey=${this.apiKey}`;
  }

  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&apiKey=${this.apiKey}`;
  }

  private async fetchAndDestructureLocationData(): Promise<Coordinates | null> {
    const locationData = await this.fetchLocationData();
    if (locationData) {
      return this.destructureLocationData(locationData);
    }
    return null;
  }

  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    try {
      const response = await fetch(this.buildWeatherQuery(coordinates));
      return await response.json();
    } catch (err) {
      console.log('Error:', err);
      return null;
    }
  }

  private parseCurrentWeather(response: any): Weather {
    return new Weather(
      response.main.temp,
      response.weather[0].description,
      response.main.humidity,
      response.wind.speed
    );
  }

  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    // Create an array with the current weather as the first element
    const forecastArray: Weather[] = [currentWeather];
  
    // Loop through the weatherData and push each forecasted Weather object into the array
    weatherData.forEach((data) => {
      const forecastedWeather = new Weather(
        data.main.temp,
        data.weather[0].description,
        data.main.humidity,
        data.wind.speed
      );
      forecastArray.push(forecastedWeather);
    });
  
    return forecastArray;
  }

  async getWeatherForCity(city: string): Promise<Weather[] | null> {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    if (coordinates) {
      const weatherData = await this.fetchWeatherData(coordinates);
      if (!weatherData || !weatherData.main) {
        console.log('Weather data is missing or incomplete.');
        return null;
      }
  
      const currentWeather = this.parseCurrentWeather(weatherData);
  
      if (weatherData.forecast && Array.isArray(weatherData.forecast)) {
        return this.buildForecastArray(currentWeather, weatherData.forecast);
      } else if (weatherData.daily && Array.isArray(weatherData.daily)) {
        return this.buildForecastArray(currentWeather, weatherData.daily);
      } else {
        console.log('No forecast data available.');
        return [currentWeather]; // Return just the current weather if no forecast data is available
      }
    }
    return null;
  }

}

export default new WeatherService();
