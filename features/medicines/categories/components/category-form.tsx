import { InputField } from "@/components/form/input-field";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Category } from "@/lib/api/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { categorySchema, CategorySchema } from "../schema/category-schema";

interface CategoryFormProps {
  initialValue?: Category;
  disabled?: boolean;
  onSubmit: (data: CategorySchema) => Promise<void>;
}

export const CategoryForm = ({
  initialValue,
  disabled,
  onSubmit,
}: CategoryFormProps) => {
  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialValue,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <InputField
          form={form}
          name="name"
          description="category for medicine"
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
