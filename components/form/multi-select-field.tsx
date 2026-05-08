import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { useEffect, useRef } from "react";
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";

interface MultiSelectFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  data: Array<{ label: string; value: string }>;

  // infinite scroll
  hasMore?: boolean;
  loading?: boolean;
  setPage?: React.Dispatch<React.SetStateAction<number>>;

  // extra
  nonExistingValue?: Array<{ label: string; value: string }>;
}

export const MultiSelectField = <T extends FieldValues>({
  form,
  name,
  label,
  description,
  disabled,
  required,
  data,
  setPage,
  loading,
  hasMore,
  nonExistingValue,
}: MultiSelectFieldProps<T>) => {
  const anchor = useComboboxAnchor();
  const isFetchingRef = useRef(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!setPage || isFetchingRef.current || loading || !hasMore) return;

    const target = e.currentTarget;
    const isBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 20;

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

  const allItems = [...data, ...(nonExistingValue || [])];
  return (
    <Controller
      name={name}
      control={form.control}
      defaultValue={[] as PathValue<T, typeof name>}
      render={({ field, fieldState }) => {
        return (
          <div>
            {label && (
              <label>
                {label} {required && "*"}
              </label>
            )}

            {description && <p>{description}</p>}

            <Combobox
              multiple
              items={allItems}
              value={allItems.filter((item) =>
                field.value.includes(item.value),
              )}
              onValueChange={(items) => {
                const ids = items.map((item: { value: string }) => item.value);
                field.onChange(ids);
              }}
            >
              <ComboboxChips ref={anchor} className="w-full">
                <ComboboxValue>
                  {(values) => (
                    <>
                      {values.map((item: any) => (
                        <ComboboxChip key={item.value}>
                          {item.label}
                        </ComboboxChip>
                      ))}
                      <ComboboxChipsInput />
                    </>
                  )}
                </ComboboxValue>
              </ComboboxChips>

              <ComboboxContent anchor={anchor} className="shadow-2xl border">
                <ComboboxEmpty>No items found.</ComboboxEmpty>

                <ComboboxList onScroll={handleScroll}>
                  {(item: { label: string; value: string }) => {
                    const isSelected = field.value.includes(item.value);

                    return (
                      <ComboboxItem
                        key={item.value}
                        value={item}
                        disabled={isSelected}
                      >
                        {item.label}
                      </ComboboxItem>
                    );
                  }}
                </ComboboxList>
                {loading && <div className="p-2 text-sm">Loading...</div>}
              </ComboboxContent>
            </Combobox>

            {fieldState.error && (
              <p className="text-red-500 text-sm">{fieldState.error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};
