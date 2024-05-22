import React from 'react'
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps } from 'semantic-ui-react';
import { Form, Label } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {

}

const TextAreaInput: React.FC<IProps> = ({input,width, rows, placeholder, meta:{touched, error},inputOnChange}) => {
    return (
        <Form.Field error={touched && !!error}  width={width}>
        <textarea rows={rows} {...input} placeholder={placeholder} onChange={
            (e)=>{
                inputOnChange&&inputOnChange(e);
                input.onChange(e);
            }
        }/>
        {touched && error && (
            <Label basic color='red'>
                {error}
            </Label>
        )}
    </Form.Field>
    );
}

export default TextAreaInput