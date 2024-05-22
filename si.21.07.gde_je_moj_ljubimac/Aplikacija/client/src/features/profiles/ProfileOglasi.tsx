import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Tab, Header, Item } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import OglasListItems from '../oglasi/dashboard/OglasListItems';

const ProfileOglasi: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {profile} = rootStore.profileStore;
    return (
        <Tab.Pane>
            <Header icon='image' content='Oglasi' />
            <Item.Group divided>
                {profile && profile.oglasi.map(oglas => (
                    <OglasListItems key={oglas.id} oglas = {oglas} />
                ))}
            </Item.Group>
        </Tab.Pane>
    )
}

export default observer(ProfileOglasi) 