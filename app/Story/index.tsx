import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, Linking } from 'react-native';
import styled from 'styled-components/native';
import { fetchComment } from '@/scripts/api/hackerNewsApi';
import CommentItem from '../components/CommentItem';
import { Story, Comment } from '../components/storyTypes';
import { useRoute } from '@react-navigation/native';

const StoryScreen = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { story } = route.params as { story: Story };

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      if (story.kids) {
        const loadedComments = await Promise.all(
          story.kids.slice(0, 20).map(id => fetchComment(id))
        );
        setComments(loadedComments);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlPress = () => {
    if (story.url) {
      Linking.openURL(story.url);
    }
  };

  return (
    <Container>
      <ScrollView>
        <StoryContainer>
          <StoryTitle>{story.title}</StoryTitle>
          {story.url && (
            <StoryUrl onPress={handleUrlPress}>{story.url}</StoryUrl>
          )}
          <StoryMeta>
            <MetaText>{story.score} points</MetaText>
            <MetaText>by {story.by}</MetaText>
            <MetaText>{story.descendants || 0} comments</MetaText>
          </StoryMeta>
        </StoryContainer>

        {loading ? (
          <LoadingContainer>
            <ActivityIndicator size="large" color="#ff6600" />
          </LoadingContainer>
        ) : (
          comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const StoryContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

const StoryTitle = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const StoryUrl = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const StoryMeta = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MetaText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.subText};
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const LoadingContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.xl}px;
`;

export default StoryScreen;