import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from "styled-components/native";
import { fetchTopStories, fetchStory } from '@/scripts/api/hackerNewsApi';
import StoryItem from '../components/StoryItem';
import { Story } from '@/app/components/storyTypes';
import { useRouter } from 'expo-router';


const HomeScreen = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      const storyIds = await fetchTopStories();
      const loadedStories = await Promise.all(
        storyIds.slice(0, 30).map(id => fetchStory(id))
      );
      setStories(loadedStories);
    } catch (error) {
      console.error('Error loading stories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#ff6600" />
      </LoadingContainer>
    );
  }

  const onStoryItemPress = (item: any) => {
    console.log('Story pressed!');
    console.log('Navigating to Story with ID:', item);
    router.push(`/Story`)

  };

  return (
    <Container>
      <FlatList
        data={stories}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <StoryItem
            story={item}
            onPress={() => onStoryItemPress(item)}
          />
        )}
        refreshing={loading}
        onRefresh={loadStories}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default HomeScreen;