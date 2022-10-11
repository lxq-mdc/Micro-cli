export interface errorNameResult {
  validForNewPackages: boolean;
  validForOldPackages: boolean;
  errors?: string[];
  warnings?: string[];
}

export type correctNameResult = Omit<errorNameResult, 'errors' | 'warnings'>;

export interface PromptType {
  name: string;
  type: string;
  value?: string;
  description?: string;
  message: string;
  choices?: Array<any>;
  pageSize?: number;
}
export type featureType = Omit<
  PromptType,
  'type' | 'message' | 'pageSize' | 'choices'
>;
