import { ReactNode } from "react";
import { StatoMeteo, getIcon, getImage, getColor } from "./stato_meteo.model";
import { stat } from "fs";

export class Meteo{

    data!: Date;
    stringData!: string;
    umidita!: number;
    temperatura!: number;
    pioggia?: number;
    stato!: StatoMeteo;
    iconaStato!: ReactNode;
    immagine!: ReactNode;
    colore!: ReactNode;

    constructor(data?: any){
        if(!data) { return }
        this.data = new Date(data.dt * 1000);
        this.stringData = data.dt_txt;
        this.umidita = data.main.humidity;
        this.temperatura = Math.round(data.main.temp);
        this.pioggia = data.rain ? data.rain[0] : null;
        this.stato = this.getStatoMeteo(data.weather[0].id.toString());
        this.iconaStato = getIcon(this.stato);
        this.immagine = getImage(this.stato);
        this.colore = getColor(this.stato);
    }

    getStatoMeteo(status: string): StatoMeteo{
        switch (status.charAt(0)) {
            case '2':
                return StatoMeteo.TEMPORALE;
            case '3':
            case '5':
                return StatoMeteo.PIOGGIA;
            case '6':
                return StatoMeteo.NEVE;
            case '8':
                if (status === '800') { return StatoMeteo.SOLEGGIATO }
                return StatoMeteo.NUVOLOSO;
            default:
                return StatoMeteo.NUVOLOSO;
        }
    }
}