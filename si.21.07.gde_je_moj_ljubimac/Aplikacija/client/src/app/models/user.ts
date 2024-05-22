import { IOglas } from "./oglas";

export interface IUser {
    username: string;
    displayName: string;
    token: string;
    image?: string;
    id : string;
    userId : string;
    adresa : string; 
    ocena : number;
    statusNaloga : number;
    tipKorisnika : number;
    email:string;
    oglasi: IOglas[];
}

export interface IUserFormValues {

    username: string;
    displayName: string;
    token: string;
    image?: string;
    id : string;
    userId : string;
    adresa : string; 
    ocena : number;
    statusNaloga : number;
    tipKorisnika : number;
    email:string;
    oglasi: IOglas[];
}