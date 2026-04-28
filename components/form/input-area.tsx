import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field";
import { Textarea } from "../ui/textarea";

interface InputAreaProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
}

export const InputArea = <T extends FieldValues>({
  form,
  name,
  label,

  description,
  placeholder,
  disabled,
  readOnly,
  required,
}: InputAreaProps<T>) => {
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

            <Textarea
              value={field.value || ""}
              onChange={field.onChange}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
            />

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};
