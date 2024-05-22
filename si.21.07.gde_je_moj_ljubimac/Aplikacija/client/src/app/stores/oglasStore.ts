import { observable, action, makeObservable, computed, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { IOglas } from '../models/oglas';
import agent from '../api/agent';
import RootStore from './rootStore'
import { history } from '../..';
import { toast } from 'react-toastify';
import { reaction } from 'mobx';
import { HubConnection, LogLevel } from '@aspnet/signalr'
import { HubConnectionBuilder } from '@aspnet/signalr'
import { ChatComment } from '../models/comment';
import { IComment } from '../models/oglas';

const LIMIT = 100;

export default class OglasStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        reaction(
            () => this.predicate.keys(),
            () => {
                this.page = 0;
                this.oglasRegister.clear();
                this.loadOglasi();
            }
        );

        makeObservable(this, {
            loadingInitial: observable,
            loadOglasi: action,
            oglas: observable,
            kreirajOglas: action,
            submitting: observable,
            oglasiByDate: computed,
            oglasRegister: observable,
            editOglas: action,
            deleteOglas: action,
            target: observable,
            oglasBroj: observable,
            page: observable,
            totalPages: computed,
            setPage: action,
            predicate: observable,
            setPredicate: action,
            axiosParams: computed,
            loadOglasiTip: action,
            hubConnection: observable.ref,
            createHubConnection: action,
            stopHubConnection: action,
            addComment: action,
            comments: observable,
            oglasiZaFilter: action
        })
    }

    @observable oglasRegister = new Map();
    @observable oglas: IOglas | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';
    @observable oglasBroj = 0;
    @observable page = 0;
    @observable predicate = new Map().set('all', true);
    @observable.ref hubConnection: HubConnection | null = null;
    @observable comments: ChatComment[];


    @action addComment = async (values: any) => {
        values.oglasId = this.oglas!.id;
        try {
            await this.hubConnection!.invoke('SendComment', values)
        }
        catch (error) {
            console.log(error)
        }
    }

    @action createHubConnection = () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/comment', {
                accessTokenFactory: () => this.rootStore.commonStore.token!
            })
            .configureLogging(LogLevel.Information)
            .build();
        this.hubConnection.serverTimeoutInMilliseconds = 1000 * 60 * 10;

        this.hubConnection.start().then(() => console.log(this.hubConnection!.serverTimeoutInMilliseconds)).catch(error => console.log('Greška u uspostavljanju konekcije', error));

        this.hubConnection.on('ReceiveComment', comment => {
            runInAction(() => {
                this.oglas!.comments.push(comment);
            })
        });

        this.hubConnection.on('LoadComments', (comments: IComment[]) => {
            runInAction(() => {
                this.oglas!.comments = comments
            });
        })
    };

    @action stopHubConnection = () => {
        this.hubConnection!.stop();
    }

    @action setPredicate = (predicate: string, value: string) => {
        const resetPredicate = () => {
            this.predicate.forEach((value, key) => {
                if (key !== 'tip') this.predicate.delete(key);
            })
        }
        resetPredicate();
        this.predicate.set(predicate, value);
        // switch (predicate) {
        //     case 'all':
        //         resetPredicate();
        //         this.predicate.set('all', true);
        //         break;
        //     case 'izgubljen':
        //         resetPredicate();
        //         this.predicate.set('izgubljen', true);
        //         break;
        //     case 'nadjen':
        //         resetPredicate();
        //         this.predicate.set('nadjen', true);
        //         break;
        //     case 'udomljen':
        //         resetPredicate();
        //         this.predicate.set('udomljen', true);
        //         break;
        // }
    }

    @computed get axiosParams() {
        const params = new URLSearchParams();
        params.append('limit', String(LIMIT));
        params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
        this.predicate.forEach((value, key) => {
            if (key === 'tip') {
                params.append(key, value);
            }
        })
        return params;
    }

    @computed get totalPages() {
        return Math.ceil(this.oglasBroj / LIMIT);
    }

    @action setPage = (page: number) => {
        this.page = page;
    }

    @computed get oglasiByDate() {
        return Array.from(this.oglasRegister.values()).slice().sort((a, b) => Date.parse(b.dateTime) - Date.parse(a.dateTime));
    }

    @action oglasiZaFilter(val: any) {
        console.log(val);
        // return Array.from(this.oglasRegister.values()).slice();
    }

    @action loadOglasi = async (initial: boolean = false) => {
        this.loadingInitial = true;
        if (initial) {
            this.oglasRegister.clear();
        }
        try {
            const oglasiEnvelope = await agent.Oglasi.list(this.axiosParams);
            const { oglasi, oglasBroj } = oglasiEnvelope;
            runInAction(() => {
                oglasi.forEach((oglas) => {
                    oglas.dateTime = oglas.dateTime!
                    this.oglasRegister.set(oglas.id, oglas);
                });
                this.oglasBroj = oglasBroj;
                this.loadingInitial = false;
            });

        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(error);
        }
    };

    @action loadOglasiTip = async () => {
        this.loadingInitial = true;

        try {
            const oglasiEnvelope = await agent.Oglasi.list(this.axiosParams);
            const { oglasi, oglasBroj } = oglasiEnvelope;
            runInAction(() => {
                oglasi.forEach((oglas) => {
                    oglas.dateTime = oglas.dateTime!
                    this.oglasRegister.set(oglas.tip_Oglasa, oglas);
                });
                this.oglasBroj = oglasBroj;
                this.loadingInitial = false;
            });

        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(error);
        }
    };

    @action loadOglas = async (id: string) => {
        console.log(id);
        let oglas = this.getOglas(id);
        if (oglas) {
            this.oglas = oglas;
            return oglas;
        } else {
            this.loadingInitial = true;
            try {
                oglas = await agent.Oglasi.details(id);
                runInAction(() => {
                    oglas.dateTime = oglas.dateTime!;
                    this.oglas = oglas;
                    this.oglasRegister.set(oglas.id, oglas);
                    this.loadingInitial = false;
                })
                return oglas;
            } catch (error) {
                runInAction(() => {
                    this.loadingInitial = false;
                })
                throw error;
            }
        }
    }

    @action clearOglas = () => {
        this.oglas = null;
    }

    @action getOglas = (id: string) => {
        return this.oglasRegister.get(id);
    }

    @action kreirajOglas = async (oglas: IOglas) => {
        this.submitting = true;
        try {
            await agent.Oglasi.create(oglas);
            runInAction(() => {

                this.oglasRegister.set(oglas.id, oglas);
                this.submitting = false;
            });
            history.push(`/oglasi/${oglas.id}`)
        }
        catch (error) {
            runInAction(() => {
                this.submitting = false;
            });
            toast.error('Problem pri kreiranju oglasa');
            console.log(error.response);
        }
    };

    @action editOglas = async (oglas: IOglas) => {
        this.submitting = true;
        try {
            await agent.Oglasi.update(oglas);
            runInAction(() => {
                this.oglasRegister.set(oglas.id, oglas);
                this.oglas = oglas;
                this.submitting = false;
            });
            history.push(`/oglasi/${oglas.id}`)

        }
        catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
            toast.error('Problem pri kreiranju oglasa');
            console.log(error.response);
        }
    }

    @action deleteOglas = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Oglasi.delete(id);
            runInAction(() => {
                this.oglasRegister.delete(id);
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
