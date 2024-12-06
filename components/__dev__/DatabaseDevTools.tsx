// components/__dev__/DatabaseDevTools.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useDB } from '../../hooks/useDatabase';

export default function DatabaseDevTools() {
  // 只在开发模式下显示
  if (!__DEV__) {
    return null;
  }

  const { db } = useDB();
  const [dbInfo, setDbInfo] = useState<any>(null);

  useEffect(() => {
    checkDatabase();
  }, []);

  const checkDatabase = async () => {
    try {
      const dbPath = `${FileSystem.documentDirectory}SQLite/`;
      const info = await FileSystem.getInfoAsync(dbPath);
      
      // 获取数据库文件列表
      if (info.exists) {
        const files = await FileSystem.readDirectoryAsync(dbPath);
        console.log('Database files:', files);
      }

      setDbInfo({
        path: dbPath,
        exists: info.exists,
        size: info.size,
      });
    } catch (error) {
      console.error('Error checking database:', error);
    }
  };

  // 简单的数据查看功能
  const checkTables = async () => {
    try {
      const result = await db.getAllAsync(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
      );
      console.log('Tables in database:', result);
    } catch (error) {
      console.error('Error checking tables:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Database Dev Tools</Text>
      
      <View style={styles.infoContainer}>
        <Text>Database Path:</Text>
        <Text style={styles.path}>{dbInfo?.path}</Text>
        <Text>Exists: {dbInfo?.exists ? 'Yes' : 'No'}</Text>
        {dbInfo?.size && (
          <Text>Size: {(dbInfo.size / 1024).toFixed(2)} KB</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Refresh Info" onPress={checkDatabase} />
        <Button title="Check Tables" onPress={checkTables} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    margin: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoContainer: {
    marginBottom: 16,
  },
  path: {
    fontSize: 12,
    color: '#666',
    marginVertical: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});