FROM denoland/deno:alpine-2.3.6
USER deno
# Instantiate analysis cache to avoid console warnings later when running this image with the --read-only flag
RUN deno
COPY main.ts .
CMD ["run", "--no-code-cache", "main.ts"]