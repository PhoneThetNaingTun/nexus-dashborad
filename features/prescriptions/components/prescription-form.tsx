import { InputArea } from "@/components/form/input-area";
import { InputField } from "@/components/form/input-field";
import { SelectField } from "@/components/form/select-field";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useGetMedicineList } from "@/features/medicines/hooks/useGetMedicineList";
import { Prescription } from "@/lib/api/types/prescription";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  prescriptionSchema,
  PrescriptionSchema,
} from "../schema/prescription.schema";

interface PrescriptionFormProps {
  initialValue?: Prescription;
  disabled?: boolean;
  onSubmit: (data: PrescriptionSchema) => Promise<void>;
}

export const PrescriptionForm = ({
  initialValue,
  disabled,
  onSubmit,
}: PrescriptionFormProps) => {
  const [page, setPage] = useState(0);

  const form = useForm<PrescriptionSchema>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: initialValue,
  });
  const { data, hasMore, loading } = useGetMedicineList({ page, pageSize: 10 });

  const medicineOption = useMemo(() => {
    return data.map((medicine) => ({
      value: medicine.id,
      label: `${medicine.name} - ${medicine.strength}`,
    }));
  }, [data]);
  const medicine = initialValue?.medicine
    ? { label: initialValue?.medicine.name, value: initialValue?.medicine.id }
    : undefined;
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <SelectField
          form={form}
          name="medicineId"
          placeholder="Select medicine"
          label="Medicine"
          options={medicineOption}
          hasMore={hasMore}
          loading={loading}
          setPage={setPage}
          nonExistingValue={medicine}
          disabled={disabled}
        />
        <FieldGroup className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <InputField
            form={form}
            name="frequency"
            placeholder="3 times a day"
            label="Frequency"
            required
            disabled={disabled}
          />
          <InputField
            form={form}
            name="duration"
            placeholder="3 months"
            label="Duration"
            required
            disabled={disabled}
          />
          <InputField
            form={form}
            name="totalQuantity"
            placeholder="0"
            type="number"
            label="Total Quantity"
            required
            disabled={disabled}
          />
        </FieldGroup>
        <InputArea
          form={form}
          name="dosage"
          placeholder="Prescription Dosage"
          label="Dosage"
          required
          disabled={disabled}
        />
        <InputArea
          form={form}
          name="instructions"
          description="Prescription Instructions"
          label="Instructions"
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
