export interface MetricCard {
  title: string;
  value: string;
  trend: string;
  accent: string;
}

export interface ChatMessage {
  id: number;
  role: 'assistant' | 'user';
  content: string;
}

export interface StadiumData {
  name: string;
  city: string;
  capacity: string;
  liveCrowd: string;
  queueTime: string;
  incidents: string;
  match: string;
  kickoff: string;
  gate: string;
  food: string;
  restroom: string;
  accessibilityRoute: string;
  shuttle: string;
  parking: string;
  transit: string;
}
