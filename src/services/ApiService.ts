"use client";

import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import BaseService from "./BaseService";

interface ApiServiceType {
  fetchData<Response = unknown, Request = Record<string, unknown>>(
    param: AxiosRequestConfig<Request>
  ): Promise<AxiosResponse<Response>>;
}

export const ApiService: ApiServiceType = {
  fetchData<Response = unknown, Request = Record<string, unknown>>(
    param: AxiosRequestConfig<Request>
  ): Promise<AxiosResponse<Response>> {
    return new Promise<AxiosResponse<Response>>((resolve, reject) => {
      BaseService(param)
        .then((response: AxiosResponse<Response>) => {
          resolve(response);
        })
        .catch((errors: AxiosError) => {
          reject(errors);
        });
    });
  },
};