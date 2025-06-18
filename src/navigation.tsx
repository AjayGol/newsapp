import React from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './screens/HomeScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import DetailScreen from './screens/DetailScreen';

// ✅ Inline Article type
export interface Article {
  id: number;
  title: string;
  summary: string;
  image_url: string;
  url: string;
  news_site?: string;
  published_at?: string;
}

// ✅ Tab and Stack type definitions
type BottomTabParamList = {
  Home: undefined;
  Bookmarks: undefined;
};

type RootStackParamList = {
  Main: NavigatorScreenParams<BottomTabParamList>;
  Detail: { article: Article };
};

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={BookmarkScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="bookmark" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: 'Article Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
