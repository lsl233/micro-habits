"use client";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
  } from "@/components/ui/select";
import { SelectProps, SelectTriggerProps } from "@radix-ui/react-select";
  
  interface selectProps<T> {
    select?: SelectProps;
    selectTrigger?: SelectTriggerProps;
    data: T[];
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
  }
  
  const HabitSelect = <T extends { id: string; name: string }>(props: selectProps<T>) => {
    return (
      <Select value={props.value} onValueChange={props.onChange}>
        <SelectTrigger {...props.selectTrigger}>
          <SelectValue
            placeholder={<span className="text-gray-500">{props.placeholder}</span>}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {props.data.map((item) => (
              <SelectItem value={item.id} key={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };
  
  export default HabitSelect;
  