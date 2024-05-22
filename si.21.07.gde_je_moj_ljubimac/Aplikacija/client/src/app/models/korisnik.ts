import { IOglas } from "./oglas";

export interface IKorisnikEnvelope {
    korisnici: IKorisnik[];
    korisnikBroj: number;
}

export interface IKorisnik{

    id : string;
    displayName: string;
    adresa : string; 
    ocena : number;
    statusNaloga : number;
    tipKorisnika : number;
    email: string;
    username: string;
    oglasi: IOglas[];
}

export interface IOcena{
    ocenaValue: number;
    korisnikId:string;
}
