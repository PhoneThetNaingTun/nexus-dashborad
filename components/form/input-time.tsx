import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field";
import { TimePicker } from "../ui/time-picker";

interface InputTimeFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
}

export const InputTimeField = <T extends FieldValues>({
  form,
  name,
  label,
  description,
  disabled,
  required,
}: InputTimeFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.error}>
            <FieldContent>
              {label && <FieldLabel>{label}</FieldLabel>}
              {description && (
                <FieldDescription>{description}</FieldDescription>
              )}
            </FieldContent>
            <TimePicker value={field.value} onChange={field.onChange} />

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};
