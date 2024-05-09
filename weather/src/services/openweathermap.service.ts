import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { Meteo } from './../pages/home/models/meteo.model';
import apiKey from './../shared/const/apiKey';
import apiUrls from '../shared/const/apiUrls';

class OpenWeatherService {
    async getForecasts(longitude: string, latitude: string, dispatch: Dispatch){ // LONG E LAT PRESE DALLO STORE
        try {
            const response = await axios.get(`${apiUrls.forecasts.url}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
            const forecasts: Meteo[] = response.data.list.map((data: any) => new Meteo(data));
            return forecasts;            
        } catch (error: any) {
            dispatch({ type: 'SHOW_TOAST', payload: {content: error.response.status === 404 
                ? 'Le coordinate inserite non sono valide.' 
                : 'Errore di comunicazione con il server. Riprovare più tardi' }
            });
        }
    }
}

export default OpenWeatherService;