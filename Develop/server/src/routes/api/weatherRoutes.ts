import { Router } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  // TODO: GET weather data from city name
  // TODO: save city to search history
  try {
    const cityName = req.body.cityName;
    const weatherData = await WeatherService.getWeatherData(cityName);

    await HistoryService.saveCity(cityName);
    res.json(weatherData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// TODO: GET search history
router.get('/history', async (req, res) => {
  try {
    const searchHistory = await HistoryService.getSearchHistory();
    res.json(searchHistory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletionResult = await HistoryService.deleteCityById(id);
    res.json(deletionResult);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
