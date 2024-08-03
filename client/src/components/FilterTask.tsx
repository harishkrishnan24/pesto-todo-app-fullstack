import { FILTERS } from "@/constants/filters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FilterTaskProps {
  readonly filter: string;
  readonly onFilterChange: (value: string) => void;
}

function FilterTask({ filter, onFilterChange }: FilterTaskProps) {
  return (
    <Select defaultValue={filter} onValueChange={onFilterChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        {FILTERS.map((filter) => (
          <SelectItem key={filter.value} value={filter.value}>
            {filter.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default FilterTask;
