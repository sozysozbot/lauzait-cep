export type Suit = "筆" | "兵";
export type Rank = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type Card = { suit: Suit, rank: Rank, id: number } | { suit: "歪", id: number };
