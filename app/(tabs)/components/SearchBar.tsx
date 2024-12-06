import React from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

const SearchContainer = styled.View`
  padding: 16px;
  background-color: #FFF;
  flex-direction: row;
  align-items: center;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  height: 40px;
  background-color: #F5F5F5;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 16px;
  padding-left: 44px;
`;

const SearchIconContainer = styled.View`
  position: absolute;
  left: 28px;
  top: 26px;
  z-index: 1;
`;

export const SearchBar = ({ value, onChangeText }) => (
  <SearchContainer>
    <SearchIconContainer>
      <Feather name="search" size={20} color="#666" />
    </SearchIconContainer>
    <SearchInput
      placeholder="Search"
      placeholderTextColor="#666"
      value={value}
      onChangeText={onChangeText}
    />
  </SearchContainer>
);