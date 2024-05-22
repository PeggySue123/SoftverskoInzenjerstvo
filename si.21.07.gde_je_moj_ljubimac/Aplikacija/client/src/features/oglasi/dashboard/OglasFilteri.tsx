import React, { Fragment, useContext } from 'react'
import { Menu, Header } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore'
import { observer } from 'mobx-react-lite';
import OglasListItems from './OglasListItems';
import { IOglas } from '../../../app/models/oglas';

const OglasFilteri: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { oglasiZaFilter, oglas, setPredicate, loadOglasi } = rootStore.oglasStore;
    //const oglasic: IOglas[] = oglasiZaFilter.filter(x => x.tip_Oglasa === 'izgubljen');
    return (
        <Fragment>
            <Menu vertical size={'large'} style={{ width: '100%', marginTop: 0 }}>
                <Header icon={'filter'} attached color={'teal'} content={'Filteri'} />
                <Menu.Item active={oglas?.tip_Oglasa === 'all'}
                    onClick={() => {
                        setPredicate('tip', 'all');
                        loadOglasi(true);
                    }}
                    color={'blue'}
                    name={'all'}
                    content={'Svi oglasi'} />
                <Menu.Item active={oglas?.tip_Oglasa === 'izgubljen'}
                    onClick={() => {
                        setPredicate('tip', 'izgubljen')
                        loadOglasi(true);
                    }}
                    color={'blue'}
                    name={'izgubljen'}
                    content={'Izgubljeni'} />
                <Menu.Item active={oglas?.tip_Oglasa === 'nadjen'}
                    onClick={() => {
                        setPredicate('tip', 'nadjen')
                        loadOglasi(true);
                    }}
                    color={'blue'}
                    name={'nadjen'}
                    content={'Nađeni'} />
                <Menu.Item active={oglas?.tip_Oglasa === 'udomljen'}
                    onClick={() => {
                        setPredicate('tip', 'udomljen')
                        loadOglasi(true);

                        // console.log(oglasiZaFilter);
                        // console.log(oglasic);
                        // return (
                        //     oglasic.map(oglas1 => (
                        //         <OglasListItems key={oglas1.id} oglas={oglas1} />
                        //     )))
                    }}
                    color={'blue'}
                    name={'udomljen'}
                    content={'Za udomljavanje'} />
            </Menu>
        </Fragment>
    )
}

export default observer(OglasFilteri);