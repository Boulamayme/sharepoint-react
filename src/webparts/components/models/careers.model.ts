export interface ICareer {
  id: number;
  title: string;
  category: string;
  label: string;
  location: string;
  contract: boolean;
  publishedDate: string;
  url: string;
}

export interface ICategoryCareer {
  id: number;
  title: string;
}
