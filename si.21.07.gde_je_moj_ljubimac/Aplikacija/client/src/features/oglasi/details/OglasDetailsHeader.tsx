import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { IOglas } from '../../../app/models/oglas';
import { RootStoreContext } from '../../../app/stores/rootStore';


const oglasImageStyle = {
    filter: 'brightness(30%)'
};

const oglasImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

const renderButton = (user, oglas) => {
    if (user?.userId === oglas.korisnikId)
        return (<Button
            as={Link} to={`/manage/${oglas.id}`} color='teal' floated='right'>Izmeni</Button>);

    return null;
}

const OglasDetailsHeader: React.FC<{ oglas: IOglas }> = ({ oglas }) => {
    const rootStore = useContext(RootStoreContext);
    const { user } = rootStore.userStore;
    const { korisnik, isKreator } = rootStore.korisnikStore;
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={oglas.slike[0] ? oglas.slike[0].url : '/assets/kuca8.jpg'} fluid style={oglasImageStyle} />
                <Segment basic style={oglasImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header size='huge' content={oglas.naslov} style={{ color: 'white' }} />
                                <p>{oglas.dateTime?.toString()}</p>
                                {
                                    isKreator && (

                                        <p>Kreirano od <strong>{korisnik?.displayName ? korisnik?.displayName : 'Korisnik'}</strong> </p>
                                    )
                                }
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {renderButton(user, oglas)}
            </Segment>
        </Segment.Group>
    )
}

export default observer(OglasDetailsHeader);