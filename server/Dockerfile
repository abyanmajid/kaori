FROM rust as builder

WORKDIR /app

# accept the build argument
ARG DATABASE_URL

ENV DATABASE_URL=$DATABASE_URL

COPY . .

RUN cargo build --release

# Production stage
FROM ubuntu

WORKDIR /usr/local/bin

COPY --from=builder /app/target/release/axum-practice .

CMD ["./axum-practice"]
