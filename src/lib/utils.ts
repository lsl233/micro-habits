import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { EnumLike } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const enumKeys = <T extends object>(value: T) => {
  return Object.keys(value).filter((key) => isNaN(Number(key))) as Array<keyof T>
}
