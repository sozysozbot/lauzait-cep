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
