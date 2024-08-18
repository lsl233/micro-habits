import { Type, Unit } from "@/lib/enum";

export interface Habit {
    id: string;
    title: string;
    type: Type | undefined;
    amount: number | string;
    unit: Unit | undefined
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Record {
    id: string;
    habitId: string;
    amount: number | string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}