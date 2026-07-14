import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface IProps {
    onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FilterInput({ onSearchChange }: IProps) {
    return (
        <Field>
            <FieldLabel htmlFor="filter-input">Filter User</FieldLabel>
            <Input
                id="filter-input"
                type="text"
                placeholder="Cari nama user..."
                autoFocus
                onChange={onSearchChange}
            />
            <FieldDescription>Cari user berdasarkan nama.</FieldDescription>
        </Field>
    );
}

export default FilterInput;
