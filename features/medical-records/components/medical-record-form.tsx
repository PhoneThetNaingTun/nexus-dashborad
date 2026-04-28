import { InputArea } from "@/components/form/input-area";
import { InputDateField } from "@/components/form/input-date";
import { InputField } from "@/components/form/input-field";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { MedicalRecord } from "@/lib/api/types/medical-record";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  medicalRecordSchema,
  MedicalRecordSchema,
} from "../schema/medical-records.schema";

interface MedicalRecordFormProps {
  initialValue?: MedicalRecord;
  disabled?: boolean;
  onSubmit: (data: MedicalRecordSchema) => Promise<void>;
}

export const MedicalRecordForm = ({
  initialValue,
  disabled,
  onSubmit,
}: MedicalRecordFormProps) => {
  const form = useForm<MedicalRecordSchema>({
    resolver: zodResolver(medicalRecordSchema),
    defaultValues: initialValue,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldGroup className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <InputField
            form={form}
            name="weight"
            description="Must be in kg"
            label="Weight"
            type="number"
            disabled={disabled}
          />
          <InputField
            form={form}
            name="bloodPressure"
            description="Must be in mmHg"
            label="Blood Pressure"
            disabled={disabled}
          />
        </FieldGroup>
        <InputDateField
          form={form}
          name="followUpDate"
          label="Follow Up Date"
          disabled={disabled}
        />
        <InputArea
          form={form}
          name="diagnosis"
          placeholder="diagnosis for patient"
          label="Diagnosis"
          required
          disabled={disabled}
        />
        <InputArea
          form={form}
          name="symptoms"
          placeholder="symptoms for patient"
          label="Symptoms"
          required
          disabled={disabled}
        />
        <InputArea
          form={form}
          name="advice"
          placeholder="advice for patient"
          label="Advice"
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
