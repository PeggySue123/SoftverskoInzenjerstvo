import { IOglas } from "./oglas";

export interface IProfile{
    id: string,
    displayName: string,
    userName: string,
    adresa: string,
    email: string,
    image: string,
    oglasi: IOglas[],
    ocena: number
}