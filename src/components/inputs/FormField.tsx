import React from "react";
import { Controller } from "react-hook-form";
import Input, { InputProps } from "./Input";

interface FormFieldProps extends Omit<InputProps, "error" | "value" | "onChangeText"> {
  control: any;
  name: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  control,
  name,
  label,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Input
          label={label}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value === undefined || value === null ? "" : String(value)}
          error={error?.message}
          {...props}
        />
      )}
    />
  );
};

export default FormField;
