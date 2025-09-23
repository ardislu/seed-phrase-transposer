FROM denoland/deno:alpine-2.5.1
USER deno
# Instantiate analysis cache to avoid console warnings later when running this image with the --read-only flag
RUN ["deno", "eval", "''"]
COPY main.ts .
CMD ["run", "--no-code-cache", "main.ts"]