import React, { useContext, useEffect } from 'react';
import {Grid} from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent'
import { RootStoreContext } from '../../app/stores/rootStore';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';

interface RouteParams {
    id: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}

const ProfilePage: React.FC<IProps> = ({match}) => {
    const rootStore = useContext(RootStoreContext);
    const {loadingProfile, profile, loadProfile} = rootStore.profileStore;

    useEffect(() => {
        loadProfile(match.params.id)
    }, [loadProfile, match])

    if(loadingProfile) return <LoadingComponent content='Učitavanje profila ...' />

    return (
        <Grid className = 'korisnikopis'>
            <Grid.Column width={16}>
                <ProfileHeader profile={profile!} />
                <ProfileContent />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ProfilePage); 