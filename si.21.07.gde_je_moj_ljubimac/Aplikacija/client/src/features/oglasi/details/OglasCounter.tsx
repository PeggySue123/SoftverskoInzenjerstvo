import React, { useContext } from 'react';
import { Icon, Item, Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore'

const OglasCounter = () => {
    const rootStore = useContext(RootStoreContext);
    const { oglas } = rootStore.oglasStore;
    return (
        <Segment textAlign='center'>
            <Icon name='clock outline' floated='center' size='big' />
            <Item>
                <h3>
                    Oglas je kreiran pre: {(Math.abs(new Date().getTime() - new Date(oglas.dateTime.toString()).getTime()) / 1000 / 3600 / 24).toFixed(0)}  dan(a)
                </h3>
            </Item>
        </Segment>

    )
}

export default OglasCounter