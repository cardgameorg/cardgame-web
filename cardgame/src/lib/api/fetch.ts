
export default async function FetchAPI(path: string, method: string, body: any): Promise<Response | null> {
    try {
      const response = await fetch("http://localhost:8080/" + path, {
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