
export const API_URL = `${window.location.protocol}//${window.location.hostname}:8080`;

export default async function FetchAPI(path: string, method: string, body: any): Promise<Response | null> {
    try {
      const response = await fetch(`${API_URL}/${path}`, {
        method: method,
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      return response;
    } catch (error) {
      console.error("FetchAPI error:", error);
      return null;
    }
  }