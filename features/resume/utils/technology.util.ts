import type { TechType, Technology } from '../resume.types';

/**
 * Order mapping for technology types used in sorting.
 */
const technologyTypeOrder: Record<TechType, number> = {
  skill: 0,
  lib: 1,
  tool: 2,
};

/**
 * Sorts technologies by type (skill, lib, tool) and then by featured status and name.
 * Featured technologies appear first within each type.
 * @param technologies - Array of technologies to sort
 * @returns Sorted array of technologies
 */
export const sortTechnologiesByType = (
  technologies: Technology[]
): Technology[] => {
  return [...technologies].sort((a, b) => {
    const typeDiff = technologyTypeOrder[a.type] - technologyTypeOrder[b.type];
    if (typeDiff !== 0) return typeDiff;

    // Featured ones come first within the same type
    if (a.featured === b.featured) {
      return a.name.localeCompare(b.name);
    }
    return a.featured ? -1 : 1;
  });
};
