import router from "@/router";
import {
  setupDiscoverMusic,
  setupNavMenuRouters,
  defaultPath,
  setupNavMenuConfig,
  navMenuConfig,
} from "./initSetting";
export interface menuItem {
  name: string;
  path: string;
  children?: menuItem[];
  isChecked: boolean;
  [x: string]: any;
}

export function setupRouters() {
  setupNavMenuConfig();
  setupNavMenuRouters();
  setupDiscoverMusic();
}
