const BASE_BACKEND_URL = "http://localhost:3000/"

export class BackendRequest {
    private endpoint: string;
    private method: string = "GET";
    private params: string[] = [];
    private body: any = {};

    static for(endpoint: string) {
        return new BackendRequest(endpoint);
    }

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    withMethod(method: string) {
        this.method = method;
        return this;
    }

    withBody(body: any) {
        this.body = body;
        return this;
    }

    withParam(param: string, value: string) {
        this.params.push(`${param}=${value}`)
        return this;
    }

    async send() {
        const endpoint = this.endpoint + (this.params.length ? "?" + this.params.join("&") : "");
        let headers = {
            method: this.method
        }

        if (this.method != "GET") headers.body = this.body;

        const response = await fetch(BASE_BACKEND_URL + endpoint, headers)

        return await response.json();
    }
}