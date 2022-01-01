import axios from "axios";

// const uri = 'http://localhost:9005/v1' // local
export const uri = 'https://app.amanmedicare.org/v1.1/' // staging
export const uri2 = 'https://app.amanmedicare.org/v1.1/' // staging
// const uri = 'https://api.urfood.com/v1' // live
const header =  {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    mode: 'no-cors'
  }
const Axios = axios.create({baseURL: uri, headers: header });

 

export default Axios;

