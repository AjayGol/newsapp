import axios from 'axios';

const BASE_URL = 'https://api.spaceflightnewsapi.net/v4/articles';

// Define Article type
export interface Article {
  id: number;
  title: string;
  summary: string;
  image_url: string;
  url: string;
  news_site?: string;
  published_at?: string;
}

// Define API response structure
interface FetchNewsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Article[];
}

// Fetch articles from Spaceflight News API
export const fetchNews = async (): Promise<Article[]> => {
  try {
    const response = await axios.get<FetchNewsResponse>(BASE_URL);
    return response.data.results;
  } catch (error) {
    console.error('News fetch error:', error);
    return [];
  }
};
