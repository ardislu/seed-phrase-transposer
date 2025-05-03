FROM denoland/deno:alpine-2.3.1
USER deno
COPY main.ts .
CMD ["run", "main.ts"]