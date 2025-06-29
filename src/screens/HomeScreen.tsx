import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ArticleCard from '../components/ArticleCard';
import { fetchNews } from '../api';
import { getBookmarks, saveBookmarks } from '../utils/storage';

export interface Article {
  id: number;
  title: string;
  summary: string;
  image_url: string;
  url: string;
  news_site?: string;
  published_at?: string;
}

type RootStackParamList = {
  Home: undefined;
  Detail: { article: Article };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [bookmarks, setBookmarks] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Load news once on first mount
  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await fetchNews();
      console.log('Articles fetched:', data);
      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error loading articles:', err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Refresh only bookmarks on screen focus
  useFocusEffect(
    React.useCallback(() => {
      const loadBookmarks = async () => {
        const saved = await getBookmarks();
        setBookmarks(saved);
      };
      loadBookmarks();
    }, []),
  );

  const toggleBookmark = async (item: Article) => {
    const exists = bookmarks.find(b => b.url === item.url);
    const updated = exists
      ? bookmarks.filter(b => b.url !== item.url)
      : [...bookmarks, item];

    setBookmarks(updated);
    await saveBookmarks(updated);
  };

  const isBookmarked = (item: Article): boolean =>
    bookmarks.some(b => b.url === item.url);

  const renderItem: ListRenderItem<Article> = ({ item }) => (
    <ArticleCard
      item={item}
      isBookmarked={isBookmarked(item)}
      onPress={() => navigation.navigate('Detail', { article: item })}
      onBookmark={() => toggleBookmark(item)}
    />
  );

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <FlatList
      data={articles}
      keyExtractor={item => item.url}
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <Text style={styles.title}>📰 Top Headlines</Text>
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No articles available</Text>
          <Text style={styles.emptySubtitle}>
            Please check your internet connection or try again later.
          </Text>
        </View>
      }
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});
