interface ILatestNewsItem {
  id: number;
  position: string;
  imageUrl: string;
  title: string;
  description: string;
  shortDescription: string;
  author: string;
  publishedDate: string;
  featured: boolean;
}

export const LATEST_NEWS: ILatestNewsItem[] = [
  {
    id: 1,
    position: "vertical",
    imageUrl: "https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg",
    title: "title goes here title goes here",
    description:
      "Omnis sunt eveniet aliquid deserunt minus possimus et rerum quae. ",
    shortDescription:
      "Omnis sunt eveniet aliquid deserunt minus possimus et rerum quae. ",
    author: "Phoenix Baker",
    publishedDate: "19 Juin 2023",
    featured: true,
  },
  {
    id: 2,
    position: "vertical",
    imageUrl: "https://images.pexels.com/photos/3184429/pexels-photo-3184429.jpeg",
    title: "title goes here title goes here",
    description:
      "Omnis sunt eveniet aliquid deserunt minus possimus et rerum quae. ",
    shortDescription:
      "Omnis sunt eveniet aliquid deserunt minus possimus et rerum quae. ",
    author: "Phoenix Baker",
    publishedDate: "19 Juin 2023",
    featured: false,
  },
  {
    id: 3,
    position: "vertical",
    imageUrl: "https://images.pexels.com/photos/3184429/pexels-photo-3184429.jpeg",
    title: "title goes here title goes here",
    description:
      "Omnis sunt eveniet aliquid deserunt minus possimus et rerum quae. ",
    shortDescription:
      "Omnis sunt eveniet aliquid deserunt minus possimus et rerum quae. ",
    author: "Phoenix Baker",
    publishedDate: "19 Juin 2023",
    featured: false,
  },
];

export const LIST_EVENTS_ID = "590c7021-64f5-419b-9494-a73379748965";
export const LIST_SITE_PAGE_ID = "bacb861d-cc8d-4178-beed-e976a7fa1ca3";