import { requestGet, } from "./request";

export const getAllData = (url, data) => requestGet(url, data);
