import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfileOglasi from './ProfileOglasi';
import ProfileDescription from './ProfileDescription';

const panes = [
    {menuItem: 'About', render: () => <ProfileDescription />},
    {menuItem: 'Oglasi', render: () => <ProfileOglasi /> }
]

const ProfileContent = () => {
    return(
        <Tab
        menu={{fluid: true, vertical: true}}
        menuPosition='right'
        panes={panes}
         />
    )
}

export default ProfileContent