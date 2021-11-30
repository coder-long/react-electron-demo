import fs from 'fs';
import path from 'path';

let configFile = fs.readFileSync(_static_path, { encoding: 'utf8' });
let config = JSON.parse(configFile);

export default {
  getConfig: (props) => {
    if (config.hasOwnProperty(props)) {
      return configFile[props];
    } else {
      return `The configuration item does not exist in this file: ${props}`
    }
  },
  asyncGetConfig: (props) => {
    return new Promise((resolve, reject) => {
      if (config.hasOwnProperty(props)) {
        resolve(configFile[props])
      } else {
        reject(`The configuration item does not exist in this file: ${props}`)
      }
    })
  }
}