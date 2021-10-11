import qs from "qs";
import { useAuth } from "context/auth-content";
// import * as Auth from 'context/auth-provider'

import { message } from "antd";

export interface Config extends RequestInit {
  token?: string;
  data?: object;
}

const apiUrl = process.env.REACT_APP_API_URL;

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window.fetch(apiUrl + endpoint, config).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return Promise.resolve(data);
    } else {
      message.error(data.message);
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
