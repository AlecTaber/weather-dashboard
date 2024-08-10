import { Router } from 'express';
const router = Router();

 import HistoryService from '../../service/historyService.js';
 import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  // TODO: GET weather data from city name
  // TODO: save city to search history
  try {
    const cityName = req.body.cityName;
    const weatherData = await WeatherService.getWeatherForCity(cityName);

    await HistoryService.addCity(cityName);
    res.json(weatherData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// TODO: GET search history
router.get('/history', async (_, res) => {
  try {
    const searchHistory = await HistoryService.getCities();
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
    const deletionResult = await HistoryService.removeCity(id);
    res.json(deletionResult);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
