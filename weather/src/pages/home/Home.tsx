import './Home.css';
import { useEffect, useState } from 'react';
import WeatherDetails from './components/weather-details/WeatherDetails';
import WeatherList from './components/weather-list/WeatherList';
import { Meteo } from './models/meteo.model';
import { HomeVM } from './models/home-vm.model';
import { useDispatch, useSelector } from 'react-redux';
import OpenWeatherService from './../../services/openweathermap.service';
import { Comune } from './models/comune.model';
import { useNavigate } from 'react-router-dom';

export default Home;

function Home() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const forecastService = new OpenWeatherService();
    const coordinates = useSelector((state: any) => state.coordinates);
    const [forecasts, setForecasts] = useState([] as Meteo[]);
    const [selectedForecast, setSelectedForecast] = useState(null as Meteo | null);
    const [homeVm, setHomeVM] = useState({backgroundColor: 'lightgrey', weatherImage : ''} as HomeVM);
    const [translation, setTranslation] = useState('');

    useEffect(() => {
        async function getWeather(longitude: string, latitude: string) {
            const data = await forecastService.getForecasts(longitude, latitude, dispatch);
            setForecasts(data ?? []);
            setSelectedForecast(getInitialForecast(data ?? []));
        }
        if(coordinates.comuni.length === 0) { navigate('/') }
        else if (forecasts.length === 0) {
            setTimeout(() => {
                setTranslation('-300');
            }, 10);
            getWeather(coordinates.comuni[0].longitudine, coordinates.comuni[0].latitudine);
        } else {
            setWeatherDetailsVM(selectedForecast!);
        }
    }, [forecasts, selectedForecast])


    const setWeatherDetailsVM = (selectedForecast?: Meteo) => {
        let homeVM: HomeVM = {
            backgroundColor: selectedForecast!.colore,
            weatherImage: selectedForecast!.immagine
        }
        setHomeVM(homeVM);
    }

    const getInitialForecast = (forecasts: Meteo[]): Meteo | null => {
        return forecasts.reduce((closestForecast: Meteo | null, currentForecast: Meteo) => {
            const difference = Math.abs(currentForecast.data.getTime() - (new Date()).getTime());
            const closestDifference = closestForecast ? Math.abs(closestForecast.data.getTime() - (new Date()).getTime()) : Infinity;
            return difference < closestDifference ? currentForecast : closestForecast;
        }, null);
    }

    const getCityTitle = (): string => {
        let selectedCity = coordinates?.comuni.filter((c: Comune) => c.isProvincia)[0]; 
        return selectedCity?.comune + ', ' + selectedCity?.regione;
    }

    return (
    <div className='home-bg' style={{background: `linear-gradient(180deg, #3c3c56 0%, #3c3c56 35%,${homeVm.backgroundColor} 80% , ${homeVm.backgroundColor} 100%)`, transform: `translateY(${translation}vh)`}}>
        <div className="home-bg-image"></div>
        <div className="home-container">
            {coordinates && <>
            <div className='weather-details-box'>
                {selectedForecast && <WeatherDetails city={getCityTitle()} date={selectedForecast!.data} temperature={selectedForecast!.temperatura} weatherImage={homeVm.weatherImage}/>}
            </div>
            <div className='weather-list-box'>
                {selectedForecast && <WeatherList forecasts={forecasts} referenceDate={selectedForecast.data} handleForecastSelection={(forecast) => setSelectedForecast(forecast)}/>}
            </div>
            </>}
        </div>
    </div>
    );
}