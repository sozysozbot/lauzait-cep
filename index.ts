import { Card } from "./type.ts";
import { createNewInitialConfig } from "./initialize.ts";
import { calculateStuckProbability } from "./calculate_stuck_probability.ts";
import { isHule } from "./three_groups.ts";

const print_card = (c: Card) => {
  if (c.suit === "歪") return "歪";
  const rank = "⓪①②③④⑤⑥⑦⑧⑨⑩⑪"[c.rank];
  return c.suit + rank;
}

/*const { BOARD, PLAYER_1_HAND, PLAYER_2_HAND, CONCEALED } = createNewInitialConfig();

console.log({
  BOARD: BOARD.map(print_card)
  , PLAYER_1_HAND: PLAYER_1_HAND.map(print_card)
  , PLAYER_2_HAND: PLAYER_2_HAND.map(print_card)
  , CONCEALED: CONCEALED.map(print_card)
});*/

// console.log(calculateStuckProbability(1e9));

function calculateTianhuProbabilityForSingleSample(): number {
  const { PLAYER_1_HAND } = createNewInitialConfig();
  if (isHule(PLAYER_1_HAND)) { 
    // console.log(PLAYER_1_HAND);
    return 1; } return 0;
}

function calculateTianhuProbability(total: number): number {
  let stuck = 0;
  for (let i = 1; i <= total; i++) {
    if (!(i % 100000)) {
      console.log(`${i}\t/${total} done. Current estimate:\t${stuck / i}`)
    }
    stuck += calculateTianhuProbabilityForSingleSample();
  }
  return stuck / total;
}

console.log(calculateTianhuProbability(3e8));
