export interface Sport {
  id: number;
  name: string;
  name_vi: string;
  category: string;
  category_vi: string;
  format: string;
  format_vi: string;
  description: string;
  description_vi: string;
  rules: string;
  rules_vi: string;
  location?: string;
  location_vi?: string;
  note?: string;
  icon: string;
}

export interface Athlete {
  id: string;
  name: string;
  country: string; // Representing teams/countries
  sportId: number;
  image?: string;
}

export interface Match {
  id: string;
  sportId: number;
  teamA: string;
  teamB: string;
  scoreA?: number | string;
  scoreB?: number | string;
  status: "upcoming" | "live" | "finished";
  timestamp: string;
  stage: string;
}

export interface CountryMedal {
  country: string;
  gold: number;
  silver: number;
  bronze: number;
}
