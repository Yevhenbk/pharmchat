export function normalizeProperty(property: string) {
  const underscoredProperty = property.replace(/\s+/g, '_').toLowerCase();
  return property.toLowerCase() === underscoredProperty ? property : underscoredProperty;
}