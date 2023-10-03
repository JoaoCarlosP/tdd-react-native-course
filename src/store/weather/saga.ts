import { call, put, takeLatest } from "redux-saga/effects";
import { Actions, WEATHER_START_TYPE, fetchWeatherFailure, fetchWeatherSuccess } from "./actions";
import WeatherService from "../../services/WeatherService";

export default function* saga() {
  yield takeLatest(Actions.START, weatherStartWorker)
}

export function* weatherStartWorker (action: WEATHER_START_TYPE): Generator<any, void, any>  {
  try {
    const weather = yield call(
      WeatherService.fetchCurrentWeather,
      action.payload.latitude,
      action.payload.longitude
    )

    yield put(fetchWeatherSuccess(weather))
  } catch (error: any) {
    yield put(fetchWeatherFailure(error))
  }
}