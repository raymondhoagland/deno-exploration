import { parse } from './lib/deps.ts';
import { GithubManager } from './lib/github.ts';

(async () => {
  const parsedArgs = parse(Deno.args);

  if (!Deno.env.get('GITHUB_API_TOKEN')) {
    throw new Error('No API token found, exiting.');
  }

  const ghMgr = new GithubManager({
    apiEndpoint: parsedArgs['apiEndpoint'] || 'https://api.github.com',
    apiToken: Deno.env.get('GITHUB_API_TOKEN') as string
  });

  return await ghMgr.listPrs(parsedArgs['repoName']);
})().then((response) => {
  console.log(JSON.stringify(response, undefined, 2));
}).catch((err) => {
  throw err;
});
