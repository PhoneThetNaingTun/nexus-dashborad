import { InputField } from "@/components/form/input-field";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { DoctorType } from "@/lib/api/types/doctor-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  doctorTypeSchema,
  DoctorTypeSchema,
} from "../schema/doctor-type.schema";

interface DoctorTypeFormProps {
  initialValue?: DoctorType;
  disabled?: boolean;
  onSubmit: (data: DoctorTypeSchema) => Promise<void>;
}

export const DoctorTypeForm = ({
  initialValue,
  disabled,
  onSubmit,
}: DoctorTypeFormProps) => {
  const form = useForm<DoctorTypeSchema>({
    resolver: zodResolver(doctorTypeSchema),
    defaultValues: initialValue,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <InputField
          form={form}
          name="name"
          description="Name for doctor-type. Eg: Heart, etc..."
          label="Name"
          required
          disabled={disabled}
        />
        <Field>
          <Button disabled={disabled} type="submit">
            {disabled ? <Spinner /> : "Submit"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
