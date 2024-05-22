import React from 'react'
import { Menu, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <Menu className = 'footerbar'>
            <Container className='footer-container'>
                <div style={{ display: 'flex' }}>
                    <Menu.Item style = {{color: 'white'}} >
                        Powered by Vinopije.net
                    </Menu.Item>
                </div>
                <div style={{marginLeft:960}}>
                    <Menu.Item header as={Link} exact to='/' position='right' >
                        <img src='/assets/logogdejemojljubimac1.png' alt='logo'
                            style={{ width: '9.5em' }} />
                    </Menu.Item>
                </div>
            </Container>
        </Menu>

    )
}

export default Footer