import React, { useContext } from 'react';
import { Form, Button, Header } from 'semantic-ui-react';
import { Form as FinalForm, Field} from 'react-final-form';
import TextInput from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage'
import PasswordInput from '../../app/common/form/TextInput';

const validate = combineValidators ({
    email: isRequired('email'),
    password: isRequired('password')
})

const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;
    return (
        <FinalForm 
            onSubmit = { (values: IUserFormValues) => login(values).catch(error => ({
                [FORM_ERROR]: error
            })) }
            validate = {validate}
            render = {({ 
                handleSubmit, 
                submitting, 
                submitError, 
                invalid, 
                pristine,
                dirtySinceLastSubmit
             }) => (
                <Form onSubmit = { handleSubmit } error     >
                    <Header 
                        as = 'h2' 
                        content = 'Prijavi se na Gde je moj ljubimac?'
                        color = 'teal'
                        textAlign = 'center'
                    /> 
                    <Field
                        name = 'email'
                        component = {TextInput}
                        placeholder = 'Email'
                    />
                    
                    <Field
                        name = 'password'
                        component = {PasswordInput}
                        placeholder = 'Password'
                        type = 'password'
                    />

                        { submitError && !dirtySinceLastSubmit && (
                            <ErrorMessage error = {submitError} text = 'Netačan e-mail ili šifra' />
                        )}
                    <Button  
                       
                        loading = {submitting} 
                        color = 'teal'
                        content = 'Prijavi se!'
                        fluid 
                    />
                </Form>
            )}
        />
    );
};

export default LoginForm