import React from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #FFF;
  border-bottom-width: 1px;
  border-bottom-color: #E5E5E5;
`;

const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SettingsButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: #F5F5F5;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

const IconButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const Header = ({ onAddPress }) => (
  <HeaderContainer>
    <HeaderLeft>
      <SettingsButton>
        <Feather name="settings" size={24} color="#666" />
      </SettingsButton>
      <HeaderTitle>Queue</HeaderTitle>
    </HeaderLeft>
    <IconButton onPress={onAddPress}>
      <Feather name="plus" size={24} color="#000" />
    </IconButton>
  </HeaderContainer>
);