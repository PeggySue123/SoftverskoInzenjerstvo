import React from 'react'
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps } from 'semantic-ui-react';
import { Form, Label } from 'semantic-ui-react';

interface IProps extends FieldRenderProps<boolean, HTMLElement>, FormFieldProps {
}

/*var str2bool = (value) => {
    if (value && typeof value === "string") {
        if (value.toLowerCase() === "true") return true;
        if (value.toLowerCase() === "false") return false;
    }
    return value;
}*/

const RadioInput: React.FC<IProps> = ({meta: { touched, error }, name, input }) => {
    return (
        <Form.Field error={touched && !!error} style={{display:'flex',alignItems:'center'}}>
            <input type="radio"  name={name}  value="true" onChange={input.onChange} />
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
            <Label>{input.name}</Label>
        </Form.Field>
    );

}

export default RadioInput