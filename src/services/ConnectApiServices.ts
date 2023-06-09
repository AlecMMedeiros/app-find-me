import axios from 'axios';

export default class ConnectApiServices {
  private _axios: typeof axios;
  private _baseURL: string;
  private readonly _market: string;
  private readonly _category: string;
  private readonly _searchTerm: string;

  constructor(market: string, category: string, searchTerm: string) {
    this._axios = axios;
    this._baseURL = "";
    this._market= market;
    this._category = category;
    this._searchTerm = searchTerm;
  };

  private setBaseURL (market : string){
    if (market === "Mercado Livre"){
      return this._baseURL = `https://api.mercadolibre.com/sites/MLB/search?category=${this._category}&q=${this._searchTerm}`;
    } else if ( market === "Buscape") {
      return this._baseURL = `https://kppv88hzr1.execute-api.sa-east-1.amazonaws.com/prod/search?searchTerm=${this._searchTerm}&category=${this._category}`;
    }
    return null;
  };

  public async getFromApi() {
    this.setBaseURL(this._market);
    return await this._axios
        .get(`${this._baseURL}`)
  };
}
