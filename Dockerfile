FROM denoland/deno:alpine-2.2.3
USER deno
COPY main.ts .
CMD ["run", "main.ts"]