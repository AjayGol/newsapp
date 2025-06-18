import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '../screens/DetailScreen'; // or from a shared types file

const BOOKMARKS_KEY = '@bookmarked_articles';

// Save list of bookmarked articles
export const saveBookmarks = async (bookmarks: Article[]): Promise<void> => {
  try {
    const json = JSON.stringify(bookmarks);
    await AsyncStorage.setItem(BOOKMARKS_KEY, json);
  } catch (error) {
    console.error('Failed to save bookmarks:', error);
  }
};

// Load bookmarks from storage
export const getBookmarks = async (): Promise<Article[]> => {
  try {
    const data = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load bookmarks:', error);
    return [];
  }
};
