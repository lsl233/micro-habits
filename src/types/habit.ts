import { Type, Unit } from "@/lib/enum";

export interface Habit {
    id: string;
    title: string;
    type: Type | undefined;
    count: number | string;
    unit: Unit | undefined
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}