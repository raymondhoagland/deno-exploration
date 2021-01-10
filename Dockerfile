FROM nixos/nix

# Add bash
RUN apk add bash

ENV DENO_DIR /.cache/deno

# Basic setup for packages
RUN nix-channel --add https://nixos.org/channels/nixpkgs-unstable nixpkgs && \
  nix-channel --update

RUN mkdir -p ${DENO_DIR} && \
  chmod 777 ${DENO_DIR}

# Copy source code into the container
WORKDIR /app
ADD src /app/src
ADD .envrc /app
ADD docker_helpers /app
RUN chmod -R 744 /app/src && chmod +x /app/entry.sh

# Build the expression and prep the environment
RUN nix-shell --command 'deno types > src/lib/deno_runtime.d.ts' 

ENTRYPOINT [ "/bin/bash", "/app/entry.sh" ]
