const API_KEY = import.meta.env.VITE_API_KEY

export class RequestHandler {
    private static instance: RequestHandler
    private baseUrl = 'https://api.coingecko.com/api/v3'

    private constructor() {}

    public static getInstance(): RequestHandler {
        if (!RequestHandler.instance) RequestHandler.instance = new RequestHandler()
        return RequestHandler.instance
    }

    public async get(url: string, queryParams?: {}): Promise<any> {
        const fullUrl = `${this.baseUrl + url}?${new URLSearchParams(queryParams).toString() || ''}`

        return (await fetch(fullUrl, {
            headers: { 'x-cg-demo-api-key': API_KEY }
        })).json()
    }
}