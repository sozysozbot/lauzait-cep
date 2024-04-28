import { Card } from "./type";

export function isMianzi(c1: Card, c2: Card, c3: Card) {
  if (c1.suit === "歪" || c2.suit === "歪" || c3.suit === "歪") {
    // 歪 is a wildcard can behave as any single card
    // Thus, we need to check that 歪 can turn into some card and then the 面子 can be composed.

    if (c1.suit === "歪") {
      if (c2.suit === "歪" || c3.suit === "歪") {
        // When there are two or more wild cards, the two wildcards can always accomodate the last card
        return true;
      } else if (c2.suit === c3.suit) {
        return c2.rank === c3.rank;
      } else {
        return c2.rank === c3.rank || c2.rank + 1 === c3.rank || c2.rank + 2 === c3.rank
          || c2.rank - 1 === c3.rank || c2.rank - 2 === c3.rank;
        ;
      }
    } else if (c2.suit === "歪") { return isMianzi(c2, c1, c3); }
    else { return isMianzi(c3, c1, c2); }
  } else if (c1.suit === c2.suit && c2.suit === c3.suit) {
    const ranks = [c1.rank, c2.rank, c3.rank];
    ranks.sort((a, b) => a - b);
    return (ranks[0] + 1 === ranks[1] && ranks[1] + 1 === ranks[2])
      || (ranks[0] === ranks[1] && ranks[1] === ranks[2])
      ;
  } else {
    return false;
  }
}