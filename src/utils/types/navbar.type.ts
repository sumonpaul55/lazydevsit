export type NavItem = {
  key: string;
  navName: string;
  url: string;
  subItems?: {
    title: string;
    items: string[];
  }[];
};