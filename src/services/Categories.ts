export default class Categories {
  private readonly _market: string;
  private _categoryName: string = "";

  constructor(market: string) {
    this._market = market;   
  }

  private mercadoCategories(category: string){
    if ( category === "Celulares"){
      this._categoryName = "Celulares";
      return "MLB1055";
    }else if (category === "Geladeiras") {
      this._categoryName = "Geladeiras";
      return "MLB181294";
    }
    this._categoryName = "TV";
    return "MLB1002"
  }
  
  public getCategory (category: string){
    return this.mercadoCategories(category)
  }

  get market(): string {
    return this._market;
  }

  get categoryName(): string {
    return this._categoryName;
  }
}