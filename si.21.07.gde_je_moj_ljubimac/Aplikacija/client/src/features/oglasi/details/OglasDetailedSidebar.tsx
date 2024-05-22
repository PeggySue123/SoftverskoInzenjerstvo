import React, { Fragment, useContext, useEffect } from "react";
import { Segment, Item } from "semantic-ui-react";
import KorisnikListItems from "../dashboard/KorisnikListItems";
import { IUser } from "../../../app/models/user";
import { RootStoreContext } from "../../../app/stores/rootStore";
import OglasCounter from './OglasCounter';
import { IKorisnik } from "../../../app/models/korisnik";
import { RouteComponentProps } from "react-router-dom";


const OglasDetailedSidebar = () => {
    const rootStore = useContext(RootStoreContext);
    const { oglas } = rootStore.oglasStore;
    const { korisnik, loadKorisnik } = rootStore.korisnikStore;

    useEffect(() => {
        loadKorisnik(oglas.korisnikId);
    }, [loadKorisnik, oglas.korisnikId])

    return (
        <Fragment>
            <Segment textAlign='center' style={{ border: 'none' }} attached='top' secondary inverted color='teal'>
                Kreator oglasa
            </Segment>
            <Segment attached>
                <Item.Group relaxed divided>
                    <Item style={{ marginLeft: 40 }}>
                        <KorisnikListItems key={oglas.korisnikId} korisnik={korisnik} />
                    </Item>
                    <OglasCounter />
                </Item.Group>
            </Segment>
        </Fragment>
    )
}

export default OglasDetailedSidebar