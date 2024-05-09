import { Tab, Tabs } from 'react-bootstrap';
import './WeatherList.css';
import { Meteo } from '../../models/meteo.model';
import { useEffect, useState } from 'react';
import { WeatherCardVM } from '../weather-card/models/weather-card-vm.model';
import WeatherCard from '../weather-card/WeatherCard';

export default WeatherList;

interface WeatherListProps{
    forecasts: Meteo[];
    referenceDate: Date;
    handleForecastSelection: (forecast: Meteo) => void;
}

function WeatherList(props: WeatherListProps) {

    const [hourlyForecasts, setHourlyForecasts] = useState([] as Meteo[]);
    const [weeklyForecasts, setWeeklyForecasts] = useState([] as Meteo[]);
    const [key, setKey] = useState('hour');

    useEffect(() => {
        setHourlyForecasts(props.forecasts.filter((forecast) => forecast.data.getDate() === props.referenceDate.getDate()));
        setWeeklyForecasts(getWeeklyForecasts());
    }, [props.forecasts, props.referenceDate])

    const getWeeklyForecasts = () => {
        const filteredForecasts = props.forecasts.reduce((acc, forecast) => {
            const forecastDate = forecast.data.toDateString();
            if (!acc[forecastDate]) { acc[forecastDate] = forecast }
            else if (forecast.stato > acc[forecastDate].stato){ acc[forecastDate] = forecast }
            return acc;
        }, {} as Record<string, Meteo>);       
        return Object.values(filteredForecasts);
    }

    return (
        <div className='weather-list-container'>
            <Tabs activeKey={key} id="weather-tab" fill onSelect={(k) => setKey(k!)}>
                <Tab eventKey="hour" title="Orario">
                    {hourlyForecasts.map((f, index) => (
                        <WeatherCard key={index} model={WeatherCardVM.buildHourWeatherCard(f)} handleForecastSelection={(forecast) => props.handleForecastSelection(forecast)}/>
                    ))}
                </Tab>
                <Tab eventKey="week" title="Settimana">
                    {weeklyForecasts.map((f, index) => (
                        <WeatherCard key={index} model={WeatherCardVM.buildWeekWeatherCard(f)} handleForecastSelection={(forecast) => {setKey('hour'); props.handleForecastSelection(forecast)}}/>
                    ))}
                </Tab>
            </Tabs>
        </div>
    );
}