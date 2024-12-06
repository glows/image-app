import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from "styled-components/native";
import { fetchTopStories, fetchStory } from '@/scripts/api/hackerNewsApi';
import StoryItem from '../components/StoryItem';
import { Story } from '@/app/components/storyTypes';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

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

  return (
    <Container>
      <FlatList
        data={stories}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <StoryItem
            story={item}
            onPress={() => navigation.navigate('Story', { story: item })}
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