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

export type SteamPlayer = {
  avatar?: string;
  avatarfull?: string;
  profileurl?: string;
  personaname?: string;
  personastate?: number;
  gameextrainfo?: string;
  gameid?: string;
};

export type SteamResponse = {
  player?: SteamPlayer | null;
};
