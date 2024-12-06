import React, { useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { Platform, Modal, KeyboardAvoidingView } from 'react-native';

// Define the props interface
interface AddUrlModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  url: string;
  setUrl: (url: string) => void;
}

const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ModalContent = styled.View`
  flex: 1;
  width: 90%;
  max-height: 20%;
  background-color: #FFF;
  border-radius: 16px;
  padding: 16px;
  padding-bottom: ${Platform.OS === 'ios' ? '34px' : '16px'};
  align-items: center;
  justify-content: center;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

const CloseButton = styled.TouchableOpacity`
  padding: 4px;
`;

const UrlInput = styled.TextInput`
  min-width: 100%;
  height: 44px;
  border-width: 1px;
  border-color: #E5E5E5;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 16px;
  margin-bottom: 16px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const Button = styled.TouchableOpacity`
  padding: 8px 16px;
  border-radius: 8px;
  margin-left: 8px;
  background-color: ${props => props.variant === 'primary' ? '#2563EB' : '#F5F5F5'};
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: ${props => props.variant === 'primary' ? '#FFF' : '#666'};
`;

export const AddUrlModal: React.FC<AddUrlModalProps> = ({ visible, onClose, onSubmit, url, setUrl }) => {
  const urlInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible && urlInputRef.current) {
      urlInputRef.current.focus();
    }
  }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <ModalOverlay>
        <ModalContent>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <ModalHeader>
              <ModalTitle>Add URL</ModalTitle>
              <CloseButton onPress={onClose}>
                {/* Close button content */}
              </CloseButton>
            </ModalHeader>
            <UrlInput
              ref={urlInputRef}
              value={url}
              onChangeText={setUrl}
              placeholder="Enter URL"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
            />
            <ButtonContainer>
              <Button onPress={onClose}>
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button variant="primary" onPress={onSubmit}>
                <ButtonText variant="primary">Add</ButtonText>
              </Button>
            </ButtonContainer>
          </KeyboardAvoidingView>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};