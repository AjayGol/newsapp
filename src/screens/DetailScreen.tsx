import React, { useState } from 'react';
import {
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ImageSourcePropType,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';

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

// Define route type for Detail screen
type RootStackParamList = {
  Detail: { article: Article };
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

type Props = {
  route: DetailScreenRouteProp;
};

export default function DetailScreen({ route }: Props) {
  const { article } = route.params;
  const [imageError, setImageError] = useState(false);

  const placeholderImage: ImageSourcePropType = {
    uri: 'https://dummyimage.com/600x400/cccccc/000000.png&text=No+Image',
  };

  return (
    <ScrollView style={{ padding: 15 }}>
      <Image
        source={
          imageError || !article.image_url
            ? placeholderImage
            : { uri: article.image_url }
        }
        style={styles.image}
        resizeMode="cover"
        onError={() => setImageError(true)}
      />

      <Text style={styles.title}>{article.title}</Text>

      <Text style={styles.meta}>
        📰 {article.news_site || 'Unknown'} •{' '}
        {article.published_at
          ? new Date(article.published_at).toLocaleString()
          : 'N/A'}
      </Text>

      <Text style={styles.content}>
        {article.summary || 'No summary available.'}
      </Text>

      <TouchableOpacity onPress={() => Linking.openURL(article.url)}>
        <Text style={styles.link}>Read full article</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  meta: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
  link: {
    color: 'blue',
    fontSize: 15,
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});
