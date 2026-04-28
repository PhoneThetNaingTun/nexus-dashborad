import { useEffect, useRef } from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "../ui/select";

type Item = {
  label: string;
  value: string;
};

interface SelectFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;

  // data
  options: Item[];

  // infinite scroll
  hasMore?: boolean;
  loading?: boolean;
  setPage?: React.Dispatch<React.SetStateAction<number>>;

  // extra
  includeAll?: boolean;
  includeAllLabel?: string;
  nonExistingValue?: Item;
}

export const SelectField = <T extends FieldValues>({
  form,
  name,
  label,
  description,
  placeholder,
  options,
  disabled,
  includeAll = false,
  includeAllLabel,
  hasMore = false,
  loading = false,
  setPage,
  nonExistingValue,
}: SelectFieldProps<T>) => {
  const isFetchingRef = useRef(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!setPage || isFetchingRef.current || loading || !hasMore) return;

    const target = e.currentTarget;
    const isBottom =
      target.scrollHeight - target.scrollTop <= target.clientHeight + 10;

    if (isBottom) {
      isFetchingRef.current = true;
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!loading) {
      isFetchingRef.current = false;
    }
  }, [loading]);

  const shouldShowNonExisting =
    nonExistingValue &&
    !options.some((o) => o.value === nonExistingValue.value);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.error}>
          <FieldContent>
            {label && <FieldLabel>{label}</FieldLabel>}
            {description && <FieldDescription>{description}</FieldDescription>}
          </FieldContent>

          <Select
            disabled={disabled || loading}
            value={field.value !== undefined ? String(field.value) : ""}
            onValueChange={(e) => {
              const val = e === "all" ? "" : e;

              const numericValue =
                val !== "" && !isNaN(Number(val)) ? Number(val) : val;

              field.onChange(numericValue);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              <SelectViewport
                className="h-60 overflow-y-auto"
                onScroll={handleScroll}
              >
                {/* include all */}
                {includeAll && (
                  <SelectItem value="all">
                    {includeAllLabel || "All"}
                  </SelectItem>
                )}

                {/* non-existing value */}
                {shouldShowNonExisting && (
                  <SelectItem value={nonExistingValue.value}>
                    {nonExistingValue.label}
                  </SelectItem>
                )}

                {/* options */}
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}

                {/* loading */}
                {loading && (
                  <div className="p-2 text-center text-sm text-gray-500">
                    Loading...
                  </div>
                )}

                {/* end */}
                {!hasMore && !loading && options.length > 0 && (
                  <div className="p-2 text-center text-sm text-gray-400">
                    No more items
                  </div>
                )}
              </SelectViewport>
            </SelectContent>
          </Select>

          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
