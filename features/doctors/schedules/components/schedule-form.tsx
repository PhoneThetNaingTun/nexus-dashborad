import { InputTimeField } from "@/components/form/input-time";
import { SelectField } from "@/components/form/select-field";
import { SwitchField } from "@/components/form/switch-field";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Days_OF_WEEK, Schedule } from "@/lib/api/types/schedule";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { scheduleSchema, ScheduleSchema } from "../schema/scheduleSchema";

interface ScheduleFormProps {
  initialValue?: Schedule;
  disabled?: boolean;
  onSubmit: (data: ScheduleSchema) => Promise<void>;
}

export const ScheduleForm = ({
  initialValue,
  disabled,
  onSubmit,
}: ScheduleFormProps) => {
  const form = useForm<ScheduleSchema>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: initialValue,
  });

  const dayOfWeekOptions = Days_OF_WEEK.map((day) => ({
    value: String(day.value),
    label: day.label as string,
  }));

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <SelectField
          label="Day of week"
          name="dayOfWeek"
          options={dayOfWeekOptions}
          form={form}
          disabled={disabled}
        />
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
          <InputTimeField
            label="startTime"
            name="startTime"
            form={form}
            disabled={disabled}
          />
          <InputTimeField
            label="endTime"
            name="endTime"
            form={form}
            disabled={disabled}
          />
        </FieldGroup>
        <SwitchField
          name="isActive"
          label="Is Available"
          description="Turning this on will show in user feed"
          form={form}
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
