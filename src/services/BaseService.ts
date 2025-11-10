"use client";

import axios, { AxiosInstance } from 'axios';

const BaseService: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_API_URL || 'https://api.coingecko.com/api/v3',
  headers: {
    'Content-Type': 'application/json',
    'x-cg-demo-api-key': '',
  },
});

export default BaseService;