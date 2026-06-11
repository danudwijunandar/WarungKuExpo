import React from "react";
import { Controller } from "react-hook-form";
import Input, { InputProps } from "./Input";
import { formatPrice, unformatPrice } from "@/utils/priceFormatter";

interface FormFieldWithPriceProps extends Omit<InputProps, "error" | "value" | "onChangeText"> {
  control: any;
  name: string;
}

//
// Price input field with auto-formatting: 20000 → "20.000"
// Stores unformatted number value in form state, displays formatted string in UI
//
export const FormFieldWithPrice: React.FC<FormFieldWithPriceProps> = ({
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
          onChangeText={(text) => {
            // Store unformatted value to form state
            const unformatted = unformatPrice(text);
            onChange(unformatted);
          }}
          // Display formatted value with thousand separator
          value={formatPrice(value === undefined || value === null ? "" : value)}
          error={error?.message}
          keyboardType="numeric"
          {...props}
        />
      )}
    />
  );
};

export default FormFieldWithPrice;
