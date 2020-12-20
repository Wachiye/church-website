import axios from "axios";
const axiosInstance = axios
  .create({
    baseURL: "http://localhost:8090/api",
    headers: {
      "Content-type": "application/json",
      'Authorization': localStorage.getItem('access_token')
    },
  });

  axiosInstance.interceptors.response.use( (res) => {
    return res.data;
  }, (err) => {
    if(err.response){
      err.response.data.error["message"] = err.response.data.message;
      return err.response.data;
    }
    if(err.request){
      let e = new Error(err.message);
      e = {
        code: 500,
        name: 'connection_err',
        message: 'Could not connect to the server. Check your internet connection and try again'
      }
     let  data = {
        data: [],
        error: e
      }
      return data;
    }
  });

  export default axiosInstance;