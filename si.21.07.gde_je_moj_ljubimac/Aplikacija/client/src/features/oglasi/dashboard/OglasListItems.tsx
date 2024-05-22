import React, { useContext, useEffect } from 'react';
import { Item, Button, Segment, Icon, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IOglas } from '../../../app/models/oglas';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { IKorisnik } from '../../../app/models/korisnik';

const OglasListItems: React.FC<{ oglas: IOglas}> = ({ oglas }) => {
    const rootStore = useContext(RootStoreContext);
    const { deleteOglas } = rootStore.oglasStore;
    const { user } = rootStore.userStore;
    const {  korisnik, isKreator, loadKorisnici,korisnikRegister,getKorisnik } = rootStore.korisnikStore;
    // console.log(toJS(oglas.slike));
    // console.log(toJS(oglas.slike[0]?.id));
    // console.log(oglas.slike[0]?.url);
    // console.log(isKreator);
    // console.log(korisnik);

    useEffect(() => {
        loadKorisnici();
    }, [loadKorisnici]);
    //console.log(loadKorisnici())
    return (

        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' src={oglas.slike[0] ? oglas.slike[0].url : '/assets/kuca8.jpg'} style={{ marginBottom: 3 }} />

                        <Item.Content>
                            <Item.Header as={Link} to={`/oglasi/${oglas.id}`} >
                                {oglas.naslov}
                            </Item.Header>
                            <Divider />
                            {
                                isKreator ? 
                                <Item.Description as={Link} to={`/korisnici/${oglas.korisnikId}`} >
                                    Kreirano od {(korisnikRegister.get(oglas.korisnikId))?.displayName || 'korisnika'}
                                </Item.Description> : 
                                    <Item.Description as={Link} to={`/korisnici/${oglas.korisnikId}`} >
                                    Kreirano od {(korisnikRegister.get(oglas.korisnikId))?.displayName || 'korisnika'}
                                </Item.Description>
                                
                            }
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='clock' /> {oglas.dateTime?.toString()}
                <Icon name='marker' /> {oglas.lokacija}
            </Segment>
            <Segment secondary>
                <span>{oglas.opis}</span>
            </Segment>
            <Segment clearing>

                <Button
                    as={Link} to={`/oglasi/${oglas.id}`}
                    floated='right'
                    content='Vidi više'
                    color='grey'
                />
                {
                    user?.userId === oglas.korisnikId &&
                    <Button
                        content="Obrisi"
                        onClick={(e) => {
                            deleteOglas(e, oglas.id);
                        }} />
                }

            </Segment>
        </Segment.Group>

    )
}

export default observer(OglasListItems)