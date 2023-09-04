export function parseInput(input: string | null) {
  if (input === null) {
    throw new Error("No seed phrase entered.");
  }
  const words = input
    .trim()
    .replaceAll(/\s+/g, " ")
    .split(" ").map((w) => w.trim());
  return words;
}

export function getPermutations(words: Array<string>, columns: number) {
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

  return [verticalLR.join(" "), horizontalTB.join(" ")];
}

// Gets all factors that are >= 2 and not a multiple of another factor
export function getLowerFactors(num: number) {
  const lowerFactors = [];
  for (let i = 2; i < num / (lowerFactors.at(-1) ?? 1); i++) {
    if (num % i === 0) {
      lowerFactors.push(i);
    }
  }
  return lowerFactors;
}

if (import.meta.main) {
  const input = prompt("Seed phrase:");
  const words = parseInput(input);
  const factors = getLowerFactors(words.length);
  if (factors.length === 0) {
    console.log(
      `\nNo permutations found. Seed phrase of length ${words.length} can't be arranged into a grid.`,
    );
    Deno.exit(0);
  }
  const permutations = factors.map((columns) => getPermutations(words, columns))
    .flat();
  console.log("\n");
  permutations.forEach((permutation) => console.log(permutation));
}
