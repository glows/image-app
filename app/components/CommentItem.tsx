import React from 'react';
import styled from 'styled-components/native';
import { Comment } from './storyTypes';
// import { formatDistanceToNow } from 'date-fns';
// import HTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

interface Props {
  comment: Comment;
  level?: number;
}

const CommentItem: React.FC<Props> = ({ comment, level = 0 }) => {
  const { width } = useWindowDimensions();
  
  return (
    <CommentContainer level={level}>
      <CommentMeta>
        <MetaText>{comment.by}</MetaText>
        <MetaText>
          {/* {formatDistanceToNow(comment.time * 1000, { addSuffix: true })} */}
        </MetaText>
      </CommentMeta>
      <CommentContent>
        {/* <HTML source={{ html: comment.text }} contentWidth={width - 32 - (level * 16)} /> */}
      </CommentContent>
    </CommentContainer>
  );
};

const CommentContainer = styled.View<{ level: number }>`
  padding: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  margin-left: ${({ level }) => level * 16}px;
`;

const CommentMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const MetaText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.subText};
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const CommentContent = styled.View``;

export default CommentItem;