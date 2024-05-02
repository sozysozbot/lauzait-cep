import { next_to } from "./index.ts";
import { createNewInitialConfig } from "./initialize.ts";

/**
 * Calculates the probability of choosing `draw` cards from `all` cards without choosing any of the `avoid` cards.
 * 
 * @param o - An object containing the number of all cards, the number of cards to draw, and the number of cards to avoid.
 * @returns The probability of avoiding the specified cards.
 */
function probabilityOfAvoiding(o: { all: number, draw: number, avoid: number }): number {
  if (o.draw + o.avoid > o.all) { return 0; }
  let result = 1;
  for (let i = 0; i < o.draw; i++) {
    result *= (o.all - i - o.avoid) / (o.all - i);
  }
  return result;
}

/**
 * Calculates the stuck probability for a single sample.
 * 
 * @returns The stuck probability for a single sample.
 */
export function calculateStuckProbabilityForSingleSample(): number {
  const { BOARD, PLAYER_1_HAND, PLAYER_2_HAND, CONCEALED } = createNewInitialConfig();
  if (PLAYER_1_HAND.filter(c => c.suit === "歪").length !== 0) { return 0; }

  const remaining = BOARD.concat(PLAYER_2_HAND).concat(CONCEALED);

  const nonstuck_cards = remaining.filter(
    rem_c => PLAYER_1_HAND.some(hand_c => next_to(rem_c, hand_c))
  );

  return probabilityOfAvoiding({ all: remaining.length, draw: 48, avoid: nonstuck_cards.length });
}

/**
 * Calculates the stuck probability for multiple samples.
 * 
 * @param total - The number of samples to calculate.
 * @returns The stuck probability for multiple samples.
 */
export function calculateStuckProbability(total: number): number {
  let stuck = 0;
  for (let i = 1; i <= total; i++) {
    if (!(i % 100000)) { console.log(`${i}/${total} done.`) }
    stuck += calculateStuckProbabilityForSingleSample();
  }
  return stuck / total;
}