/**
 * Normalizes a seed phrase to remove extraneous whitespace, then splits the words into an array.
 * @param {string} input A seed phrase with any number of whitespace in-between words.
 * @returns {Array<string>} An array of the seed phrase words.
 */
export function parseInput(input: string | null): Array<string> {
  if (input === null) {
    throw new Error("No seed phrase entered.");
  }
  const words = input
    .trim()
    .replaceAll(/\s+/g, " ")
    .split(" ");
  return words;
}

/**
 * Gets the permutations of a seed phrase that was recorded from a transposition error.
 * @param {Array<string>} words An array of words.
 * @param {number} columns The number of columns in the grid that the words were displayed in.
 * @returns {Array<string>} An array of the permutations that the words could take.
 */
export function getPermutations(
  words: Array<string>,
  columns: number,
): Array<string> {
  if (words.length % columns !== 0) {
    throw new Error(
      "Seed phrase length must be divisible by number of columns.",
    );
  }

  const rows = words.length / columns;

  // Assuming only permutations are horizontal-tb and vertical-lr
  // Note that a 3x4 grid read sideways is the same as a 4x3 grid, so only need to check lower factors
  const verticalLR = [];
  const horizontalTB = [];
  for (const [index, word] of words.entries()) {
    const verticalIndex = (index % rows) * columns + Math.floor(index / rows);
    verticalLR[verticalIndex] = word;

    const horizontalIndex = (index % columns) * rows +
      Math.floor(index / columns);
    horizontalTB[horizontalIndex] = word;
  }

  return Array.from(new Set([verticalLR.join(" "), horizontalTB.join(" ")]));
}

/**
 * Gets all factors of a number that are >= 2 and not a multiple of another factor (the "lower" factors).
 * @param {number} num A number to get the lower factors of.
 * @returns {Array<number>} An array of the lower factors of the input.
 */
export function getLowerFactors(num: number): Array<number> {
  const lowerFactors = [];
  for (let i = 2; i < num / (lowerFactors.at(-1) ?? 1); i++) {
    if (num % i === 0) {
      lowerFactors.push(i);
    }
  }
  lowerFactors.reverse(); // The middle factors are the most likely grid arrangements, test those first
  return lowerFactors;
}

/**
 * Entry point to use the program. This function is automatically called if `main.ts` is invoked directly by the Deno CLI.
 */
export function main() {
  const input = prompt("Seed phrase:");
  if (input === "") {
    console.error(
      "%c\nNo input provided. Enter a seed phrase to check permutations.",
      "color: red",
    );
    Deno.exit(0);
  }
  const words = parseInput(input);
  const factors = getLowerFactors(words.length);
  if (factors.length === 0) {
    console.error(
      `%c\nNo permutations found. Seed phrase of length ${words.length} can't be arranged into a grid.`,
      "color: red",
    );
    Deno.exit(0);
  }
  const permutations = factors.map((columns) => getPermutations(words, columns))
    .flat();
  console.log("\n");
  permutations.forEach((permutation) => console.log(permutation));
}

if (import.meta.main) {
  main();
}
