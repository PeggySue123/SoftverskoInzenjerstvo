import axios, { AxiosResponse} from 'axios';
import { IOglas, IOglasEnvelope } from '../models/oglas';
import { IKorisnik, IKorisnikEnvelope, IOcena} from '../models/korisnik';
import { IUser, IUserFormValues } from '../models/user';
import { IProfile } from '../models/profil'
import { toast } from 'react-toastify';
import { history } from '../..';
import { IPoruke } from '../models/poruke';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config
}, error => {
    return Promise.reject(error);
})

axios.interceptors.response.use(undefined, (error) => {
    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network Error - make sure API is running!')
    }
    const { status, data, config } = error.response;
    if (status === 404) {
        history.push('/notfound');
    }
    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push('/notfound');
    }
    if (status === 500) {
        console.log('Greška na serveru - proverite terminal za više informacija!');
    }
    throw error.response;
})

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: async (url: string, body: {}) => {
        const formData = new FormData();
        for (const key in body) {
            formData.append(key, body[key]);
        }
        const response = await axios.post(url, formData);
        return responseBody(response);
    },
    put: (url: string, body: {}) => {
        const formData = new FormData();
        for (const key in body) {
            formData.append(key, body[key]);
        }
        return axios.put(url, formData).then(responseBody)
    },
    del: (url: string) => axios.delete(url).then(responseBody)
}

const Oglasi = {
    list: (params: URLSearchParams): Promise<IOglasEnvelope> => axios.get('/oglasi', {params: params}).then((sleep(1000))).then(responseBody),
    details: (id: string) => requests.get(`/oglasi/${id}`),
    create: (oglas: IOglas) => requests.post('/oglasi', oglas),
    update: (oglas: IOglas) => requests.put(`/oglasi`, oglas),
    delete: (id: string) => requests.del(`/oglasi/${id}`),
    tip: (tip: string) => requests.get('/oglasi/tipoglasa')
}

const Korisnici = {
    list: (params: URLSearchParams): Promise<IKorisnikEnvelope> => axios.get('/korisnici', {params: params}).then((sleep(1000))).then(responseBody),
    create: (korisnik: IKorisnik) => requests.post('/korisnici', korisnik),
    update: (korisnik: IKorisnik) => requests.put(`/korisnici`, korisnik),
    delete: (id: string) => requests.del(`/korisnici/${id}`),
    details: (id: string) => requests.get(`/korisnici/${id}`) 
}

const Profile = {
    get: (id: string): Promise<IProfile> => requests.get(`/korisnici/${id}`),
    updateProfile: (profile: Partial<IProfile>) => requests.put(`/korisnici/${profile.id}`, profile)
}

const User = {
    current: (): Promise<IUser> => requests.get('/korisnici/current'),
    login: (user: IUserFormValues): Promise<IUser> => requests.post('/korisnici/login', user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post('/korisnici/register', user)
}

const Poruke = {
    list: (params: URLSearchParams): Promise<IPoruke> => axios.get('/poruke', {params: params}).then((sleep(1000))).then(responseBody)
}

const Ocene = {
    create: (ocena: IOcena) => requests.post('/ocene', ocena)
}

const exportObjekti = {
    Oglasi,
    User,
    Korisnici,
    Profile,
    Ocene
};

export default exportObjekti;