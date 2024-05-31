import axios, { AxiosResponse } from "axios";

async function getPhotos(query: string | null, page: number): Promise<PixabayResponse> {
  const apiKey = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;
  if (apiKey === undefined) {
    throw new Error("NEXT_PUBLIC_PIXABAY_API_KEY is undefined");
  }
  try {
    const response: AxiosResponse<PixabayResponse> = await axios.get("https://pixabay.com/api/", {
      params: {
        key: apiKey,
        q: query,
        page: page,
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Request failed:', error.message);
    } else {
      console.error('Error:', error);
    }
    throw error;
  }
}

export default getPhotos;
