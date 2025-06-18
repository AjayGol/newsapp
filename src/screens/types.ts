export interface Article {
    id: number;
    title: string;
    summary: string;
    image_url: string;
    url: string;
    news_site?: string;
    published_at?: string;
}

export type RootStackParamList = {
    Home: undefined;
    Detail: { article: Article };
    Bookmarks: undefined;
};
