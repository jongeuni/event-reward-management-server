export interface RewardConditionStrategy {
  supports(conditionType: string): boolean;
  check(userId: string, condition: any): Promise<boolean>;
}