/**
 * @file Processor for S.T.A.R.S. rankings data in the keymenu.
 * @description Transforms S.T.A.R.S. rankings data from API into a format suitable
 * for rendering the rankings dropdown.
 */
import { STARSRankingData } from 'src/data';

export interface ProcessedRankingData {
    starsClassification: string;
    greeksClassification: string; // Greek letter (e.g., 'η', 'α')
    ranking: string; // '0', '0Half', '1', '1Half', '2', '2Half', '3'
    threatLevel: string;
    directive: string;
    biohazardCodes: readonly string[];
    rankingLowerCase: string; // lowercase version for CSS class
}

/**
 * Processes S.T.A.R.S. rankings data into a format ready for display in the keymenu dropdown.
 * Sorts rankings from lowest threat (Eta) to highest (Alpha) to match display order.
 * @param rankingsData - Array of S.T.A.R.S. rankings data from API.
 * @returns Array of processed ranking data ready for rendering, sorted by threat level (Eta to Alpha).
 */
export function processRankings(rankingsData: STARSRankingData[]): ProcessedRankingData[] {
    // Map rankings with their numeric order (Eta = 0, Zeta = 1, ..., Alpha = 6)
    const rankingOrder: Record<string, number> = {
        Eta: 0,
        Zeta: 1,
        Epsilon: 2,
        Delta: 3,
        Gamma: 4,
        Beta: 5,
        Alpha: 6,
    };

    return rankingsData
        .map((ranking) => ({
            starsClassification: ranking.starsClassification,
            greeksClassification: ranking.greeksClassification || '',
            ranking: ranking.ranking,
            threatLevel: ranking.threatLevel,
            directive: ranking.directive,
            biohazardCodes: ranking.biohazardCodes,
            rankingLowerCase: ranking.starsClassification.toLowerCase(),
        }))
        .sort((a, b) => {
            const orderA = rankingOrder[a.starsClassification] ?? 999;
            const orderB = rankingOrder[b.starsClassification] ?? 999;
            return orderA - orderB;
        });
}
