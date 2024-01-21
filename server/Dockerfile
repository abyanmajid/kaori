# FROM rust as builder
#
# WORKDIR /app
#
# # accept the build argument
# ARG DATABASE_URL
#
# ENV DATABASE_URL=$DATABASE_URL
#
# COPY . .
#
# RUN cargo build --release
#
# # Production stage
# FROM ubuntu
#
# WORKDIR /usr/local/bin
#
# COPY --from=builder /app/target/release/axum-practice .
#
# CMD ["./axum-practice"]




# FROM messense/rust-musl-cross:x86_64-musl as chef
# ENV SQLX_OFFLINE=true
# RUN cargo install cargo-chef
# WORKDIR /kaori-server
#
# FROM chef AS planner
# # Copy source code from previous stage
# COPY . .
# # Generate info for caching dependencies
# RUN cargo chef prepare --recipe-path recipe.json
#
# FROM chef AS builder
# COPY --from=planner /kaori-server/recipe.json recipe.json
# # Build & cache dependencies
# RUN cargo chef cook --release --target x86_64-unknown-linux-musl --recipe-path recipe.json
# # Copy source code from previous stage
# COPY . .
# # Build application
# RUN cargo build --release --target x86_64-unknown-linux-musl
#
# # Create a new stage with a minimal image
# FROM scratch
# COPY --from=builder /kaori-server/target/x86_64-unknown-linux-musl/release/kaori-server /kaori-server
# ENTRYPOINT ["/kaori-server"]
# EXPOSE 8000


FROM ubuntu
WORKDIR /
COPY target/release/kaori-server .
ENTRYPOINT ["/kaori-server"]
EXPOSE 8000
