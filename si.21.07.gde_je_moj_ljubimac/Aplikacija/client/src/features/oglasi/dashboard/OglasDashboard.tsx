import React, { useContext, useEffect, useState } from 'react'
import { Grid, Loader } from 'semantic-ui-react';
import OglasList from './OglasList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import InfinireScroll from 'react-infinite-scroller';
import OglasFilteri from './OglasFilteri';


const OglasDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadOglasi, loadingInitial, setPage, page, totalPages } = rootStore.oglasStore;
    const [loadingNext, setLoadingNext] = useState(false);

    const handleGetNext = () => {
        setLoadingNext(true);
        setPage(page + 1);
        loadOglasi().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        loadOglasi();
    }, [loadOglasi]);

    if (loadingInitial && page === 0)
        return <LoadingComponent content='Učitavanje oglasa...' />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <InfinireScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && page + 1 > totalPages}
                    initialLoad={false}>
                    <OglasList />
                </InfinireScroll>
            </Grid.Column>
            <Grid.Column width={6}>
                <OglasFilteri />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
}

export default observer(OglasDashboard);