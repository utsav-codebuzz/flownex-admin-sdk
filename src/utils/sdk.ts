import axios, { AxiosInstance } from "axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  [key: string]: any;
}

export interface RequestOptions<T = any> {
  url: string;
  data?: T;
}

export interface FlownexAdminConfig {
  baseURL: string;
  storage?: Storage | null;
}

export class FlownexAdminSDK {
  private baseURL: string;
  private storage: Storage | null;
  private client: AxiosInstance;

  constructor({
    baseURL,
    storage = typeof window !== "undefined" ? localStorage : null,
  }: FlownexAdminConfig) {
    this.baseURL = baseURL;
    this.storage = storage;

    const savedToken = this.storage?.getItem("flownex_token");

    this.client = axios.create({
      baseURL,
      headers: {
        Authorization: savedToken ? `Bearer ${savedToken}` : "",
      },
    });

    this.client.interceptors.response.use(
      (res) => res,
      (err) => {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong";
        return Promise.reject(new Error(message));
      }
    );
  }

  saveToken(token: string) {
    this.storage?.setItem("flownex_token", token);
    this.client.defaults.headers.Authorization = `Bearer ${token}`;
  }

  clearToken() {
    this.storage?.removeItem("flownex_token");
    this.client.defaults.headers.Authorization = "";
  }

  async loginAdmin(payload: LoginPayload): Promise<LoginResponse> {
    const res = await this.client.post("/admin-api/auth/logIn", payload);

    if (res.data?.token) {
      this.saveToken(res.data.token);
    }

    return res.data;
  }

  logout() {
    this.clearToken();
  }

  async get<T = any>(url: string): Promise<T> {
    const res = await this.client.get(url);
    return res.data;
  }

  async post<T = any>(url: string, data?: any): Promise<T> {
    const res = await this.client.post(url, data);
    return res.data;
  }

  async addUser(data: any) {
    return this.post("/user/create", data);
  }

  async addCaseType(data: any) {
    return this.post("/case-type/create", data);
  }
}
