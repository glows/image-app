import styled from 'styled-components/native';
import { Story } from './storyTypes';
// import { formatDistanceToNow } from 'date-fns';

interface Props {
  story: Story;
  onPress: () => void;
}

const StoryItem: React.FC<Props> = ({ story, onPress }) => {
  return (
    <StoryContainer onPress={onPress}>
      <StoryTitle>{story.title}</StoryTitle>
      <StoryMeta>
        <MetaText>{story.score} points</MetaText>
        <MetaText>by {story.by}</MetaText>
        <MetaText>
          {/* {formatDistanceToNow(story.time * 1000, { addSuffix: true })} */}
        </MetaText>
        <MetaText>{story.descendants || 0} comments</MetaText>
      </StoryMeta>
    </StoryContainer>
  );
};

const StoryContainer = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
`;

const StoryTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
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

export default StoryItem;