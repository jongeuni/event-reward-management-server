import { EventConditionType } from '../../../event/schema/event.type';

export interface EventConditionStrategy {
  supports(conditionType: EventConditionType): boolean;
  check(userId: string, condition: any): Promise<boolean>;
}