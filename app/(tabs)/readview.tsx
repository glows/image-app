import React, { useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import styled from 'styled-components/native';
import { ChevronLeft, Star, MoreHorizontal, Share2, Trash2 } from 'lucide-react-native';

const HEADER_HEIGHT = 60;
const { width } = Dimensions.get('window');

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: #fff9f9;
`;

const Header = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${HEADER_HEIGHT}px;
  background-color: #fff9f9;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 1000;
`;

const HeaderButton = styled.TouchableOpacity`
  padding: 8px;
`;

const HeaderRight = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Content = styled.View`
  padding: 16px;
  padding-top: ${HEADER_HEIGHT + 16}px;
`;

const Website = styled.Text`
  font-size: 14px;
  color: #666;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #000;
  margin-bottom: 16px;
  line-height: 40px;
`;

const AuthorInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

const AuthorText = styled.Text`
  font-size: 16px;
  color: #666;
`;

const Dot = styled.Text`
  font-size: 16px;
  color: #666;
  margin: 0 8px;
`;

const ArticleImage = styled.Image`
  width: ${width - 32}px;
  height: ${width - 32}px;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const ArticleText = styled.Text`
  font-size: 18px;
  color: #333;
  line-height: 28px;
  margin-bottom: 24px;
`;

const BottomBar = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 16px;
  border-top-width: 1px;
  border-top-color: #eee;
  background-color: #fff9f9;
`;

const BottomButton = styled.TouchableOpacity`
  align-items: center;
`;

const ArticlePage = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Header style={{ opacity: headerOpacity }}>
        <HeaderButton>
          <ChevronLeft size={24} color="#000" />
        </HeaderButton>
        <HeaderRight>
          <HeaderButton>
            <Star size={24} color="#000" />
          </HeaderButton>
          <HeaderButton>
            <MoreHorizontal size={24} color="#000" />
          </HeaderButton>
        </HeaderRight>
      </Header>

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <Content>
          <Website>CATONMAT.NET</Website>
          <Title>Using Fibonacci Numbers to Convert from Miles to Kilometers and Vice Versa</Title>
          <AuthorInfo>
            <AuthorText>thunderbong</AuthorText>
            <Dot>•</Dot>
            <AuthorText>13 Nov 2022</AuthorText>
            <Dot>•</Dot>
            <AuthorText>2 min</AuthorText>
          </AuthorInfo>

          <ArticleImage 
            source={{ uri: '/api/placeholder/400/400' }}
            resizeMode="cover"
          />

          <ArticleText>
            I recently learned an interesting fact about Fibonacci numbers while watching a random number theory video lecture. The Fibonacci sequence appears in many unexpected places in nature, and one of its fascinating applications is in quick mental math conversions between miles and kilometers.
          </ArticleText>

          <ArticleText>
            The Fibonacci sequence (1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...) has an interesting property: consecutive numbers in the sequence can be used to approximate the conversion between miles and kilometers.
          </ArticleText>
        </Content>
      </Animated.ScrollView>

      <BottomBar>
        <BottomButton>
          <Share2 size={24} color="#666" />
        </BottomButton>
        <BottomButton>
          <Trash2 size={24} color="#666" />
        </BottomButton>
      </BottomBar>
    </Container>
  );
};

export default ArticlePage;