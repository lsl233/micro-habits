import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { db } from "@/lib/db";

interface HabitSelectProps {
  onValueChange: (value: string) => void;
}

const HabitSelect = async ({ onValueChange }: HabitSelectProps) => {
  const habits = await db.habit.findMany();

  return (
    <Select defaultValue={habits[0]?.id} onValueChange={onValueChange}>
      <SelectTrigger className="w-full md:w-48">
        <SelectValue
          placeholder={<span className="text-gray-500">e.g.选择一个习惯</span>}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {habits.map((item) => (
            <SelectItem value={item.id} key={item.id}>
              {item.action}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default HabitSelect;
