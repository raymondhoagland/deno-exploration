import { Status } from './deps.ts';

export interface GithubManagerArgs {
  apiEndpoint: string;
  apiToken: string;
}

/**
 * Options for additional data to pass in the request.
 */
export interface RequestOpts {
  headers?: { [key: string]: any };
}

export class GithubManager {
  public apiEndpoint: string;
  private apiToken: string;

  constructor(args: GithubManagerArgs) {
    this.apiEndpoint = args.apiEndpoint;
    this.apiToken = args.apiToken;
  }

  /**
   * Make a GET request to the API
   * @param endpoint API sub-endpoint to connect to
   * @param opts Additional options for the request
   */
  async apiGetRequest(endpoint: string, opts?: RequestOpts) {
    const headers = [
      ['Accept', 'application/json'],
      ['Authorization', this.apiToken]
    ];
    if (opts && opts.headers) {
      Object.entries(opts.headers).forEach((entry: any[]) => {
        headers[entry[0]] = entry[1];
      })
    }

    // Make the request
    const apiResponse = await fetch(
      this.apiEndpoint + endpoint,
      {
        method: 'GET',
        headers
      }
    );
    if (apiResponse.status !== Status.OK) {
      throw new Error(`Got status ${apiResponse.status} with text ${apiResponse.statusText}, expected 200.`);
    }

    return apiResponse.json();
  }

  /**
   * List pull requests in a repository.
   * @param repoName Name of the repository
   */
  async listPrs(repoName: string): Promise<any> {
    return this.apiGetRequest(`/repos/${repoName}/pulls`);
  }
}
