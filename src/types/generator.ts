export type CardType = 'github' | 'leetcode' | 'typing';
export type ActiveTab = 'data' | 'visual' | 'custom';

export interface CustomField {
  key: string;
  value: string;
}

export interface HiddenFields {
  name: boolean;
  login: boolean;
  bio: boolean;
  repos: boolean;
  followers: boolean;
  company: boolean;
  location: boolean;
  [key: string]: boolean;
}

export interface ExportOptions {
  typing: boolean;
  github: boolean;
  leetcode: boolean;
}

export interface FormData {
  username: string;
  custom_username: string;
  name: string;
  bio: string;
  company: string;
  location: string;
  repos: string;
  followers: string;
  following: string;
  custom_image: string;
  card_font: string;
  text_color: string;
  theme: string;
  border_style: string;
  border_color: string;
  corner_radius: string;
  anim_speed: string;
  bg_style: string;
  font_size: string;
  layout_gap: string;
  avatar_style: string;
  ascii_density: string;
  leetcode_username: string;
  lc_theme: string;
  lc_show_badges: boolean;
  lc_animate_badges: boolean;
  lc_show_graph: boolean;
  typing_intro: string;
  typing_color: string;
  typing_font: string;
  typing_size: string;
  typing_duration: string;
  [key: string]: any;
}
