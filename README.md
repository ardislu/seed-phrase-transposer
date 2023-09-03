# seed-phrase-transposer

This is a simple [Deno](https://deno.land/) CLI to print possible permutations
of a seed phrase to help test if a transposition error occurred while the seed
phrase was recorded.

## Background

12-word and 24-word
[BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) seed
phrases are ubiquitous in crypto. However, due to the length of the seed phrase,
they're often presented to users in a grid. Sometimes bad wallet UIs do not
number the words,
[making the order of the words ambiguous](https://knowyourmeme.com/memes/dont-dead-open-inside)
and thus introducing the risk of a user recording the words in the wrong order
(a transposition error).

This tool is intended to show possible permutations of a seed phrase when read
from ambiguous grid layouts to assist with testing and potential recovery.

## Example

Consider this 3x4 grid layout:

```
1  2  3
4  5  6
7  8  9
10 11 12
```

The grid is intended to be read left-to-right, top-to-bottom. But a user may
incorrectly record these numbers top-to-bottom, left-to-right. Like this:

```
1 4 7 10 2 5 8 11 3 6 9 12
```

This CLI will output possible permutations of the input, enabling a user to
quickly discover the correct one:

```
> deno run main.ts
Seed phrase: 1 4 7 10 2 5 8 11 3 6 9 12

1 8 4 11 7 3 10 6 2 9 5 12
1 7 2 8 3 9 4 10 5 11 6 12
1 2 3 4 5 6 7 8 9 10 11 12 <-- Correct permutation found!
1 10 8 6 4 2 11 9 7 5 3 12
```
