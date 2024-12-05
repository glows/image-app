import React from "react";
import { FlatList, Image, StyleSheet, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from '@/components/ui/IconSymbol';

// Styled Components
// const Container = styled.ScrollView`
//   flex: 1;
//   background-color: #ffffff;
// `;

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #f5f5f5;
`;

const ContentContainer = styled.View`
  padding: 16px;
`;

const GoalCard = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 24px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 3;
`;

const GoalCircle = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border-width: 2px;
  border-color: #e0e0e0;
  margin-right: 12px;
`;

const GoalContent = styled.View`
  flex: 1;
`;

const GoalLabel = styled.Text`
  color: #666;
  font-size: 14px;
`;

const GoalText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #000;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 16px;
`;

const SectionTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #000;
`;

const MoreButton = styled.Text`
  font-size: 20px;
  color: #666;
`;

const ArticleCard = styled.TouchableOpacity`
  width: 300px;
  margin-right: 16px;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const ArticleImage = styled.Image`
  width: 100%;
  height: 160px;
`;

const ArticleContent = styled.View`
  padding: 12px;
`;

const ArticleAuthor = styled.Text`
  color: #666;
  font-size: 14px;
  margin-bottom: 4px;
`;

const ArticleTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #000;
`;

const TopPicksSection = styled.View`
  margin-top: 24px;
`;

const TopPickCard = styled.TouchableOpacity`
  width: 300px;
  margin-right: 16px;
`;

const TopPickTitle = styled.Text`
  font-size: 18px;
  color: #666;
  margin-bottom: 8px;
  padding: 0 16px;
`;

const TopPickImage = styled.Image`
  width: 300px;
  height: 200px;
  border-radius: 12px;
`;

const ReadingApp = () => {
  const inboxArticles = [
    {
      id: "1",
      author: "Tyler Cowen",
      title: "The end of oil?",
      image: "/api/placeholder/300/160",
    },
    {
      id: "2",
      author: "Heather Cox Richardson",
      title: "December 3, 2024",
      image: "/api/placeholder/300/160",
    },
    {
      id: "3",
      author: "Sam Altman",
      title: "Building the Future",
      image: "/api/placeholder/300/160",
    },
  ];

  const topPicks = [
    {
      id: "1",
      title: "Narrative Violation",
      image: "/api/placeholder/300/200",
    },
    {
      id: "2",
      title: "Becoming a Jedi",
      image: "/api/placeholder/300/200",
    },
  ];

  const renderArticleCard = ({ item }) => (
    <ArticleCard>
      <ArticleImage source={{ uri: item.image }} resizeMode="cover" />
      <ArticleContent>
        <ArticleAuthor>{item.author}</ArticleAuthor>
        <ArticleTitle>{item.title}</ArticleTitle>
      </ArticleContent>
    </ArticleCard>
  );

  const renderTopPick = ({ item }) => (
    <TopPickCard>
      <TopPickImage source={{ uri: item.image }} resizeMode="cover" />
    </TopPickCard>
  );

  return (
    <Container
    >
      <Container>
        <ContentContainer>
          <GoalCard>
            <GoalCircle />
            <GoalContent>
              <GoalLabel>Today's Goal</GoalLabel>
              <GoalText>Read 5 minutes</GoalText>
            </GoalContent>
          </GoalCard>
        </ContentContainer>

        <SectionHeader>
          <SectionTitle>Inbox</SectionTitle>
          <MoreButton>•••</MoreButton>
        </SectionHeader>

        <FlatList
          data={inboxArticles}
          renderItem={renderArticleCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />

        <TopPicksSection>
          <SectionTitle style={{ paddingHorizontal: 16, marginBottom: 16 }}>
            Top Picks
          </SectionTitle>
          <TopPickTitle>Narrative Violation</TopPickTitle>
          <FlatList
            data={topPicks}
            renderItem={renderTopPick}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        </TopPicksSection>
      </Container>
    </Container>
  );
};

export default ReadingApp;

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
