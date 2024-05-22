import React, { useContext, useEffect, useState } from 'react'
import { Grid, Loader } from 'semantic-ui-react';
import KorisnikList from './KorisnikList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import InfinireScroll from 'react-infinite-scroller';


const KorisnikDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadKorisnici, loadingInitial, setPage, page, totalPages } = rootStore.korisnikStore;
    const [loadingNext, setLoadingNext] = useState(false);

    const handleGetNext = () => {
        setLoadingNext(true);
        setPage(page + 1);
        loadKorisnici().then(() => setLoadingNext(false));
    }

    //const [korisnici, setKorisnik] = useState<IKorisnik[]>([]);

    useEffect(() => {
        loadKorisnici();
    }, [loadKorisnici]);

    if (loadingInitial && page === 0)
        return <LoadingComponent content='Učitavanje liste korisnika...' />;

    return (
        <Grid>
            <Grid.Column className = 'korisniklist' fluid width={16} justify='center' alignItems='center' >
                <InfinireScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && page + 1 > totalPages}
                    initialLoad={false}>
                    <KorisnikList />
                </InfinireScroll>
            </Grid.Column>
            <Grid.Column width={16}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
}

export default observer(KorisnikDashboard);