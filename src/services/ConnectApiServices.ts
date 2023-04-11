import axios from 'axios';

export default class ConnectApiServices {
  private _axios: typeof axios;
  private _baseURL: string;

  constructor(protocol: string, host: string) {
    this._axios = axios;
    this._baseURL = `${protocol}://${host}/`;
  }

  public async getFromApi(path: string) {
    return await this._axios
        .get(`${this._baseURL}${path}`)
        .then((response) => response.data);
  }
}
