import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Bookmark } from '@/hooks/types';

interface BookmarkListProps {
  bookmarks: Bookmark[];
  onPress: (bookmark: Bookmark) => void;
}

const ItemContainer = styled.TouchableOpacity`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  background-color: #fff;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const Url = styled.Text`
  color: #666;
  font-size: 14px;
`;

const BookmarkItem: React.FC<{ bookmark: Bookmark; onPress: () => void }> = ({
  bookmark,
  onPress,
}) => (
  <ItemContainer onPress={onPress}>
    <Title>{bookmark.title}</Title>
    <Url>{bookmark.url}</Url>
  </ItemContainer>
);

export const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks, onPress }) => {
  return (
    <FlatList
      data={bookmarks}
      keyExtractor={item => item.id?.toString() || item.url}
      renderItem={({ item }) => (
        <BookmarkItem bookmark={item} onPress={() => onPress(item)} />
      )}
    />
  );
};