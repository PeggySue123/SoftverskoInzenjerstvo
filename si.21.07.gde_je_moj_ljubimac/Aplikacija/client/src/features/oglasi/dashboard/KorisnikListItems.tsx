import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { List, Card, Image, Button } from 'semantic-ui-react';
import { IKorisnik } from '../../../app/models/korisnik';
import { RootStoreContext } from '../../../app/stores/rootStore';


const KorisnikListItems: React.FC<{ korisnik: IKorisnik }> = ({ korisnik }) => {
    const rootStore = useContext(RootStoreContext);
    return (
        <Card key={korisnik?.id}>
            <Card.Content>
                <Image floated='left' size='tiny' src='/assets/user.png' />
                <Card.Header as={Link} to={`/korisnici/${korisnik?.id}`} textAlign='center' size='medium' >{korisnik?.displayName}</Card.Header>
            </Card.Content>
            <Card.Content>
                <Card.Meta>
                    <List.Icon name='marker' />
                    {korisnik?.adresa}</Card.Meta>
                <Card.Description >
                    <List.Icon name='mail' />
                    <a href={korisnik?.email}>{korisnik?.email}</a>
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default KorisnikListItems