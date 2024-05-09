export class Comune{

    comune!: string;
    regione!: string;
    provincia?: string;
    isProvincia!: boolean;
    longitudine!: string;
    latitudine!: string;

    constructor(data?: any){
        this.comune = data["place name"] ?? '';
        this.regione = data["state"] ?? '';
        this.provincia = data["state abbreviation"] ?? null;
        this.isProvincia = data["state abbreviation"] !== '';
        this.longitudine = data["longitude"] ?? '';
        this.latitudine = data["latitude"] ?? '';
    }
}