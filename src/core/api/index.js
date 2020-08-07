import axios from 'axios';

const postApi = (url, data = {}, request = {}) => {
  // request.withCredentials = true;
  return axios
    .post(url, data, request)
    .then(response => {
      return Promise.resolve(response);
    })
    .catch(error => {
      return Promise.reject(error);
    });
}


const postApiWithToken =  (url, token, data = {}, request = {}) => {
  const additional = {
    ...request,
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return axios
    .post(url, data, additional)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};


const getApi = (url, request = {}) => {
  return axios
    .get(url, request)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};


const getApiWithToken = (url, token, request = {}) => {
  const additional = {
    ...request,
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return axios
    .get(url, additional)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};


const putApi = (url, data = {}, request = {}) => {
  // request.withCredentials = true;
  return axios
    .put(url, data, request)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const putApiWithToken = (url, token, data = {}, request = {}) => {
  const additional = {
    ...request,
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return axios
    .put(url, data, additional)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};



export {
  getApi,
  getApiWithToken,
  postApi,
  postApiWithToken,
  putApi,
  putApiWithToken
};







