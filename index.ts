import { Card } from "./type.ts";
import { createNewInitialConfig } from "./initialize.ts";

const print_card = (c: Card) => {
  if (c.suit === "歪") return "歪";
  const rank = "⓪①②③④⑤⑥⑦⑧⑨⑩⑪"[c.rank];
  return c.suit + rank;
}

const { BOARD, PLAYER_1_HAND, PLAYER_2_HAND, CONCEALED } = createNewInitialConfig();

console.log({
  BOARD: BOARD.map(print_card)
  , PLAYER_1_HAND: PLAYER_1_HAND.map(print_card)
  , PLAYER_2_HAND: PLAYER_2_HAND.map(print_card)
  , CONCEALED: CONCEALED.map(print_card)
});

function next_to(c1: Card, c2: Card) {
  if (c1.suit === "歪" || c2.suit === "歪") {
    return true;
  } else {
    return c1.suit === c2.suit && (c1.rank + 1 === c2.rank || c2.rank + 1 === c1.rank);
  }
}

function is_entirely_stuck(config: { BOARD: Card[], PLAYER_1_HAND: Card[] }) {
  return config.PLAYER_1_HAND.every(hand_card => !config.BOARD.some(board_card => next_to(hand_card, board_card)));
}

console.assert(is_entirely_stuck({ BOARD: [{ suit: "筆", rank: 8, id: 1e42 }], PLAYER_1_HAND: [{ suit: "筆", rank: 8, id: 1e42 }] }))
console.assert(!is_entirely_stuck({ BOARD: [{ suit: "筆", rank: 7, id: 1e42 }], PLAYER_1_HAND: [{ suit: "筆", rank: 8, id: 1e42 }] }))
console.assert(is_entirely_stuck({ BOARD: [{ suit: "筆", rank: 6, id: 1e42 }], PLAYER_1_HAND: [{ suit: "筆", rank: 8, id: 1e42 }] }))
console.assert(!is_entirely_stuck({ BOARD: [{ suit: "筆", rank: 7, id: 1e42 }, { suit: "兵", rank: 7, id: 1e42 }], PLAYER_1_HAND: [{ suit: "筆", rank: 8, id: 1e42 }] }))
console.assert(!is_entirely_stuck({ BOARD: [{ suit: "筆", rank: 7, id: 1e42 }], PLAYER_1_HAND: [{ suit: "筆", rank: 8, id: 1e42 }, { suit: "兵", rank: 8, id: 1e42 }] }))


function calculateProbabilityOfStuck(total: number) {
  let stuck = 0;
  for (let i = 1; i <= total; i++) {
    if (!(i % 100000)) { console.log(`${i}/${total} done.`) }
    if (is_entirely_stuck(createNewInitialConfig())) {
      stuck++;
    }
  }
  console.log(`Estimated probability of getting stuck: ${stuck}/${total} = ${stuck / total}`);
}

// calculateProbabilityOfStuck(1e8);

function runUntilStuckComes() {
  for (let i = 1; ; i++) {
    if (!(i % 1000000)) { console.log(`Running #${i}:`) }
    if (is_entirely_stuck(createNewInitialConfig())) {
      console.log(`Estimated probability of getting stuck: ${1}/${i} = ${1 / i}`);
      return;
    }
  }
}

runUntilStuckComes();