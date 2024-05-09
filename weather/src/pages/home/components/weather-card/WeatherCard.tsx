import { Meteo } from '../../models/meteo.model';
import './WeatherCard.css';
import { WeatherCardVM } from './models/weather-card-vm.model';

export default WeatherCard;

interface WeatherCardProps{
    model: WeatherCardVM;
    handleForecastSelection: (forecast: Meteo) => void;
}

function WeatherCard(props: WeatherCardProps) {

    const handleClick = () => {
        props.handleForecastSelection(props.model.referenceForecast);
    }

    return (
        <div className='weather-card-container' onClick={handleClick}>
            <div className="title">{props.model.title}</div>
            <div className="icon">{props.model.icon}</div>
            <div className="temperature">{props.model.temperature}</div>
        </div>
    );
}