import './WeatherDetails.css';
import { ReactNode, useEffect, useState } from 'react';

export default WeatherDetails;

interface WeatherDetailsProps{
    city: string,
    date: Date,
    temperature: number,
    weatherImage: ReactNode
}

function WeatherDetails(props: WeatherDetailsProps) {

    const [translation, setTranslation] = useState(0);
    const [opacity, setOpacity] = useState(0);
    
    useEffect(() => {
        setTranslation(0);
        setOpacity(0);
            setTimeout(() => {
                setTranslation(-34);
                setOpacity(1);
            }, 600);
    }, [props.weatherImage]);

    const getFormattedDate = (date: Date): string => {
        const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
        const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
        return days[date.getDay()]  + ' ' + date.getDate() + ' ' + months[date.getMonth()] + ', ' + date.getHours() + ':00';
    }

    return (
        <div className='weather-details-container'>
            <div className="text-box" style={{opacity: opacity}}>
                <p className="city m-0">{props.city}</p>
                <p className="date">{getFormattedDate(props.date)}</p>
                <p className="temperature">{props.temperature}°</p>
            </div>

            <div className="weather-image" style={{backgroundImage: `url(${props.weatherImage})`, transform: `translateX(${translation}rem)`, opacity: opacity }}></div>
        </div>
    );
}