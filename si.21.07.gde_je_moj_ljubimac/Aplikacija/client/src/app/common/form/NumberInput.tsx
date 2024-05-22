import React from 'react'
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps } from 'semantic-ui-react';
import { Form, Label } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<number, HTMLElement>, FormFieldProps {

}

const NumberInput: React.FC<IProps> = ({ input, width, type, placeholder, meta: { touched, error },inputOnChange }) => {
    return (
        <Form.Field error={touched && !!error} type={type} width={width}>
            <input {...input} value={input.value} onBlur={input.onBlur} onChange={(e)=>{
                inputOnChange&&inputOnChange(e);
                input.onChange(e);
            }} placeholder={placeholder} type="number" pattern="[0-9*]" />
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </Form.Field>
    );

}

export default NumberInput