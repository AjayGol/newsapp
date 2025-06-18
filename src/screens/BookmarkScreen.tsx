import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ArticleCard from '../components/ArticleCard';
import { getBookmarks, saveBookmarks } from '../utils/storage';
// @ts-ignore
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Article } from './DetailScreen'; // or from a shared types file
import { RootStackParamList } from './types';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Bookmarks'
>;

type Props = {
  navigation: NavigationProp;
};

export default function BookmarkScreen({ navigation }: Props) {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);

  useEffect(() => {
    const load = async () => {
      const saved = await getBookmarks();
      setBookmarks(saved);
    };

    const unsubscribe = navigation.addListener('focus', load);
    return unsubscribe;
  }, [navigation]);

  const removeBookmark = async (item: Article) => {
    const updated = bookmarks.filter(b => b.url !== item.url);
    setBookmarks(updated);
    await saveBookmarks(updated);
  };

  if (bookmarks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="bookmark-border" size={60} color="#aaa" />
        <Text style={styles.emptyText}>No bookmarks saved</Text>
        <Text style={styles.subText}>
          Browse articles and bookmark your favorites!
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Browse News</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={bookmarks}
      keyExtractor={item => item.url}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🔖 Bookmarked Articles</Text>
        </View>
      }
      renderItem={({ item }) => (
        <ArticleCard
          item={item}
          isBookmarked={true}
          onPress={() => navigation.navigate('Detail', { article: item })}
          onBookmark={() => removeBookmark(item)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#333',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  header: {
    padding: 16,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
});
