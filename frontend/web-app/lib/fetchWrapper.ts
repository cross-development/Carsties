import { getTokenWorkaround } from '@/app/actions/authActions';

const baseUrl = 'http://localhost:6001';

const handleResponse = async (response: Response) => {
  const text = await response.text();
  const data = text && JSON.parse(text);

  if (response.ok) {
    return data || response.statusText;
  }

  const error = {
    status: response.status,
    message: response.statusText,
  };

  return { error };
};

const getHeaders = async () => {
  const token = await getTokenWorkaround();
  const headers = { 'Content-Type': 'application/json' } as any;

  if (token) {
    headers.Authorization = `Bearer ${token.access_token}`;
  }

  return headers;
};

const get = async (url: string) => {
  const headers = await getHeaders();

  const requestOptions = {
    method: 'GET',
    headers,
  };

  const response = await fetch(baseUrl + url, requestOptions);

  return await handleResponse(response);
};

const post = async (url: string, body: {}) => {
  const headers = await getHeaders();

  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };

  const response = await fetch(baseUrl + url, requestOptions);

  return await handleResponse(response);
};

const put = async (url: string, body: {}) => {
  const headers = await getHeaders();

  const requestOptions = {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  };

  const response = await fetch(baseUrl + url, requestOptions);

  return await handleResponse(response);
};

const del = async (url: string) => {
  const headers = await getHeaders();

  const requestOptions = {
    method: 'DELETE',
    headers,
  };

  const response = await fetch(baseUrl + url, requestOptions);

  return await handleResponse(response);
};

export const fetchWrapper = {
  get,
  post,
  put,
  del,
};
