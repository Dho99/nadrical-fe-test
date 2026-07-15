import { forwardRef } from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface IProps {
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterInput = forwardRef<HTMLInputElement, IProps>(
  ({ onSearchChange }, ref) => {
    return (
      <Field>
        <FieldLabel htmlFor="filter-input">Filter User</FieldLabel>

        <Input
          ref={ref}
          id="filter-input"
          type="text"
          placeholder="Cari nama user..."
          onChange={onSearchChange}
        />

        <FieldDescription>Cari user berdasarkan nama.</FieldDescription>
      </Field>
    );
  },
);

FilterInput.displayName = "FilterInput";

export default FilterInput;
