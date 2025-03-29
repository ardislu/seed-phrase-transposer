FROM denoland/deno:alpine-2.2.6
USER deno
COPY main.ts .
CMD ["run", "main.ts"]