export interface Book{
  id:number;
  name:string;
  cover:string;
  releaseDate:string;
  author: {id: number, name:string}
}
