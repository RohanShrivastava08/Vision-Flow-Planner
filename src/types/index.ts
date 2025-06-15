// src/types/index.ts
export interface LifePlan {
  threeMonthVision: string;
  whatToDoDaily: string[];
  whatToAvoid: string[];
  timeManagementTips: string[];
  toolsToHelp?: string[]; // Optional as per prompt
  weeklyReflectionQuestions: string[];
  dailyAffirmation: string;
}
