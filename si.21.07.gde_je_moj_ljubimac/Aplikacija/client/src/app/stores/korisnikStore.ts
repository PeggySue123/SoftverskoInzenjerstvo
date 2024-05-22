import { observable, action, makeObservable, computed, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { IKorisnik, IOcena } from '../models/korisnik';
import agent from '../api/agent';
import RootStore from './rootStore'
import { history } from '../..';
import { toast } from 'react-toastify';
import { HubConnection, LogLevel } from '@aspnet/signalr'
import { HubConnectionBuilder } from '@aspnet/signalr'
import { IPoruke } from '../models/poruke';

const LIMIT = 3;

export default class KorisnikStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            korisnik: observable,
            korisnikRegister: observable,
            loadingInitial: observable,
            submitting: observable,
            target: observable,
            korisnikBroj: observable,
            page: observable,
            axiosParams: computed,
            korisniciByDate: computed,
            clearKorisnik: action,
            setPage: action,
            totalPages: computed,
            hubConnection: observable,
            poruke: observable,
            createHubConnection: action,
            stopHubConnection: action,
            porukica: observable,
            addOcena: action

        })
    }

    @observable korisnikRegister = new Map();
    @observable korisnik: IKorisnik | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';
    @observable korisnikBroj = 0;
    @observable page = 0;
    @observable.ref hubConnection: HubConnection | null = null;
    @observable poruke: IPoruke[];
    @observable porukica: IPoruke;

    @computed get isKreator() {
        if (this.rootStore.oglasStore.oglas && this.korisnik) {
            return this.korisnik.id === this.rootStore.oglasStore.oglas.korisnikId;
        } else {
            return false;
        }
    }

    @computed get totalPages() {
        return Math.ceil(this.korisnikBroj / LIMIT);
    }

    @action setPage = (page: number) => {
        this.page = page;
    }

    @computed get axiosParams() {
        const params = new URLSearchParams();
        params.append('limit', String(LIMIT));
        params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
        return params;
    }

    @computed get korisniciByDate() {
        return Array.from(this.korisnikRegister.values()).slice().sort((a, b) => Date.parse(b.dateTime) - Date.parse(a.dateTime))
    }

    @action addPoruka = async (values: any) => {
        values.id = this.porukica!.id;
        try {
            await this.hubConnection!.invoke('SendComment', values)
        }
        catch (error) {
            console.log(error)
        }
    }

    @action createHubConnection = () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/poruke', {
                accessTokenFactory: () => this.rootStore.commonStore.token!
            })
            .configureLogging(LogLevel.Information)
            .build();
        this.hubConnection.serverTimeoutInMilliseconds = 1000 * 60 * 10;

        this.hubConnection.start().then(() => console.log(this.hubConnection!.serverTimeoutInMilliseconds)).catch(error => console.log('Greška u uspostavljanju konekcije', error));

        this.hubConnection.on('ReceiveComment', comment => {
            runInAction(() => {
                this.poruke!.push(comment);
            })
        });

        this.hubConnection.on('LoadComments', (poruke: IPoruke[]) => {
            runInAction(() => {
                this.poruke! = poruke
            });
        })
    };

    @action stopHubConnection = () => {
        this.hubConnection!.stop();
    }


    @action clearKorisnik = () => {
        this.korisnik = null;
    }

    @action getKorisnik = async (id: string) => {
        return this.korisnikRegister.get(id);
    }

    @action loadKorisnik = async (id: string) => {
        console.log(id);
        let korisnik = await this.getKorisnik(id);
        if (korisnik) {
            this.korisnik = korisnik;
            return korisnik;
        } else {
            this.loadingInitial = true;
            try {
                korisnik = await agent.Korisnici.details(id);
                runInAction(() => {
                    korisnik.displayName = korisnik.displayName!;
                    this.korisnik = korisnik;
                    this.korisnikRegister.set(korisnik.id, korisnik);
                    this.loadingInitial = false;
                })
                return korisnik;
            } catch (error) {
                runInAction(() => {
                    this.loadingInitial = false;
                })
                throw error;
            }
        }
    }


    @action loadKorisnici = async () => {
        this.loadingInitial = true;
        try {
            const korisniciEnvelope = await agent.Korisnici.list(this.axiosParams);
            const { korisnici, korisnikBroj } = korisniciEnvelope;
            runInAction(() => {
                korisnici.forEach((korisnik) => {
                    this.korisnikRegister.set(korisnik.id, korisnik);
                });
                this.korisnikBroj = korisnikBroj;
                this.loadingInitial = false;
            });

        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(error);
        }
    }

    @action addOcena = async (ocena: IOcena) => {

        this.submitting = true;
        try {
            await agent.Ocene.create(ocena)
            runInAction(() => {
                this.korisnikRegister.set(this.korisnik.id, ocena)
                this.submitting = false;
            });
        }
        catch (error) {
            runInAction(() => {
                this.submitting = false;
            });
            console.log(error.response);
        }
    };

    @action kreirajKorisnika = async (korisnik: IKorisnik) => {
        this.submitting = true;
        try {
            await agent.Korisnici.create(korisnik);
            runInAction(() => {

                this.korisnikRegister.set(korisnik.id, korisnik);
                this.submitting = false;
            });
            history.push(`/korisnici/${korisnik.id}`)
        }
        catch (error) {
            runInAction(() => {
                this.submitting = false;
            });
            toast.error('Problem pri kreiranju korisnika');
            console.log(error.response);
        }
    };

    @action editKorisnik = async (korisnik: IKorisnik) => {
        this.submitting = true;
        try {
            await agent.Korisnici.update(korisnik);
            runInAction(() => {
                this.korisnikRegister.set(korisnik.id, korisnik);
                this.korisnik = korisnik;
                this.submitting = false;
            });
            history.push(`/korisnici/${korisnik.id}`)

        }
        catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
            toast.error('Problem pri kreiranju oglasa');
            console.log(error.response);
        }
    }

    @action deleteKorisnik = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Korisnici.delete(id);
            runInAction(() => {
                this.korisnikRegister.delete(id);
                this.submitting = false;
                this.target = '';
            })

        }
        catch (error) {
            runInAction(() => {
                this.submitting = false;
                this.target = '';
            })
            console.log(error);
        }
    }
}
