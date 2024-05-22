import React, {useContext, useState} from 'react';
import {RootStoreContext} from '../../app/stores/rootStore';
import { Segment ,Grid, Header, Button, Item, Icon } from 'semantic-ui-react';
import ProfileEditForm from './ProfileEditForm';
import { observer } from 'mobx-react-lite';



const ProfileDescription = () => {
    const rootStore = useContext(RootStoreContext);
    const {
        updateProfile,
        profile,
        isCurrentUser
    } = rootStore.profileStore;
    const [editMode, setEditMode] = useState(false);
    return(
        <Segment>
            <Grid>
                <Grid.Column width={16}>
                    <Header 
                    floated='left'
                    icon = 'user'
                    content={`Više o ${profile?.userName}`} 
                    />
                    {isCurrentUser && (
                        <Button
                        floated='right'
                        basic
                        content={editMode? 'Otkaži' : 'Izmeni profil'}
                        onClick={() => setEditMode(!editMode)}
                         />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                        {editMode ? (
                            <ProfileEditForm
                            updateProfile = {updateProfile}
                            profile = {profile}
                            />
                        ) : (
                            <Item.Group>
                                <Item>
                                <Icon name='marker' size='large'  />
                                <span>{profile?.adresa}</span>
                                </Item>
                                <Item>
                                <Icon name='mail' size='large'  />
                                <span>  {profile?.email}</span>
                                </Item>
                            </Item.Group>   
                        )}
                </Grid.Column>
            </Grid>

        </Segment>
            
    );
}

export default observer(ProfileDescription); 