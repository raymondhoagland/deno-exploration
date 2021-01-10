REPO_NAME=$1

nix-shell --command "direnv allow /app/.envrc && direnv exec . deno run --allow-net --allow-env ./src/main.ts --repoName=$REPO_NAME"
