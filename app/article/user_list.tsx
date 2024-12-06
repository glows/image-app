// components/UserManager.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useDB } from '@/hooks/useDatabase';
import DatabaseDevTools from '@/components/__dev__/DatabaseDevTools';

// 用户接口定义
interface User {
  id?: number;
  username: string;
  email: string;
  created_at?: number;
}

export default function UserManager() {
  const { isReady, createItem, getItems, updateItem, deleteItem } = useDB();
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 加载用户列表
  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const result = await getItems<User>('users');
      if (result.success && result.data) {
        setUsers(result.data);
      } else {
        setError('Failed to load users');
      }
    } catch (err) {
      setError('Error loading users');
    } finally {
      setIsLoading(false);
    }
  };

  // 初始化加载
  useEffect(() => {
    if (isReady) {
      loadUsers();
    }
  }, [isReady]);

  // 添加用户
  const handleAddUser = async () => {
    if (!username.trim() || !email.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const result = await createItem<User>('users', {
        username: username.trim(),
        email: email.trim()
      });

      if (result.success) {
        await loadUsers();
        setUsername('');
        setEmail('');
        setError(null);
      } else {
        setError('Failed to add user');
      }
    } catch (err) {
      setError('Error adding user');
    }
  };

  // 更新用户
  const handleUpdateUser = async (user: User) => {
    try {
      if (!user.id) return;
      
      const result = await updateItem<User>(
        'users',
        user.id,
        { username: `${user.username}_updated` }
      );

      if (result.success) {
        await loadUsers();
      } else {
        setError('Failed to update user');
      }
    } catch (err) {
      setError('Error updating user');
    }
  };

  // 删除用户
  const handleDeleteUser = async (userId: number) => {
    try {
      const result = await deleteItem('users', userId);
      if (result.success) {
        await loadUsers();
      } else {
        setError('Failed to delete user');
      }
    } catch (err) {
      setError('Error deleting user');
    }
  };

  if (!isReady || isLoading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Button title="Add User" onPress={handleAddUser} />
      </View>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <FlatList
        data={users}
        keyExtractor={(item) => item.id?.toString() || ''}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <View style={styles.userInfo}>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Update"
                onPress={() => handleUpdateUser(item)}
              />
              <View style={styles.buttonSpacer} />
              <Button
                title="Delete"
                onPress={() => item.id && handleDeleteUser(item.id)}
                color="red"
              />
            </View>
          </View>
        )}
      />
       {__DEV__ && <DatabaseDevTools />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    top: 50,
    backgroundColor: '#f0f0f0'
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    marginBottom: 16
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8
  },
  userItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 8
  },
  userInfo: {
    marginBottom: 8
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  email: {
    fontSize: 14,
    color: '#666'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  buttonSpacer: {
    width: 8
  },
  errorText: {
    color: 'red',
    marginBottom: 16
  }
});