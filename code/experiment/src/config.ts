import {getUrlParams, loadJSON} from "./misc/utils";

export interface Config {
  dev_mode: boolean
  host_url: string
  flask_port: number
  post_data_interval: number

  completion_code: string
  appx_duration: number
  base_reward: number
  reward_per_edge: number
}

export let CONFIG: Config;

export async function loadConfig() {
  CONFIG = await loadJSON('config.json') as Config;
  CONFIG.dev_mode = getUrlParams()['devmode'] === true;
}

export function getFlaskURL() {
  return `http://${CONFIG.host_url}:${CONFIG.flask_port}`
}

export function getPostURL() {
  return `${getFlaskURL()}/save`
}