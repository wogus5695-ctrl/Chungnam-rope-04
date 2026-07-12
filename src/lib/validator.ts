import { getFlatRegions, validateRegionsData } from "@/lib/keyword";
import { services } from "@/data/services";

export function runValidation() {
  const regionsVal = validateRegionsData();
  const flatRegions = getFlatRegions();
  
  const results = {
    regionsValid: regionsVal.isValid,
    regionsErrors: regionsVal.errors,
    flatRegionCount: flatRegions.length,
    servicesCount: services.length,
    canonicalCombinationsCount: flatRegions.length * services.length,
    details: flatRegions.map(r => ({
      name: r.name,
      fullName: r.fullName,
      aliases: r.aliases
    }))
  };

  return results;
}
