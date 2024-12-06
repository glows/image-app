import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { articles } from './data'; // Move sample data to separate file
import { Container } from './components/Container';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { ArticleItem } from './components/ArticleItem';
import { AddUrlModal } from './components/AddUrlModal';
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';

const ArticleList = styled.FlatList`
  background-color: #FFF;
`;

const Queue = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    console.log('Submitted URL:', url);
    setUrl('');
    setModalVisible(false);
  };

  const handleArticlePress = (article) => {
    console.log('Article pressed:', article.id);
    router.push(`/article`)
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Header onAddPress={() => setModalVisible(true)} />
      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ArticleList
        data={articles}
        renderItem={({ item }) => (
          <ArticleItem 
            article={item} 
            onPress={() => handleArticlePress(item)}
          />
        )}
        keyExtractor={item => item.id}
      />
      <AddUrlModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        url={url}
        setUrl={setUrl}
      />
    </Container>
  );
};

export default Queue;