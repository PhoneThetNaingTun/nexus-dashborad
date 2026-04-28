import { InputArea } from "@/components/form/input-area";
import { InputField } from "@/components/form/input-field";
import { SelectField } from "@/components/form/select-field";
import { SwitchField } from "@/components/form/switch-field";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Medicine, MEDICINE_FORM } from "@/lib/api/types/medicine";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetBrandList } from "../brands/hooks/useGetBrandList";
import { useGetCategoryList } from "../categories/hooks/useGetCategoryList";
import { medicineSchema, MedicineSchema } from "../schema/medicineSchema";

interface MedicineFormProps {
  initialValue?: Medicine;
  disabled?: boolean;
  onSubmit: (data: MedicineSchema) => Promise<void>;
}

export const MedicineForm = ({
  initialValue,
  disabled,
  onSubmit,
}: MedicineFormProps) => {
  const [brandPage, setBrandPage] = useState(0);
  const [categoryPage, setCategoryPage] = useState(0);
  const form = useForm<MedicineSchema>({
    resolver: zodResolver(medicineSchema),
    defaultValues: initialValue,
  });

  const medicineTypeOptions = MEDICINE_FORM.map((type) => ({
    value: type,
    label: type,
  }));

  // Getting Brands

  const {
    data: brands,
    hasMore: brandHasMore,
    loading: brandLoading,
  } = useGetBrandList({ page: brandPage, pageSize: 10 });

  const brandOptions = useMemo(() => {
    return brands.map((brand) => ({
      value: brand.id,
      label: brand.name,
    }));
  }, [brands]);
  const brand = initialValue?.brand
    ? { label: initialValue?.brand.name, value: initialValue?.brand.id }
    : undefined;

  // Getting categories
  const {
    data: categories,
    hasMore: categoryHasMore,
    loading: categoryLoading,
  } = useGetCategoryList({ page: categoryPage, pageSize: 10 });

  const categoryOptions = useMemo(() => {
    return categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));
  }, [categories]);
  const category = initialValue?.category
    ? { label: initialValue?.category.name, value: initialValue?.category.id }
    : undefined;
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldGroup className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <InputField
            form={form}
            name="name"
            placeholder="eg: name for medicine"
            label="Name"
            required
            disabled={disabled}
          />
          <InputField
            form={form}
            name="strength"
            placeholder="eg: Strength (eg: 500mg, 1ml)"
            label="Strength"
            required
            disabled={disabled}
          />
        </FieldGroup>
        <FieldGroup className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SelectField
            form={form}
            name="brandId"
            placeholder="Select Brand"
            label="Brand"
            options={brandOptions}
            hasMore={brandHasMore}
            loading={brandLoading}
            setPage={setBrandPage}
            nonExistingValue={brand}
            disabled={disabled}
          />
          <SelectField
            form={form}
            name="categoryId"
            placeholder="Select Category"
            label="Category"
            options={categoryOptions}
            hasMore={categoryHasMore}
            loading={categoryLoading}
            setPage={setCategoryPage}
            nonExistingValue={category}
            disabled={disabled}
          />
        </FieldGroup>
        <SelectField
          form={form}
          name="form"
          placeholder="Select form"
          label="Medicine Form"
          options={medicineTypeOptions}
          disabled={disabled}
        />
        <SwitchField
          form={form}
          name="requiresPrescription"
          label="Require Prescription"
          description="Turn this on if the medicine require prescription"
          disabled={disabled}
        />
        <InputArea
          form={form}
          name="sideEffects"
          description="Enter side effects if any"
          label="Side Effects"
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
