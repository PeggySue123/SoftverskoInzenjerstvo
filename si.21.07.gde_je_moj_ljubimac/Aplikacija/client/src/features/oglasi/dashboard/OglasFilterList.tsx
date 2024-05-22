import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Item} from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import OglasListItems from './OglasListItems';
import { IOglas } from '../../../app/models/oglas';


const OglasFilterList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { oglasiZaFilter } = rootStore.oglasStore;
    //const oglasic: IOglas[] = oglasiZaFilter.filter(x => x.tip_Oglasa === 'izgubljen');
    return (
        <div></div>
            // <Item.Group divided>
            //     {oglasic.map(oglas1 => (
            //                     <OglasListItems key={oglas1.id} oglas={oglas1} />
            //                 ))}
            // </Item.Group>
    )
}

export default observer(OglasFilterList);