import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Container, Menu, Button, Dropdown, Image } from 'semantic-ui-react'
import { Link, NavLink } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';


const NavBar: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { user, logout } = rootStore.userStore;
    const {korisnik} = rootStore.korisnikStore;

    return (
        <Menu fixed='top' inverted>
            <Container className='navbar-container'>
                <div style={{ display: 'flex' }}>
                    <Menu.Item header as={NavLink} exact to='/'>
                        <img src='/assets/kuca8.jpg' alt='logo' style={{ marginRight: 10 }} />
                        Početna
                    </Menu.Item>
                    <Menu.Item header as={NavLink} to='/korisnici'>
                        Korisnici
                    </Menu.Item>
                    <Menu.Item header as={NavLink} to='/oglasi'>
                        Oglasi
                    </Menu.Item>
                </div>
                <div className='navbar-desno' style={{ display: 'flex' }}>
                    {user &&
                        <Menu.Item header>
                            <Button as={NavLink} to='/kreirajOglas' className='dugmekreiraj' content='Kreiraj oglas' />
                        </Menu.Item>}
                    {user &&
                        <Menu.Item position='right'>
                            <Image avatar spaced='right' src={user.image || '/assets/user1.png'} />
                            <Dropdown pointing='top left' text={user.displayName}>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        as={Link}
                                        to={`/korisnici/${user.userId}`}
                                        text='Moj profil'
                                        icon='user'
                                    />
                                    <Dropdown.Item
                                        onClick={logout}
                                        text='Odjavi se'
                                        icon='power' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>}
                    <Menu.Item header as={Link} exact to='/'>
                        <img src='/assets/logogdejemojljubimac1.png' alt='logo'
                            style={{ width: '9.5em' }} />
                    </Menu.Item>
                </div>
            </Container>
        </Menu>
    )
}

export default observer(NavBar);