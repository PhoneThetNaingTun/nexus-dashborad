import { InputArea } from "@/components/form/input-area";
import { InputField } from "@/components/form/input-field";
import { MultiSelectField } from "@/components/form/multi-select-field";
import { SwitchField } from "@/components/form/switch-field";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useGetMedicalPackageItemList } from "@/features/medical-package-items/hooks/useGetMedicalPackageItemList";
import { MedicalPackage } from "@/lib/api/types/medical-package";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  medicalPackageSchema,
  MedicalPackageSchema,
} from "../schema/medical-package.schema";

interface MedicalPackageFormProps {
  initialValue?: MedicalPackage;
  disabled?: boolean;
  onSubmit: (data: MedicalPackageSchema) => Promise<void>;
}

export const MedicalPackageForm = ({
  initialValue,
  disabled,
  onSubmit,
}: MedicalPackageFormProps) => {
  const form = useForm<MedicalPackageSchema>({
    resolver: zodResolver(medicalPackageSchema),
    defaultValues: {
      ...initialValue,
      medicalPackageItemIds:
        initialValue?.medicalPackageItems.map((item) => item.id) || [],
    },
  });

  const [page, setPage] = useState(0);

  const { data, hasMore, loading } = useGetMedicalPackageItemList({
    page,
    pageSize: 10,
  });

  const medicalPackageItemOptions = data.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const nonExistingMedicalPackages = initialValue?.medicalPackageItems
    .filter((item) => !data.some((existingItem) => existingItem.id === item.id))
    .map((item) => ({ label: item.name, value: item.id }));
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
        <MultiSelectField
          form={form}
          name="medicalPackageItemIds"
          label="Package Items"
          required
          data={medicalPackageItemOptions}
          hasMore={hasMore}
          loading={loading}
          setPage={setPage}
          nonExistingValue={nonExistingMedicalPackages}
        />
        <InputField
          form={form}
          name="price"
          label="Price"
          type="number"
          required
          disabled={disabled}
        />
        <InputArea
          form={form}
          name="description"
          label="Description"
          disabled={disabled}
        />
        <SwitchField
          form={form}
          name="isActive"
          label="Active"
          description="This action will make package to appear in user app"
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
