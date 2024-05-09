import { Comune } from "../models/comune.model";
import { Coordinate } from "../models/coordinate.model";

interface Action {
    type: string;
    payload: any;
}

const initialState: Coordinate = {
    stato: '',
    comuni: [],
    cap: ''
}

const CoordinatesReducer = (state: Coordinate = initialState, action: Action) => {
    switch (action.type) {
        case 'SET_COORDINATES':
            return {
                ...state,
                stato: action.payload["country"] ?? '',
                comuni: action.payload["places"].map((place: any) => new Comune(place)) ?? [],
                cap: action.payload["post code"] ?? ''
            }
        default: 
            return state;
    }
}

export default CoordinatesReducer;
