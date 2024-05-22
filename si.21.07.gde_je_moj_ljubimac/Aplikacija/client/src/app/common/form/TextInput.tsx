import React from 'react'
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps } from 'semantic-ui-react';
import { Form, Label } from 'semantic-ui-react'

interface IProps 
    extends FieldRenderProps<string, HTMLInputElement>, 
    FormFieldProps {}

const TextInput: React.FC<IProps> = ({ 
    input, 
    width, 
    type, 
    placeholder, 
    meta: { touched, error },
    inputOnChange 
}) => {
    return (
        <Form.Field error={touched && !!error} type={type} width={width}>
            <input {...input} placeholder={placeholder} onChange={
                (e)=>{
                    //console.log(e);
                    inputOnChange &&inputOnChange (e);
                    input.onChange(e);
                }
            } />
            {touched && error && (
                <Label basic color="red">
                    {error}
                </Label>
            )}
        </Form.Field>
    );

};

export default TextInput;