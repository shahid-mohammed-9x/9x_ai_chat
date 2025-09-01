const axios = require("axios");
const { AI_API_URL } = require("../config/index.config");
const logger = require("../config/logger.config");

class AxiosConfig {
  constructor() {
    this.config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  addConfig(key, value) {
    this.config[key] = value;
  }

  removeConfig(key) {
    if (this.config.hasOwnProperty(key)) {
      delete this.config[key];
    }
  }

  addConfigHeader(key, value) {
    this.config.headers[key] = value;
  }

  removeConfigHeader(key) {
    if (this.config.headers.hasOwnProperty(key)) {
      delete this.config.headers[key];
    }
  }

  removeContentType() {
    this.removeConfig("Content-Type");
  }

  addAuthorization(token) {
    this.addConfigHeader("Authorization", `Bearer ${token}`);
  }

  addFormHeaderContentType() {
    this.addConfigHeader("Content-Type", "multipart/form-data");
  }

  getConfig() {
    return this.config;
  }
}

class RequestMethodInstance {
  async getMethod(url, headers) {
    const config = { ...headers };
    const response = await axios.get(url, config);
    return response;
  }
  async postMethod(url, body, headers) {
    const config = { ...headers };
    const response = await axios.post(url, body, config);
    return response;
  }
  async putMethod(url, body, headers) {
    const config = { ...headers };
    const response = await axios.put(url, body, config);
    return response;
  }

  async patchMethod(url, body, headers) {
    const config = { ...headers };
    const response = await axios.patch(url, body, config);
    return response;
  }

  async deleteMethod(url, body, headers) {
    const config = { ...headers };
    const response = await axios.delete(url, config);
    return response;
  }
}

const ApiUrlMapper = {
  ai: AI_API_URL,
};

const handleHeaders = (token, contentType) => {
  const axiosConfig = new AxiosConfig();
  if (!contentType) {
    axiosConfig.removeContentType();
  } else if (contentType === "formData") {
    axiosConfig.addFormHeaderContentType();
  }
  if (token) {
    axiosConfig.addAuthorization(token);
  }
  return axiosConfig.getConfig();
};

const processResponse = async (response) => {
  if (response?.message === "Network Error") {
    return [false, { message: response.message, statusCode: 500 }, 500];
  }

  if (response.status === 200) {
    return [true, response.data, response.status];
  } else if (response.status === 401) {
    return [false, response.data, response.status];
  } else {
    return [response.status, response.data, response.status];
  }
};

const apiFetch = new RequestMethodInstance();

const axiosService = {
  fetchGet: async (
    url,
    token = null,
    contentType = null,
    accessPoint = "ai"
  ) => {
    try {
      const endpoint = ApiUrlMapper[accessPoint] + url;
      const headers = handleHeaders(token, contentType);
      const response = await apiFetch.getMethod(endpoint, headers);
      return processResponse(response);
    } catch (error) {
      onFailure("network", url);
      return processResponse(error?.response || error);
    }
  },

  fetchPost: async (
    url,
    body,
    token = null,
    contentType = "json",
    accessPoint = "ai"
  ) => {
    try {
      const endpoint = ApiUrlMapper[accessPoint] + url;
      const headers = handleHeaders(token, contentType);
      const response = await apiFetch.postMethod(endpoint, body, headers);
      return processResponse(response);
    } catch (error) {
      onFailure("network", url, error);
      return processResponse(error?.response || error);
    }
  },

  fetchPut: async (
    url,
    body = null,
    token = null,
    contentType = "json",
    accessPoint = "ai"
  ) => {
    try {
      const endpoint = ApiUrlMapper[accessPoint] + url;
      const headers = handleHeaders(token, contentType);
      const response = await apiFetch.putMethod(endpoint, body, headers);
      return processResponse(response);
    } catch (error) {
      onFailure("network", url);
      return processResponse(error?.response || error);
    }
  },

  fetchPatch: async (
    url,
    body = null,
    token = null,
    contentType = "json",
    accessPoint = "ai"
  ) => {
    try {
      const endpoint = ApiUrlMapper[accessPoint] + url;
      const headers = handleHeaders(token, contentType);
      const response = await apiFetch.patchMethod(endpoint, body, headers);
      return processResponse(response);
    } catch (error) {
      onFailure("network", url);
      return processResponse(error?.response || error);
    }
  },

  fetchDelete: async (
    url,
    token = null,
    body = {},
    contentType = "json",
    accessPoint = "ai"
  ) => {
    try {
      const endpoint = ApiUrlMapper[accessPoint] + url;
      const headers = handleHeaders(token, contentType);
      const response = await apiFetch.deleteMethod(endpoint, body, headers);
      return processResponse(response);
    } catch (error) {
      onFailure("network", url);
      return processResponse(error?.response || error);
    }
  },
};

const onFailure = async (res, url, error) => {
  logger.error("API FAILED ", error);
  console.log("API FAILED " + url, error?.message);
};

module.exports = axiosService;
