FROM denoland/deno:alpine-2.1.9
USER deno
COPY main.ts .
CMD ["run", "main.ts"]