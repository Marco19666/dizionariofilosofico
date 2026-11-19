import { entries as coreEntries, comparativePaths, getEntryBySlug as getCoreEntryBySlug } from "@/data/entries";
import { supplementalEntries } from "@/data/supplemental-entries";
import { terms as coreTerms } from "@/data/terms";
import { supplementalTerms } from "@/data/supplemental-terms";

export const entries = [...coreEntries, ...supplementalEntries];
export const terms = [...coreTerms, ...supplementalTerms];
export { comparativePaths };
export function getEntryBySlug(slug: string) {
  return supplementalEntries.find((entry) => entry.slug === slug) ?? getCoreEntryBySlug(slug);
}
