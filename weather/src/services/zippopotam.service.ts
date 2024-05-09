import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import apiUrls from '../shared/const/apiUrls';

class ZippopotamService {
    async getCoordinates(zipCode: string, dispatch: Dispatch) {
        try {
            const response = await axios.get(`${apiUrls.coordinates.url}/it/${zipCode}`);
            dispatch({ type: 'SET_COORDINATES', payload: response.data });
        } catch (error: any) {
            dispatch({ type: 'SHOW_TOAST', payload: {content: error.response.status === 404 
                ? 'Il CAP inserito non è valido' 
                : 'Errore di comunicazione con il server. Riprovare più tardi' }
            });
        }
    }
}

export default ZippopotamService;