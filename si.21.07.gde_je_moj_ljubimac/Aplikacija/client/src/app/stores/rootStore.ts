import { configure } from 'mobx';
import { createContext } from 'react';
import OglasStore from './oglasStore';
import UserStore from './userStore';
import CommonStore from './commonStore'
import ModalStore from './modalStore';
import KorisnikStore from './korisnikStore';
import ProfileStore from './profilStore'

configure({ enforceActions: 'always' });

export default class RootStore {
    oglasStore: OglasStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    korisnikStore: KorisnikStore;
    profileStore: ProfileStore;

    constructor() {
        this.oglasStore = new OglasStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.korisnikStore = new KorisnikStore(this);
        this.profileStore = new ProfileStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());