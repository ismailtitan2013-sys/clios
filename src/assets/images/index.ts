// Centralized visual assets mapping for historical themes, chapters, personalities, and backgrounds
import heroHandbookImg from './history_handbook_hero_1790505465361.jpg';
import columbusVoyageImg from './columbus_voyage_scene_1790505480067.jpg';
import renaissanceScholarImg from './renaissance_scholar_study_1790505493269.jpg';
import tajMahalImg from './taj_mahal_oriental_grandeur_1790505507385.jpg';
import reformationImg from './reformation_debate_luther_1790585346132.jpg';
import versaillesImg from './french_palace_louis_1790585364416.jpg';
import parliamentImg from './english_parliament_civil_1790585386440.jpg';
import libraryHeroImg from './renaissance_library_hero_1790585399984.jpg';

export const HISTORICAL_IMAGES = {
  hero: heroHandbookImg,
  libraryHero: libraryHeroImg,
  columbusVoyage: columbusVoyageImg,
  renaissanceStudy: renaissanceScholarImg,
  orientalGrandeur: tajMahalImg,
  reformation: reformationImg,
  versailles: versaillesImg,
  parliament: parliamentImg,
};

// Map paragraph IDs or themes to authentic atmospheric imagery
export function getParagraphImage(paragraphId: string | number): string {
  const pStr = String(paragraphId).toLowerCase();

  if (pStr === 'p1' || pStr === '1' || pStr === 'intro') {
    return HISTORICAL_IMAGES.renaissanceStudy;
  }
  if (pStr === 'p2' || pStr === 'p3' || pStr === '2' || pStr === '3' || pStr.includes('географическ') || pStr.includes('колумб')) {
    return HISTORICAL_IMAGES.columbusVoyage;
  }
  if (pStr === 'p4' || pStr === 'p5' || pStr === '4' || pStr === '5' || pStr.includes('гуманизм') || pStr.includes('возрожден')) {
    return HISTORICAL_IMAGES.libraryHero;
  }
  if (pStr === 'p6' || pStr === 'p7' || pStr === '6' || pStr === '7' || pStr.includes('реформац') || pStr.includes('лютер')) {
    return HISTORICAL_IMAGES.reformation;
  }
  if (pStr === 'p10' || pStr === 'p11' || pStr === '10' || pStr === '11' || pStr.includes('абсолютизм') || pStr.includes('версаль') || pStr.includes('франц')) {
    return HISTORICAL_IMAGES.versailles;
  }
  if (pStr === 'p12' || pStr === 'p13' || pStr === '12' || pStr === '13' || pStr.includes('кромвель') || pStr.includes('парламент') || pStr.includes('революц')) {
    return HISTORICAL_IMAGES.parliament;
  }
  if (pStr === 'p19' || pStr === 'p20' || pStr === 'p21' || pStr.includes('восток') || pStr.includes('инди') || pStr.includes('китай') || pStr.includes('могол')) {
    return HISTORICAL_IMAGES.orientalGrandeur;
  }

  // Default atmospheric background
  return HISTORICAL_IMAGES.renaissanceStudy;
}
