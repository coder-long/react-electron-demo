import fs from 'fs';

let configFile = fs.readFileSync(_static + '/config.json', { encoding: 'utf8' });
let configObj = JSON.parse(configFile);

export default {
  getConfig: (props) => {
    if (configObj.hasOwnProperty(props)) {
      return configObj[props];
    } else {
      return `The configuration item does not exist in this file: ${props}`
    }
  },
  asyncGetConfig: (props) => {
    return new Promise((resolve, reject) => {
      if (configObj.hasOwnProperty(props)) {
        resolve(configObj[props])
      } else {
        reject(`The configuration item does not exist in this file: ${props}`)
      }
    })
  }
}
