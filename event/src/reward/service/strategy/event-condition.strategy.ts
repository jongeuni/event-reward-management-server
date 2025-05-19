import { EventConditionType } from '../../../event/schema/event.type';
import { EventCondition } from '../../../event/schema/event-condition';

export interface EventConditionStrategy {
  supports(conditionType: EventConditionType): boolean;
  check(
    userId: string,
    condition: EventCondition,
    eventStartedDate: Date,
    eventEndedDate?: Date,
  ): Promise<boolean>;
}