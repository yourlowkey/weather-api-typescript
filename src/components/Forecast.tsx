import { ForecastType } from "../types"
import Degree from './Degree'
import Sunrise from './Icons/Sunrise'
import Sunset from './Icons/Sunset'
import Tile from './Tile'
import {
    getHumidityValue,
    getWindDirection,
    getVisibilityValue,
    getSunTime,
    getCelsius
  } from './../helpers'
import ClearResultButton from "./ClearResultButton"
type Props = {
    data: ForecastType,
    clearResult:()=>void
  }
const Forecast = ({data,clearResult}:Props) => {
    const today = data
  return (
    <div className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg">
        <ClearResultButton clearResult={clearResult}/>
    <div className="mx-auto w-[300px]">
      <section className="text-center">
        <h2 className="text-2xl font-black">
          {data.name} <span className="font-thin">{data.country}</span>
        </h2>
        <h1 className="text-4xl font-extrabold">
          <Degree temp={getCelsius(Math.round(today.main.temp))} />
        </h1>
        <p className="text-sm">
          {today.weather[0].main} ({today.weather[0].description})
        </p>
        <p className="text-sm">
          H: <Degree temp={getCelsius(Math.ceil(today.main.temp_max))} /> L:{' '}
          <Degree temp={getCelsius(Math.floor(today.main.temp_min))} />
        </p>
      </section>

      <section className="flex mt-4 pb-2 mb-5">
       
          <div
            className="inline-block text-center w-[50px] flex-shrink-0"
          >
            <p className="text-sm">
              {new Date(data.dt * 1000).getHours()}
            </p>
            <img
              alt={`weather-icon-${data.weather[0].description}`}
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            />
            <p className="text-sm font-bold">
              <Degree temp={getCelsius(Math.round(data.main.temp))} />
            </p>
          </div>
        
      </section>

      <section className="flex flex-wrap justify-between text-zinc-700">
        <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-ls rounded drop-shadow-lg py-4 mb-5">
          <Sunrise /> <span className="mt-2">{getSunTime(data.sys.sunrise)}</span>
        </div>
        <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-ls rounded drop-shadow-lg py-4 mb-5">
          <Sunset /> <span className="mt-2">{getSunTime(data.sys.sunset)}</span>
        </div>

        <Tile
          icon="wind"
          title="Wind"
          info={`${Math.round(today.wind.speed)} km/h`}
          description={`${getWindDirection(
            Math.round(today.wind.deg)
          )}, gusts 
          ${today.wind.gust.toFixed(1)} km/h`}
        />
        <Tile
          icon="feels"
          title="Feels like"
          info={<Degree temp={getCelsius(Math.round(today.main.feels_like))} />}
          description={`Feels ${
            Math.round(today.main.feels_like) < Math.round(today.main.temp)
              ? 'colder'
              : 'warmer'
          }`}
        />
        <Tile
          icon="humidity"
          title="Humidity"
          info={`${today.main.humidity} %`}
          description={getHumidityValue(today.main.humidity)}
        />
        <Tile
          icon="pressure"
          title="Pressure"
          info={`${today.main.pressure} hPa`}
          description={` ${
            Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'
          } than standard`}
        />
        <Tile
          icon="visibility"
          title="Visibility"
          info={`${(today.visibility / 1000).toFixed()} km`}
          description={getVisibilityValue(today.visibility)}
        />
      </section>
    </div>
  </div>
  )
}

export default Forecast