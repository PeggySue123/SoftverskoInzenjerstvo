
export interface IOglasEnvelope {
    oglasi: IOglas[];
    oglasBroj: number;
}

export interface Slike {
    id: string;
    url: string;
    isMain: boolean;
}

export interface IOglas {

    id: string;
    naslov: string;
    dateTime: Date | null|string;
    opis: string;
    lokacija: string;
    vrsta: string;
    rasa: string;
    pol: string;
    boja: string;
    tip_Oglasa: string;
    starost: number;
    vakcinisan?: any;
    sterilisan?: any;
    papiri?: any;
    korisnikId:string;
    isKomentator: boolean;
    isHost: boolean;
    comments: IComment[];
    slike: Slike[];

}

export interface IComment {
    id: string;
    createdAt: Date;
    text: string;
    username: string;
    displayName: string;
}

export interface IOglasFormValues extends Partial<IOglas>
{}

export class OglasFormValues implements IOglasFormValues {
    id?: string = '';
    naslov: string = '';
    dateTime: Date = new Date();
    opis: string = '';
    lokacija: string = '';
    vrsta: string= '';
    rasa: string= '';
    pol: string= '';
    boja: string='';
    tip_Oglasa: string='';
    starost?: number = undefined;
    vakcinisan?: boolean = false;
    sterilisan?: boolean = false;
    papiri?: boolean = false;
    korisnikId: string = '';
    slike: { id: string; url: string; isMain: boolean }[] = [];

    constructor(init? : any) {
        Object.assign(this, init);
    }
}
