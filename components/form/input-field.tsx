import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

interface InputFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  type?: "text" | "email" | "password" | "number";
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
}

export const InputField = <T extends FieldValues>({
  form,
  name,
  label,
  type = "text",
  description,
  placeholder,
  disabled,
  readOnly,
  required,
}: InputFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
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

            {type === "password" ? (
              <InputGroup>
                <InputGroupInput
                  value={field.value || ""}
                  onChange={field.onChange}
                  placeholder={placeholder}
                  type={showPassword ? "text" : "password"}
                  disabled={disabled}
                  readOnly={readOnly}
                  required={required}
                />
                <InputGroupAddon align={"inline-end"}>
                  <Button
                    onClick={() => setShowPassword((prev) => !prev)}
                    variant={"ghost"}
                    size={"icon-sm"}
                    type="button"
                  >
                    {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            ) : (
              <Input
                value={field.value || ""}
                onChange={(e) => {
                  if (type === "number") {
                    field.onChange(parseInt(e.target.value));
                    return;
                  }
                  field.onChange(e.target.value);
                }}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
              />
            )}

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};
