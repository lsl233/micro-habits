import { useEffect, useState } from 'react';
import { Habit } from '../types/habit'; // Assuming Habit is defined in this file

export class Storage {
    static get<T>(key: string) {
        return JSON.parse(localStorage.getItem(key) || '[]') as T;
    }
    static set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    static setItem<T>(key: string, callback: (data: T) => boolean) {
        const data = Storage.get(key)
        if (Array.isArray(data)) {
            for (const item of data) {
                if (callback(item)) break;
            }
        }
        Storage.set(key, data);
    }
    static append<T>(key: string, value: T) {
        let data = Storage.get<T>(key);
        if (!data) {
            data = Array.isArray(value) ? [] as T : {} as T; 
        }
        if (Array.isArray(data)) {
            data.push(value);
        } else {
            data = { ...data, ...value };
        }
        Storage.set(key, data);
    }
    static has(key: string) {
        return localStorage.getItem(key) !== null;
    }
    static remove(key: string) {
        localStorage.removeItem(key);
    }
    static getHabits(): Habit[] {
        return Storage.get<Habit[]>('habits');
    }
}

export const useStorage = <T>(key: string, initValue: T): [T, React.Dispatch<React.SetStateAction<T>>, (value: any) => void] => {
    const [data, setData] = useState<T>(initValue);

    useEffect(() => {
        const storedData = Storage.get<T>(key);
        setData(storedData);
    }, [key]);

    useEffect(() => {
        Storage.set(key, data);
    }, [data, key]);

    const updateData = (value: any) => {
        if (Array.isArray(data)) {
            setData([...data, ...value] as T)
        } else if(typeof data === 'object' && typeof value === 'object') {
            setData({ ...data, ...value } as T);
        } else {
            setData(value as T);
        }
    }

    return [data, setData, updateData];
}


export const useHabits: () => [Habit[], (habit: Habit) => void, (id: string, habit: Partial<Habit>) => void] = () => {
    const [habits, _setHabits] = useState<Habit[]>([]);

    useEffect(() => {
        const storedHabits = Storage.get<Habit[]>('habits');
        if (storedHabits) {
            _setHabits(storedHabits);
        }
    }, []);
    
    const setHabits = (habit: Habit) => {
        for (const h of habits) {
            if (h.id === habit.id) {
                Object.assign(h, habit);
                _setHabits([...habits]);
                Storage.set('habits', habits);
                return
            }
        }
        habits.push(habit);
        _setHabits([...habits]);
        Storage.set('habits', habits);
    }

    const updateHabit = (id: string, habit: Partial<Habit>) => {
        for (const h of habits) {
            if (h.id === id) {
                Object.assign(h, habit);
                _setHabits([...habits]);
                Storage.set('habits', habits);
                return
            }
        }
    }
    return [habits, setHabits, updateHabit];
}
