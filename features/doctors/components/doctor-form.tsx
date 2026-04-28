import { InputArea } from "@/components/form/input-area";
import { InputField } from "@/components/form/input-field";
import { SelectField } from "@/components/form/select-field";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useGetDoctorTypeList } from "@/features/doctor-types/hooks/useGetDoctorTypeList";
import { Doctor } from "@/lib/api/types/doctor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { doctorSchema, DoctorSchema } from "../schema/doctorSchema";

interface DoctorFormProps {
  initialValue?: Doctor;
  disabled?: boolean;
  onSubmit: (data: DoctorSchema) => Promise<void>;
  showPassword?: boolean;
}

export const DoctorForm = ({
  initialValue,
  disabled,
  onSubmit,
  showPassword = true,
}: DoctorFormProps) => {
  const [doctorTypePage, setDoctorTypePage] = useState(0);

  const form = useForm<DoctorSchema>({
    resolver: zodResolver(doctorSchema(showPassword)),
    defaultValues: {
      name: initialValue?.user.name || "",
      email: initialValue?.user.email || "",
      ...initialValue,
    },
  });

  const { data, loading, hasMore } = useGetDoctorTypeList({
    page: doctorTypePage,
    pageSize: 10,
  });

  const doctorTypeOptions = useMemo(() => {
    return data.map((type) => ({
      value: type.id,
      label: type.name,
    }));
  }, [data]);

  const doctorType = initialValue?.type
    ? { label: initialValue.type.name, value: initialValue.type.id }
    : undefined;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            form={form}
            name="name"
            placeholder="eg: doctor name"
            label="Name"
            required
            disabled={disabled}
          />
          <InputField
            form={form}
            name="email"
            type="email"
            placeholder="eg: example@gmail.com"
            label="Email"
            required
            disabled={disabled}
          />
        </FieldGroup>
        {showPassword && (
          <InputField
            form={form}
            name="password"
            type="password"
            placeholder="eg: ********"
            label="Password"
            required
            disabled={disabled}
          />
        )}
        <SelectField
          form={form}
          name="type_id"
          label="Doctor Type"
          options={doctorTypeOptions}
          hasMore={hasMore}
          loading={loading}
          disabled={disabled}
          setPage={setDoctorTypePage}
          nonExistingValue={doctorType}
        />
        <InputField
          form={form}
          name="fee"
          type="number"
          placeholder="10000"
          label="Fee"
          required
          disabled={disabled}
        />
        <InputArea
          form={form}
          name="bio"
          placeholder="Enter doctor bio here"
          label="Bio"
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
