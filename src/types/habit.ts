export interface Habit {
    id: string;
    title: string;
    type: string | undefined;
    count: number | undefined;
    unit: string | undefined
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}