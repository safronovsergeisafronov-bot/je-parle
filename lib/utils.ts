import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Replaces the space AFTER short Russian prepositions/conjunctions (1-2 chars)
 * with a non-breaking space so the preposition stays with the following word.
 * Prevents "висячие предлоги" (orphaned prepositions at line ends).
 */
export function fixOrphans(text: string): string {
  return text.replace(/ ([а-яА-ЯёЁ]{1,2}) /g, " $1\u00A0")
}
