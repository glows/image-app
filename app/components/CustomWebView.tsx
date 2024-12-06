import React, { useRef, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';

interface CustomWebViewProps {
  url: string;
  onTitleChange: (title: string) => void;
}

const Container = styled.View`
  flex: 1;
`;

export const CustomWebView: React.FC<CustomWebViewProps> = ({ url, onTitleChange }) => {
  const webViewRef = useRef<WebView>(null);

  return (
    <Container>
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        onNavigationStateChange={navState => {
          if (navState.title) {
            onTitleChange(navState.title);
          }
        }}
      />
    </Container>
  );
};