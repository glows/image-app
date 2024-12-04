import React, { useState } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

// Styled Components
const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #f5f5f5;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #000;
`;

const IconButton = styled(TouchableOpacity)`
  padding: 8px;
`;

const MessagesContainer = styled.ScrollView`
  flex: 1;
  padding: 0 16px;
`;

const MessageRow = styled.View`
  flex-direction: row;
  justify-content: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  margin: 4px 0;
`;

const MessageBubble = styled.View`
  max-width: 80%;
  padding: 12px;
  border-radius: 16px;
  background-color: ${props => props.isUser ? '#007AFF' : '#E9E9EB'};
  ${props => props.isUser 
    ? 'border-top-right-radius: 4px;' 
    : 'border-top-left-radius: 4px;'}
`;

const MessageText = styled.Text`
  font-size: 16px;
  color: ${props => props.isUser ? '#fff' : '#000'};
  line-height: 20px;
`;

const TimeStamp = styled.Text`
  font-size: 12px;
  margin-top: 4px;
  color: ${props => props.isUser ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)'};
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background-color: #fff;
  border-top-width: 1px;
  border-top-color: #eee;
`;

const Input = styled.TextInput`
  flex: 1;
  height: 40px;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 0 16px;
  margin-right: 8px;
  font-size: 16px;
  color: #000;
`;

const SendButton = styled(TouchableOpacity)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #007AFF;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
`;

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome back! Let's be creative!",
      type: 'system',
      timestamp: '19:14'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleSend = async () => {
    if (inputText.trim()) {
      // Add user message
      const userMessage = {
        id: messages.length + 1,
        text: inputText,
        type: 'user',
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        })
      };
      setMessages([...messages, userMessage]);

      // Call the API to generate the image
      const imageUrl = await generateImage(inputText);
      setGeneratedImage(imageUrl);
      setInputText('');
    }
  };

  const generateImage = async (prompt: string): Promise<string> => {
    // Replace with your actual API call
    const response = await fetch('https://your-api-endpoint/generateImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    return data.imageUrl; // Adjust based on your API response structure
  };

  return (
    <Container>
      <Header>
        <IconButton>
          <Icon name="chevron-left" size={24} color="#000" />
        </IconButton>
        <HeaderTitle>Image Journey</HeaderTitle>
        <IconButton>
          <Icon name="more-vertical" size={24} color="#000" />
        </IconButton>
      </Header>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        style={{ flex: 1 }}
      >
        <MessagesContainer>
          {messages.map((message) => (
            <MessageRow key={message.id} isUser={message.type === 'user'}>
              <MessageBubble isUser={message.type === 'user'}>
                <MessageText isUser={message.type === 'user'}>
                  {message.text}
                </MessageText>
                <TimeStamp isUser={message.type === 'user'}>
                  {message.timestamp}
                </TimeStamp>
              </MessageBubble>
            </MessageRow>
          ))}
          {generatedImage && (
            <MessageRow isUser={false}>
              <Image
                source={{ uri: generatedImage }}
                style={{ width: 200, height: 200, borderRadius: 10, margin: 4 }}
              />
            </MessageRow>
          )}
        </MessagesContainer>

        <InputContainer>
          <Input
            value={inputText}
            onChangeText={setInputText}
            placeholder="What would you like to create?"
            placeholderTextColor="#666"
          />
          <SendButton onPress={handleSend}>
            <Icon name="send" size={20} color="#fff" />
          </SendButton>
        </InputContainer>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default ChatScreen;