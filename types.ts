export type RollColor = 'yellow' | 'black' | 'dice';

export interface RollResult {
  roll: number;
  color: RollColor;
}