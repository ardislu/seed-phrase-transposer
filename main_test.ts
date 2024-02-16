import { getLowerFactors, getPermutations, main, parseInput } from "./main.ts";
import {
  assertArrayIncludes,
  assertEquals,
  assertFalse,
  assertThrows,
} from "https://deno.land/std@0.216.0/assert/mod.ts";
import {
  assertSpyCalls,
  spy,
  stub,
} from "https://deno.land/std@0.216.0/testing/mock.ts";

Deno.test("parseInput throws on null", () => {
  assertThrows(() => parseInput(null));
});

Deno.test("parseInput collapses whitespace correctly", () => {
  const words = parseInput(
    "     \n\ntest     \n\ntest test  test test test\ntest\n     \n\ntest     \n\n",
  );
  assertEquals(words.length, 8);
});

Deno.test("parseInput parses 12 word seed phrase", () => {
  const words = parseInput(
    "test test test test test test test test test test test junk",
  );
  assertEquals(words.length, 12);
});

Deno.test("parseInput parses 15 word seed phrase", () => {
  const words = parseInput(
    "test test test test test test test test test test test test test test junk",
  );
  assertEquals(words.length, 15);
});

Deno.test("parseInput parses 24 word seed phrase", () => {
  const words = parseInput(
    "test test test test test test test test test test test junk test test test test test test test test test test test junk",
  );
  assertEquals(words.length, 24);
});

Deno.test("getPermutations throws on invalid number of columns", () => {
  assertThrows(() =>
    getPermutations(
      "test test test test test test test test test test test junk".split(" "),
      5,
    )
  );
});

/*
Example: "3-column vertical-lr incorrectly recorded as horizontal-tb"

Grid:
1  2  3
4  5  6
7  8  9
10 11 12

User enters:
1 4 7 10 2 5 8 11 3 6 9 12

getPermutations should return:
[ "1 2 3 4 5 6 7 8 9 10 11 12", "1 10 8 6 4 2 11 9 7 5 3 12" ]
*/
const test12WordGrids = [
  {
    testName: "2-column vertical-lr incorrectly recorded as horizontal-tb",
    words: "1 3 5 7 9 11 2 4 6 8 10 12".split(" "),
    columns: 2,
  },
  {
    testName: "2-column horizontal-tb incorrectly recorded as vertical-lr",
    words: "1 7 2 8 3 9 4 10 5 11 6 12".split(" "),
    columns: 2,
  },
  {
    testName: "3-column vertical-lr incorrectly recorded as horizontal-tb",
    words: "1 4 7 10 2 5 8 11 3 6 9 12".split(" "),
    columns: 3,
  },
  {
    testName: "3-column horizontal-tb incorrectly recorded as vertical-lr",
    words: "1 5 9 2 6 10 3 7 11 4 8 12".split(" "),
    columns: 3,
  },
];
const test15WordGrids = [
  {
    testName: "3-column vertical-lr incorrectly recorded as horizontal-tb",
    words: "1 4 7 10 13 2 5 8 11 14 3 6 9 12 15".split(" "),
    columns: 3,
  },
  {
    testName: "3-column horizontal-tb incorrectly recorded as vertical-lr",
    words: "1 6 11 2 7 12 3 8 13 4 9 14 5 10 15".split(" "),
    columns: 3,
  },
];
const test24WordGrids = [
  {
    testName: "6-column vertical-lr incorrectly recorded as horizontal-tb",
    words: "1 7 13 19 2 8 14 20 3 9 15 21 4 10 16 22 5 11 17 23 6 12 18 24"
      .split(" "),
    columns: 6,
  },
  {
    testName: "6-column horizontal-tb incorrectly recorded as vertical-lr",
    words: "1 5 9 13 17 21 2 6 10 14 18 22 3 7 11 15 19 23 4 8 12 16 20 24"
      .split(" "),
    columns: 6,
  },
  {
    testName: "8-column vertical-lr incorrectly recorded as horizontal-tb",
    words: "1 9 17 2 10 18 3 11 19 4 12 20 5 13 21 6 14 22 7 15 23 8 16 24"
      .split(" "),
    columns: 8,
  },
  {
    testName: "8-column horizontal-tb incorrectly recorded as vertical-lr",
    words: "1 4 7 10 13 16 19 22 2 5 8 11 14 17 20 23 3 6 9 12 15 18 21 24"
      .split(" "),
    columns: 8,
  },
  {
    testName: "12-column vertical-lr incorrectly recorded as horizontal-tb",
    words: "1 13 2 14 3 15 4 16 5 17 6 18 7 19 8 20 9 21 10 22 11 23 12 24"
      .split(" "),
    columns: 12,
  },
  {
    testName: "12-column horizontal-tb incorrectly recorded as vertical-lr",
    words: "1 3 5 7 9 11 13 15 17 19 21 23 2 4 6 8 10 12 14 16 18 20 22 24"
      .split(" "),
    columns: 12,
  },
];
Deno.test("getPermutations returns correct permutations of 12-word test grids", () => {
  test12WordGrids.forEach((grid) => {
    const permutations = getPermutations(grid.words, grid.columns);
    assertArrayIncludes<string>(permutations, ["1 2 3 4 5 6 7 8 9 10 11 12"]);
  });
});
Deno.test("getPermutations returns correct permutations of 15-word test grids", () => {
  test15WordGrids.forEach((grid) => {
    const permutations = getPermutations(grid.words, grid.columns);
    assertArrayIncludes<string>(permutations, [
      "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15",
    ]);
  });
});
Deno.test("getPermutations returns correct permutations of 24-word test grids", () => {
  test24WordGrids.forEach((grid) => {
    const permutations = getPermutations(grid.words, grid.columns);
    assertArrayIncludes<string>(permutations, [
      "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24",
    ]);
  });
});

Deno.test("getLowerFactors returns correct factors of 12", () => {
  const factors = getLowerFactors(12);
  assertArrayIncludes<number>(factors, [2, 3]);
  assertFalse(factors.includes(4));
  assertFalse(factors.includes(6));
});

Deno.test("getLowerFactors returns correct factors of 15", () => {
  const factors = getLowerFactors(15);
  assertArrayIncludes<number>(factors, [3]);
  assertFalse(factors.includes(5));
});

Deno.test("getLowerFactors returns correct factors of 24", () => {
  const factors = getLowerFactors(24);
  assertArrayIncludes<number>(factors, [2, 3, 4]);
  assertFalse(factors.includes(6));
  assertFalse(factors.includes(8));
  assertFalse(factors.includes(12));
});

Deno.test("main logs permutations of a 12-word seed phrase", () => {
  const consoleSpy = spy(console, "log");
  const promptStub = stub(
    globalThis,
    "prompt",
    () => "1 4 7 10 2 5 8 11 3 6 9 12",
  );

  main();
  assertSpyCalls(consoleSpy, 5); // console.log was called exactly 5 times

  consoleSpy.restore();
  promptStub.restore();
});

Deno.test("main exits cleanly on a malformed seed phrase", () => {
  const consoleSpy = spy(console, "error");
  const promptStub = stub(
    globalThis,
    "prompt",
    () => "1 2 3 4 5",
  );

  assertThrows(main); // Calling Deno.exit() within a test throws an error
  assertSpyCalls(consoleSpy, 1); // console.error was called exactly 1 time

  consoleSpy.restore();
  promptStub.restore();
});

Deno.test("main exits cleanly on no input", () => {
  const consoleSpy = spy(console, "error");
  const promptStub = stub(
    globalThis,
    "prompt",
    () => "",
  );

  assertThrows(main);
  assertSpyCalls(consoleSpy, 1);

  consoleSpy.restore();
  promptStub.restore();
});
