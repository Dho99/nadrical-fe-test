import { forwardRef } from "react";
import { Search } from "lucide-react";

import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface IProps {
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterInput = forwardRef<HTMLInputElement, IProps>(
  ({ onSearchChange }, ref) => {
    return (
      <Field>
        <div className="flex items-center rounded-xl border border-[#27272A] bg-[#09090B] px-3 transition-all duration-300 focus-within:border-[#22D3EE] focus-within:shadow-[0_0_18px_rgba(34,211,238,.20)]">
          <Search className="mr-2 h-4 w-4 shrink-0 text-[#71717A]" />
          <Input
            ref={ref}
            id="filter-input"
            type="text"
            placeholder="Search users..."
            onChange={onSearchChange}
            className="h-11 border-0 bg-transparent px-0 text-[#FAFAFA] placeholder:text-[#71717A] shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
          />
        </div>
      </Field>
    );
  },
);

FilterInput.displayName = "FilterInput";

export default FilterInput;
