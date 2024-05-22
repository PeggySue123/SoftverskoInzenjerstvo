import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Segment, Item, Header, Grid, Statistic, Divider, Button } from 'semantic-ui-react';
import { Field } from 'react-final-form';
import { IProfile } from '../../app/models/profil';
import { Link } from 'react-router-dom';
import Ocena from './Ocena'
import { RootStoreContext } from '../../app/stores/rootStore';

interface IProps {
    profile: IProfile;
}

const ProfileHeader: React.FC<IProps> = ({ profile }) => {
    const rootStore = useContext(RootStoreContext);
    const { isLoggedIn, user } = rootStore.userStore;
    return (
        <Segment>
            <Grid>
                <Grid.Column width={13}>
                    <Item.Group>
                        <Item>
                            <Item.Image
                                avatar
                                size='small'
                                src={'/assets/user.png'}
                            />
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1'> {profile?.displayName} </Header>
                                <Divider />
                                <Ocena profile={profile} />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Statistic style={{ marginLeft: 30 }} label='Oglasi' value={profile?.oglasi.length} />
                    <Divider />
                    <Item style={{ marginLeft: 10 }}>
                        Username:  {profile?.userName}
                    </Item>
                    <Divider />
                    {
                        isLoggedIn && user ? (
                            <Button floated='right'
                                as={Link} to={'/poruke'}
                                style={{ marginRight: 60 }}>

                                Pošalji poruku
                            </Button>) :
                            (
                                <span>Ulogujte se da biste poslali poruku korisniku!</span>
                            )
                    }
                </Grid.Column>
            </Grid>
        </Segment>
    )
}

export default observer(ProfileHeader);