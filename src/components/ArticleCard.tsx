import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageSourcePropType,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Article } from '../screens/DetailScreen'; // Or import from a shared `types.ts`

// Fallback image if item.image_url fails or is missing
const placeholderImage: ImageSourcePropType = {
  uri: 'https://dummyimage.com/80x80/cccccc/000000.png&text=No+Image',
};

type Props = {
  item: Article;
  isBookmarked: boolean;
  onPress: () => void;
  onBookmark: () => void;
};

export default function ArticleCard({
  item,
  onPress,
  onBookmark,
  isBookmarked,
}: Props) {
  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image
        source={
          imageError || !item.image_url
            ? placeholderImage
            : { uri: item.image_url }
        }
        style={styles.image}
        resizeMode="cover"
        onError={() => setImageError(true)}
      />

      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.meta}>
          📰 {item.news_site || 'Unknown'} •{' '}
          {item.published_at
            ? new Date(item.published_at).toLocaleDateString()
            : ''}
        </Text>

        <Text numberOfLines={2} style={styles.desc}>
          {item.summary}
        </Text>
      </View>

      <TouchableOpacity onPress={onBookmark} style={styles.bookmark}>
        <Icon
          name={isBookmarked ? 'bookmark' : 'bookmark-border'}
          size={24}
          color="#444"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 10,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 15,
    color: '#222',
  },
  meta: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
  },
  desc: {
    color: '#555',
    fontSize: 13,
    marginTop: 4,
  },
  bookmark: {
    paddingLeft: 6,
    paddingTop: 6,
  },
});
