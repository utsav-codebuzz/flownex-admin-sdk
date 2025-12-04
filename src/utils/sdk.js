import axios from "axios";

export class FlownexAdminSDK {
    constructor({ baseURL, storage = typeof window !== "undefined" ? localStorage : null }) {
        this.baseURL = baseURL;
        this.storage = storage;

        const savedToken = this.storage?.getItem("flownex_token");

        this.client = axios.create({
            baseURL,
            headers: {
                Authorization: savedToken ? `Bearer ${savedToken}` : ""
            }
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

    saveToken(token) {
        this.storage?.setItem("flownex_token", token);
        this.client.defaults.headers.Authorization = `Bearer ${token}`;
    }

    clearToken() {
        this.storage?.removeItem("flownex_token");
        this.client.defaults.headers.Authorization = "";
    }

    async loginAdmin({ email, password }) {
        const res = await this.client.post("/admin-api/auth/logIn", { email, password });

        if (res.data?.token) {
            this.saveToken(res.data.token);
        }

        return res.data;
    }

    logout() {
        this.clearToken();
    }

    async get(url) {
        const res = await this.client.get(url);
        return res.data;
    }

    async post(url, data) {
        const res = await this.client.post(url, data);
        return res.data;
    }

    async addUser(data) {
        return this.post("/user/create", data);
    }

    async addCaseType(data) {
        return this.post("/case-type/create", data);
    }
}
