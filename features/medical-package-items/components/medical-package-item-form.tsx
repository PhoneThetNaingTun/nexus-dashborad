import { InputField } from "@/components/form/input-field";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { MedicalPackageItem } from "@/lib/api/types/medical-package-item";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  medicalPackageItemSchema,
  MedicalPackageItemSchema,
} from "../schema/medical-package-item.schema";

interface MedicalPackageItemFormProps {
  initialValue?: MedicalPackageItem;
  disabled?: boolean;
  onSubmit: (data: MedicalPackageItemSchema) => Promise<void>;
}

export const MedicalPackageItemForm = ({
  initialValue,
  disabled,
  onSubmit,
}: MedicalPackageItemFormProps) => {
  const form = useForm<MedicalPackageItemSchema>({
    resolver: zodResolver(medicalPackageItemSchema),
    defaultValues: initialValue,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <InputField
          form={form}
          name="name"
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
