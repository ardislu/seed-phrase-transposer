# seed-phrase-transposer

This is a simple [Deno](https://deno.land/) CLI that prints permutations of a
seed phrase to help test if a transposition error occurred while the seed phrase
was recorded.

## Background

12-word and 24-word
[BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) seed
phrases are ubiquitous in crypto. However, due to the length of the seed phrase,
they're often presented to users in a grid. Sometimes bad wallet UIs do not
number the words,
[making the order of the words ambiguous](https://knowyourmeme.com/memes/dont-dead-open-inside)
and introducing the risk of a user recording the words in the wrong order (a
transposition error).

This tool is intended to show permutations of a seed phrase when read from
ambiguous grid layouts to assist with testing and potential recovery.

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

This CLI will output permutations of the input, helping a user discover the
correct one:

```
> deno run main.ts
Seed phrase: 1 4 7 10 2 5 8 11 3 6 9 12

1 2 3 4 5 6 7 8 9 10 11 12 <-- Correct permutation found!
1 10 8 6 4 2 11 9 7 5 3 12
1 8 4 11 7 3 10 6 2 9 5 12
1 7 2 8 3 9 4 10 5 11 6 12
```

## Usage

Clone this repo and run `main.ts`:

```
> deno run main.ts
Seed phrase:
```

Or you can directly run `main.ts` from its raw GitHub URL:

```
> deno run https://raw.githubusercontent.com/ardislu/seed-phrase-transposer/main/main.ts
Seed phrase:
```

Or install `main.ts` globally and use it as a more typical CLI:

```
> deno install --global --name spt https://raw.githubusercontent.com/ardislu/seed-phrase-transposer/main/main.ts
✅ Successfully installed spt

> spt
Seed phrase:
```

## Security

This CLI is completely self-contained and does not require any file, network, or
environment access. Since Deno is
[secure by default](https://docs.deno.com/runtime/manual/basics/permissions),
the `run` command above will automatically restrict this access.

Before using this CLI, you should also ensure that command outputs (`stdout`)
are _not_ being logged by your terminal application or any other external
programs (e.g.
[`Start-Transcript`](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.host/start-transcript)
on Windows/PowerShell or
[`screen`](https://manpages.ubuntu.com/manpages/trusty/en/man1/screen.1.html)/[`script`](https://manpages.ubuntu.com/manpages/trusty/en/man1/script.1.html)
on Linux/bash).

`main_test.ts` imports dependencies from the
[Deno standard library](https://docs.deno.com/runtime/manual/basics/standard_library)
via [JSR](https://jsr.io/@std). Use the
[`--lock` flag](https://docs.deno.com/runtime/manual/basics/modules/integrity_checking)
to check the integrity of retrieved code against the `deno.lock` file before
execution:

```
deno test --lock
```

`main.ts` does not have any dependencies, so `deno.lock` has no effect on the
main CLI.

## Docker container

For additional security, you can run this CLI within a Docker container.

1. Build the Docker image using the provided `Dockerfile`:

```
docker build -t spt .
```

2. Create a new container without network access and run the CLI:

```
docker run -it --rm --network none spt
```
