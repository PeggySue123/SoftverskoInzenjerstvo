import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Button } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { IProfile } from '../../app/models/profil';

const validate = combineValidators({
    displayName: isRequired('displayName')
});

interface IProps {
    updateProfile: (profile: IProfile) => void;
    profile: IProfile;
}

const ProfileEditForm:React.FC<IProps> = ({updateProfile, profile}) => {
    return (
        <FinalForm
        onSubmit={updateProfile}
        validate={validate}
        initialValues={profile!}
        render={({handleSubmit, invalid, pristine, submitting}) => (
            <Form onSubmit={handleSubmit} error>
                <Field
                name='displayName'
                component={TextInput}
                placeholder='Display name'
                value={profile!.displayName}
                />
                <Field
                name='adresa'
                component={TextInput}
                placeholder='Adresa'
                value={profile!.adresa}
                />
                <Button
                loading={submitting}
                floated='right'
                disabled={invalid || pristine}
                positive
                content='Izmeni profil'
                 />
            </Form>
        )}
        />
    )
}

export default ProfileEditForm