import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { DatePicker } from "../ui/date-picker";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field";

interface InputDateFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export const InputDateField = <T extends FieldValues>({
  form,
  name,
  label,
  description,
  disabled,
  required,
}: InputDateFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.error}>
            <FieldContent>
              {label && (
                <FieldLabel>
                  {label} {required && "*"}
                </FieldLabel>
              )}
              {description && (
                <FieldDescription>{description}</FieldDescription>
              )}
            </FieldContent>

            <DatePicker
              date={field.value}
              onDateChange={field.onChange}
              disabled={disabled}
            />

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};
