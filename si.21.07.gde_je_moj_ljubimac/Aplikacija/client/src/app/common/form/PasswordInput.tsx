import React from 'react'
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps } from 'semantic-ui-react';
import { Form, Label } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {

}

const PasswordInput: React.FC<IProps> = ({ input, width, type, placeholder, meta: { touched, error } }) => {
    return (
        <Form.Field error={touched && !!error} type={type} width={width}>
            <input {...input} placeholder={placeholder} type="password" />
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </Form.Field>
    );

}

export default PasswordInput