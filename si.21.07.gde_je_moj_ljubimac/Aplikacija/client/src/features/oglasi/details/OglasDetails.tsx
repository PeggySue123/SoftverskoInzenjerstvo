import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import OglasDetailedInfo from "./OglasDetailedInfo";
import OglasDetailsHeader from "./OglasDetailsHeader";
import OglasDetailedChat from "./OglasDetailedChat";
import OglasDetailedSidebar from "./OglasDetailedSidebar";


interface DetailParams {
    id: string
}

const OglasDetails: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history
}) => {
    const rootStore = useContext(RootStoreContext);
    const { oglas, loadOglas, loadingInitial } = rootStore.oglasStore;

    useEffect(() => {
        loadOglas(match.params.id).catch(() => {
            history.push('/notfound');
        })
    }, [loadOglas, match.params.id, history])

    if (loadingInitial || !oglas) return <LoadingComponent content='Učitavanje oglasa...' />

    if(!oglas)
        return <h2>Oglas nije pronađen</h2>

    return (
        <Grid>
            <Grid.Column width={10}>
                <OglasDetailsHeader oglas = {oglas} />
                <OglasDetailedInfo oglas={oglas} />
                <OglasDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <OglasDetailedSidebar />
            </Grid.Column>
        </Grid>
    )
}

export default observer(OglasDetails);