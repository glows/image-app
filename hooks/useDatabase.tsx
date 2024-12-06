// hooks/useDatabase.ts
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

// 定义基础模型接口
export interface BaseModel {
  id?: number;
  created_at?: number;
}

// 数据库配置常量
export const DATABASE_NAME = 'app-database.db';
export const DATABASE_VERSION = 1;

// 初始化数据库
export async function initDatabase(db: SQLite.SQLiteDatabase) {
  // 获取当前数据库版本
  const { user_version: currentVersion } = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );

  // 如果已经是最新版本，直接返回
  if (currentVersion >= DATABASE_VERSION) {
    return;
  }

  // 开启 WAL 模式以提升性能
  await db.execAsync(`PRAGMA journal_mode = 'wal';`);

  // 版本 0 到 1 的迁移
  if (currentVersion === 0) {
    // 创建表
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT,
        created_at INTEGER DEFAULT (strftime('%s', 'now'))
      );

      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT UNIQUE NOT NULL,
        value TEXT NOT NULL,
        created_at INTEGER DEFAULT (strftime('%s', 'now'))
      );
    `);

    // 可以在这里添加一些初始数据
    await db.runAsync(
      'INSERT INTO settings (key, value) VALUES (?, ?)',
      'theme',
      'light'
    );
  }

  // 更新数据库版本
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

// 自定义 Hook 用于数据库操作
export function useDB() {
  const db = useSQLiteContext();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  // 通用 CRUD 操作
  const createItem = async <T extends object>(
    table: string,
    data: Partial<T>
  ) => {
    try {
      const keys = Object.keys(data);
      const values = Object.values(data);
      const placeholders = keys.map(() => '?').join(',');
      
      const result = await db.runAsync(
        `INSERT INTO ${table} (${keys.join(',')}) VALUES (${placeholders})`,
        ...values
      );
      
      return {
        success: true,
        id: result.lastInsertRowId,
        changes: result.changes
      };
    } catch (error) {
      console.error(`Error creating item in ${table}:`, error);
      return { success: false, error };
    }
  };

  const getItems = async <T extends object>(
    table: string,
    where?: { condition: string; params: any[] }
  ) => {
    try {
      let query = `SELECT * FROM ${table}`;
      if (where) {
        query += ` WHERE ${where.condition}`;
      }
      
      const items = await db.getAllAsync<T>(query, where?.params);
      return { success: true, data: items };
    } catch (error) {
      console.error(`Error getting items from ${table}:`, error);
      return { success: false, error };
    }
  };

  const getItemById = async <T extends object>(
    table: string,
    id: number
  ) => {
    try {
      const item = await db.getFirstAsync<T>(
        `SELECT * FROM ${table} WHERE id = ?`,
        id
      );
      return { success: true, data: item };
    } catch (error) {
      console.error(`Error getting item from ${table}:`, error);
      return { success: false, error };
    }
  };

  const updateItem = async <T extends object>(
    table: string,
    id: number,
    data: Partial<T>
  ) => {
    try {
      const sets = Object.keys(data)
        .map(key => `${key} = ?`)
        .join(',');
      const values = [...Object.values(data), id];

      const result = await db.runAsync(
        `UPDATE ${table} SET ${sets} WHERE id = ?`,
        ...values
      );
      
      return {
        success: true,
        changes: result.changes
      };
    } catch (error) {
      console.error(`Error updating item in ${table}:`, error);
      return { success: false, error };
    }
  };

  const deleteItem = async (table: string, id: number) => {
    try {
      const result = await db.runAsync(
        `DELETE FROM ${table} WHERE id = ?`,
        id
      );
      
      return {
        success: true,
        changes: result.changes
      };
    } catch (error) {
      console.error(`Error deleting item from ${table}:`, error);
      return { success: false, error };
    }
  };

  // 事务处理
  const withTransaction = async (callback: () => Promise<void>) => {
    try {
      await db.withTransactionAsync(async () => {
        await callback();
      });
      return { success: true };
    } catch (error) {
      console.error('Transaction error:', error);
      return { success: false, error };
    }
  };

  return {
    isReady,
    db,
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
    withTransaction,
  };
}