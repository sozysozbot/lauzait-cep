import { Card } from "./type.ts";

export function createNewInitialConfig() {
  const ALL_CARDS: Card[] = [];
  let id = 0;
  for (let i = 0; i < 4; i++) {
    ALL_CARDS.push({ suit: "筆", rank: 0, id }); id++;
    ALL_CARDS.push({ suit: "兵", rank: 0, id }); id++;
    ALL_CARDS.push({ suit: "筆", rank: 1, id }); id++;
    ALL_CARDS.push({ suit: "兵", rank: 1, id }); id++;
    ALL_CARDS.push({ suit: "筆", rank: 2, id }); id++;
    ALL_CARDS.push({ suit: "兵", rank: 2, id }); id++;
    ALL_CARDS.push({ suit: "筆", rank: 3, id }); id++;
    ALL_CARDS.push({ suit: "兵", rank: 3, id }); id++;
  }

  for (let i = 0; i < 3; i++) {
    ALL_CARDS.push({ suit: "筆", rank: 4, id }); id++;
    ALL_CARDS.push({ suit: "兵", rank: 4, id }); id++;
    ALL_CARDS.push({ suit: "筆", rank: 5, id }); id++;
    ALL_CARDS.push({ suit: "兵", rank: 5, id }); id++;
    ALL_CARDS.push({ suit: "筆", rank: 6, id }); id++;
    ALL_CARDS.push({ suit: "兵", rank: 6, id }); id++;
    ALL_CARDS.push({ suit: "筆", rank: 7, id }); id++;
    ALL_CARDS.push({ suit: "兵", rank: 7, id }); id++;
  }

  for (let i = 0; i < 2; i++) {
    ALL_CARDS.push({ suit: "筆", rank: 8, id }); id++;
    ALL_CARDS.push({ suit: "兵", rank: 8, id }); id++;
    ALL_CARDS.push({ suit: "筆", rank: 9, id }); id++;
    ALL_CARDS.push({ suit: "兵", rank: 9, id }); id++;
    ALL_CARDS.push({ suit: "筆", rank: 10, id }); id++;
    ALL_CARDS.push({ suit: "兵", rank: 10, id }); id++;
    ALL_CARDS.push({ suit: "筆", rank: 11, id }); id++;
    ALL_CARDS.push({ suit: "兵", rank: 11, id }); id++;
  }

  for (let i = 0; i < 4; i++) {
    ALL_CARDS.push({ suit: "歪", id }); id++;
  }

  // Fisher-Yates
  for (let i = ALL_CARDS.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * i);
    const tmp = ALL_CARDS[j];
    ALL_CARDS[j] = ALL_CARDS[i];
    ALL_CARDS[i] = tmp;
  }

  console.log(ALL_CARDS);

  const BOARD = ALL_CARDS.slice(0, 48);
  const PLAYER_1_HAND = ALL_CARDS.slice(48, 57);
  const PLAYER_2_HAND = ALL_CARDS.slice(57, 66);
  const CONCEALED = ALL_CARDS.slice(66);
  return { BOARD, PLAYER_1_HAND, PLAYER_2_HAND, CONCEALED };
}