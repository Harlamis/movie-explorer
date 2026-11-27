export interface HttpRequestConfig {
  params?: Record<string, unknown>;
}

export interface HttpResponse<T> {
  data: T;
}

export interface HttpClient {
  get<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
}
