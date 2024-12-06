import * as SQLite from 'expo-sqlite';

// 打开或创建数据库文件
const db = SQLite.openDatabase("app.db");

// 初始化数据库
export const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        value TEXT
      );`
    );
  });
};

// 执行查询函数
export const executeQuery = (query: string, params: any[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        params,
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export default db;
