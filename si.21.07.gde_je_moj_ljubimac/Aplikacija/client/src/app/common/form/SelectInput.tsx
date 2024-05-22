import React from "react";
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps } from 'semantic-ui-react';
import { Form, Label, Select } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {

}

const SelectInput: React.FC<IProps> = ({ input, width, options, placeholder, meta: { touched, error },inputOnChange }) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <Select
                value={input.value}
                onChange={(e, data) =>{ 
                    e.target['value'] = data.value;
                    inputOnChange && inputOnChange(e);
                    input.onChange(data.value);
                }}
                placeholder={placeholder}
                options={options}

             />
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </Form.Field>
    )
}

export default SelectInput