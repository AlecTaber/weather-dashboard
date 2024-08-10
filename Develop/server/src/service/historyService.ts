// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
  private async read() {
    return await FileSystem.readFile('searchHistory.json', {
      flag: 'a+',
      encoding: 'utf8',
    });
}

private async write(cities: City[]) {
    return await FileSystem.writeFile(
      'db/searchHistory.json',
      JSON.stringify(cities, null, '\t')
    );
  };

  async getCities() {
    return await this.read().then((cities) => {
      let parsedCities: City[];

      try {
        parsedCities = JSON.parse(cities);
      } catch (error) {
        parsedCities = [];
      }
      return parsedCities;
  });

  async addCity(city: string) {
    if (!city) {
      throw new Error('City name is required');
    }
    const newCity: City = {name: City, id: uuidv4() };
  }
  return await this.getCities()
  .then((cities) => {
    if (cities.find((index) => index.name === city)) {
      return cities;
    }
  })
  .then((updatedCities) => this.write(updatedCities))
  .then (() => newCity);

  async removeCity(id: string) {
    return await this.getCities()
    .then((cities) => cities.filter((city) => city.id !== id))
    .then((filteredCities) => this.write(filteredCities));
  }
}

export default new HistoryService();
