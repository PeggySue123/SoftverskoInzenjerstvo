import React, { useContext } from 'react';
import {  Card} from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import KorisnikListItems from './KorisnikListItems';

const KorisnikList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { korisniciByDate, deleteKorisnik, submitting, target } = rootStore.korisnikStore;
    return (
            <Card.Group divided position='center'>
                {korisniciByDate.map(korisnik => (
                    <KorisnikListItems  key={korisnik.id} korisnik = {korisnik} />
                ))}
            </Card.Group>
    )
}

export default KorisnikList