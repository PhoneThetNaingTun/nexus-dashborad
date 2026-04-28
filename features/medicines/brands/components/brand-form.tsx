import { InputField } from "@/components/form/input-field";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Brand } from "@/lib/api/types/brand";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { brandSchema, BrandSchema } from "../schema/brand-schema";

interface BrandFormProps {
  initialValue?: Brand;
  disabled?: boolean;
  onSubmit: (data: BrandSchema) => Promise<void>;
}

export const BrandForm = ({
  initialValue,
  disabled,
  onSubmit,
}: BrandFormProps) => {
  const form = useForm<BrandSchema>({
    resolver: zodResolver(brandSchema),
    defaultValues: initialValue,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <InputField
          form={form}
          name="name"
          description="eg: brand for medicine"
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
