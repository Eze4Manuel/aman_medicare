import axios from "axios";

// const uri = 'http://localhost:9005/v1' // local
export const uri = 'https://app.amanmedicare.org/v1.1/' // staging
export const uri2 = 'https://app.amanmedicare.org/v1.1/' // staging
// const uri = 'https://api.urfood.com/v1' // live
const Axios = axios.create({baseURL: uri});

 

export default Axios;

