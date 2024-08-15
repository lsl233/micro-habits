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
