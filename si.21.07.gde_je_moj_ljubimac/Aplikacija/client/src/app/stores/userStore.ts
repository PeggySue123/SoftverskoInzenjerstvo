import { observable, makeObservable, computed, action, runInAction } from 'mobx'
import { IUser, IUserFormValues} from "../models/user";
import agent from "../api/agent";
import  RootStore  from './rootStore';
import { history } from '../..';


export default class UserStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this, {
            user: observable,
            isLoggedIn: computed,
            login: action,
            getUser: action,
            logout: action,
            register: action
        })
    }

    @observable user: IUser | null = null;

    @computed get isLoggedIn() {return !!this.user}

    @action login = async (values: IUserFormValues) => {
        console.log(values);
        try {
            const user = await agent.User.login(values);
            runInAction(() => {
                this.user = user;
            })
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            history.push('/oglasi')
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @action getUser = async () => {
        try{
            const user = await agent.User.current();
            runInAction(() => {
                this.user = user;
            })
        } catch (error) {
            console.log(error);
        }
    }

    @action logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
        history.push('/')
    }

    @action register = async (values: IUserFormValues) => {
        try {
            console.log(values);
            const user = await agent.User.register(values);
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            history.push('/oglasi')
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
}
