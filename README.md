# Deno-Playground
## Description
A repo for exploring the possibilities of Deno.

## Usage
### Prerequisites
- [Install Deno](https://deno.land/#installation)
- Add Deno type definitions (`deno types > lib/deno_runtime.d.ts`)
- Install direnv (Optional) to add the Deno executable to PATH

### Execution
```bash
GITHUB_API_TOKEN=<token> deno run --allow-net --allow-env src/main.ts --repoName=<repository name>
```