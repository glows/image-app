import React from 'react';
import styled from 'styled-components/native';

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #E5E5E5;
  background-color: #FFF;
`;

const IconContainer = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  background-color: ${props => props.bgColor};
`;

const IconText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.color};
`;

const Content = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
  color: #1F2937;
`;

const MetaContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MetaText = styled.Text`
  font-size: 14px;
  color: #666;
`;

const MetaDot = styled.Text`
  font-size: 14px;
  color: #666;
  margin: 0 4px;
`;

export const ArticleItem = ({ article, onPress }) => (
  <ItemContainer onPress={onPress}>
    <IconContainer bgColor={article.iconBg}>
      <IconText color={article.iconColor}>{article.icon}</IconText>
    </IconContainer>
    <Content>
      <Title numberOfLines={2}>{article.title}</Title>
      <MetaContainer>
        <MetaText>{article.source}</MetaText>
        <MetaDot>·</MetaDot>
        <MetaText>{article.time}</MetaText>
        <MetaDot>·</MetaDot>
        <MetaText>{article.duration}</MetaText>
      </MetaContainer>
    </Content>
  </ItemContainer>
);