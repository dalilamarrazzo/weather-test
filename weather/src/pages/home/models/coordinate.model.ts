import { Comune } from "./comune.model";

export class Coordinate{

    stato!: string;
    comuni!: Comune[];
    cap!: string;

    constructor(data?: any){
        // this.stato = data["country"] ?? '';
        // this.comuni = data["places"].map((place: any) => new Comune(place)) ?? [];
        // this.cap = data["post code"] ?? '';
        Object.assign(this,data);
    }
}