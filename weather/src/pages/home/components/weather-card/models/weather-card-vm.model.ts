import { ReactNode } from "react";
import { Meteo } from "../../../models/meteo.model";

export class WeatherCardVM{
    title!: string;
    icon!: ReactNode;
    temperature!: string;
    referenceForecast!: Meteo;

    constructor(data?: any){
        Object.assign(this,data);
    }

    static buildHourWeatherCard (forecast: Meteo): WeatherCardVM {
        let model: WeatherCardVM = {
            title: forecast.data.getHours() + (forecast.data.getHours() > 12 ? ' PM' : ' AM'),
            icon: forecast.iconaStato,
            temperature: forecast.temperatura + '°',
            referenceForecast: forecast
        }
        return model;
    }

    static buildWeekWeatherCard(forecast: Meteo): WeatherCardVM {
        const days = ['DOM', 'LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'];
        let model: WeatherCardVM = {
            title: days[forecast.data.getDay()],
            icon: forecast.iconaStato,
            temperature: forecast.temperatura + '°',
            referenceForecast: forecast
        }
        return model;
    }
}