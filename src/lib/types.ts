export interface GridItem {
  title: string;
  description?: string;
  link: string;
  isExternal?: boolean;
}

export type Column = {
  label: string;
  items: GridItem[];

};

export type Projects = {
  name: string;
  description: string;
  link: string;
}[];
