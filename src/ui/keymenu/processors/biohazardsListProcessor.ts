/**
 * @file Processor for biohazards list data in the keymenu.
 * @description Transforms biohazards data from API into a format suitable for rendering
 * the biohazards list with S.T.A.R.S. rankings.
 */
import { BiohazardData, STARSClassification, STARSRanking } from 'src/data';

export interface ProcessedBiohazardData {
    id: string;
    name: string;
    code: string;
    starsClassification: STARSClassification;
    starsRanking: STARSRanking;
}

/**
 * Processes biohazards data into a format ready for display in the keymenu list.
 * @param biohazardsData - Array of biohazards data from API.
 * @returns Array of processed biohazard data ready for rendering.
 */
export function processBiohazardsList(biohazardsData: BiohazardData[]): ProcessedBiohazardData[] {
    return biohazardsData.map((biohazard) => ({
        id: biohazard.id,
        name: biohazard.name,
        code: biohazard.id, // The code is the ID for base data
        starsClassification: biohazard.starsClassification,
        starsRanking: biohazard.starsRanking,
    }));
}
