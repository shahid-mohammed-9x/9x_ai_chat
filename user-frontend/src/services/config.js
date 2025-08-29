const development = {
  API_SERVER: 'http://localhost:8000/api/v1',
  GPT_SERVER: 'http://localhost:8002/api/v1',
  GEMINI_SERVER: 'http://localhost:8003/api/v1',
  GROK_SERVER: 'http://localhost:8004/api/v1',
};

const production = {
  API_SERVER: import.meta.env.API_SERVER,
  GPT_SERVER: import.meta.env.GPT_SERVER,
  GEMINI_SERVER: import.meta.env.GEMINI_SERVER,
  GROK_SERVER: import.meta.env.GROK_SERVER,
};

const ip = {
  API_SERVER: 'http://10.10.1.193:8000/api/v1',
  GPT_SERVER: 'http://10.10.1.192:8002/api/v1',
  GEMINI_SERVER: 'http://10.10.1.192:8003/api/v1',
  GROK_SERVER: 'http://10.10.1.192:8004/api/v1',
};

const config_urls = {
  development,
  production,
  ip,
};

const API_URLS = config_urls[import.meta.env.VITE_DEVELOPMENT_MODE || 'development'];

export default API_URLS;
