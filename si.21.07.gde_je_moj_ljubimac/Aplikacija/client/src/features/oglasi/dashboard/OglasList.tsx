import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Item} from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import OglasListItems from './OglasListItems';


const OglasList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { oglasiByDate } = rootStore.oglasStore;
    return (
            <Item.Group divided>
                {oglasiByDate.map(oglas => (
                    <OglasListItems key={oglas.id} oglas = {oglas} />
                ))}
            </Item.Group>
    )
}

export default observer(OglasList);