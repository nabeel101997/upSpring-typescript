import React from 'react';
import { ErrorMessage, useField } from 'formik';

type TextFieldProps = {
  type: string
  name: string;
}

export const TextField = ({ ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <input
        {...field} {...props} className={` form-control shadow-none ${meta.touched && meta.error && 'is-invalid mr-20'}`}
      />
      <ErrorMessage name={field.name} />
    </div>
  )
}