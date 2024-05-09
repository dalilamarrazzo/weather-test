import { ToastVM } from "../models/toast.model";

interface Action {
    type: string;
    payload: any;
}

const initialState: ToastVM = {
    content: '',
}

const ToastReducer = (state: ToastVM = initialState, action: Action) => {
    switch (action.type) {
        case 'SHOW_TOAST':
            return { 
                    ...state,
                    content: action.payload.content,
            } as ToastVM;
        default: 
            return state;
    }
}

export default ToastReducer;
