import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Une clases condicionales conservando la prioridad de Tailwind. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
