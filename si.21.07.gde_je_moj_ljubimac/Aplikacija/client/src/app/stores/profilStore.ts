import { makeObservable, observable, action, runInAction, computed } from 'mobx';
import  RootStore  from './rootStore'
import { IProfile } from '../models/profil';
import agent from '../api/agent';

export default class ProfileStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            profile: observable,
            loadingProfile: observable,
            loadProfile: action,
            isCurrentUser: computed
        })
    }

    @observable profile: IProfile | null = null;
    @observable loadingProfile = true;

    @computed get isCurrentUser() {
        if(this.rootStore.userStore.user && this.profile) {
            return this.rootStore.userStore.user.userId === this.profile.id;
        } else {
            return false;
        }
    }

    @action loadProfile = async ( id: string ) => {
        try{
            const profile= await agent.Profile.get(id);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile=false;
            })
        }
        catch(error) {
            runInAction(() => {
                this.loadingProfile=false;
            })
            console.log(error);
        }
    }

    @action updateProfile = async (profile: Partial<IProfile>) => {
        try {
            //console.log(profile);
            profile['lockoutEnd'] = new Date().toISOString();
            //profile['append']('LockoutEnd',new Date().toISOString);
            await agent.Profile.updateProfile(profile);
            runInAction(() => {
                if(profile.displayName !== this.rootStore.userStore.user!.displayName)
                {
                    this.rootStore.userStore.user!.displayName = profile.displayName!;
                }
                this.profile={...this.profile!, ...profile};
            })
        }
        catch(error) {
            console.log(error);
        }
    }
}