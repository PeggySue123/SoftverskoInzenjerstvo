import React, { Fragment, useContext } from 'react';
import { Container, Segment, Header, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm'
//import { observer } from 'mobx-react-lite';

const HomePage = () => {
    const rootStore = useContext(RootStoreContext);
    const { isLoggedIn, user } = rootStore.userStore;
    const { openModal } = rootStore.modalStore;

    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header className='logo'>
                    <Image size='massive' src='/assets/logogdejemojljubimac1.png' alt='logo' style={{ marginBottom: 12 }} />
                </Header>
                {isLoggedIn && user ? (
                    <Fragment>
                        <Header as='h2' inverted content={`Dobrodošli nazad ${user.username}`} />
                        <           Button as={Link} to='/oglasi' size='huge' inverted>
                            Idi na oglase!
                        </Button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Header as='h2' inverted content='Dobrodošli na Gde je moj ljubimac? aplikaciju!' />
                        <Button onClick={() => openModal(<LoginForm />)} size='huge' inverted>
                            Prijavi se
                        </Button>
                        <Button onClick={() => openModal(<RegisterForm />)} size='huge' inverted>
                            Registruj se
                        </Button>
                        <div>
                            <Header as='h3' inverted content='Pregledajte naše oglase' />
                            <Button as={Link} to='/oglasi' size='huge' inverted>
                                Idi na oglase!
                            </Button>
                        </div>
                    </Fragment>
                )}

            </Container>
        </Segment>
    );
};

export default HomePage