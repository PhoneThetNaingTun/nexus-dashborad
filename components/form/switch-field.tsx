import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field";
import { Switch } from "../ui/switch";

interface SwitchFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
}

export const SwitchField = <T extends FieldValues>({
  form,
  name,
  label,
  description,
  disabled,
  required,
}: SwitchFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.error}>
            <FieldContent>
              <div className="flex items-center gap-3">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={disabled}
                  required={required}
                />
                {label && (
                  <FieldLabel>
                    {label} {required && "*"}
                  </FieldLabel>
                )}
              </div>
              {description && (
                <FieldDescription>{description}</FieldDescription>
              )}
            </FieldContent>
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};
