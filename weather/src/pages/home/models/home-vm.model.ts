import { ReactNode } from "react";

export class HomeVM{
    backgroundColor!: ReactNode;
    weatherImage!: ReactNode;

    constructor(data?: any){
        Object.assign(this,data);
    }
}