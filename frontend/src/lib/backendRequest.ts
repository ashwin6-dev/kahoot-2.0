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
        const url = BASE_BACKEND_URL + this.endpoint;
        const queryParams = this.params.join('&');
        const fullUrl = queryParams ? `${url}?${queryParams}` : url;

        const headers = {
            method: this.method,
            'Content-Type': 'application/json',
        };

        let body: string | undefined;
        if (this.method !== 'GET' && this.body) {
            body = JSON.stringify(this.body);
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(fullUrl, {
            method: this.method,
            headers,
            body,
        });

        return await response.json();
    }

}