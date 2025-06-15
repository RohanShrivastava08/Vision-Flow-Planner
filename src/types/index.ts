
// src/types/index.ts
export interface LifePlan {
  timeframeUsed: string;
  visionStatement: string;
  actionPlan: string[];
  whatToAvoid: string[];
  timeManagementTips: string[];
  toolsToHelp?: string[];
  reflectionPrompts: string[];
  dailyAffirmation: string;
  infographicPrompt: string; 
  // This will be populated by a separate flow on the client-side after the main plan is fetched.
  generatedInfographicUrl?: string; 
}
