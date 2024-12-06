// types/database.ts

// 数据库操作结果接口
export interface DBResultSet {
    insertId?: number;
    rowsAffected: number;
    rows: {
      length: number;
      _array: any[];
      item(index: number): any;
    };
  }
  
  // 数据库事务接口
  export interface DBTransaction {
    executeSql(
      sqlStatement: string,
      args?: any[],
      success?: (transaction: DBTransaction, resultSet: DBResultSet) => void,
      error?: (transaction: DBTransaction, error: Error) => void
    ): void;
  }
  
  // 数据库接口
  export interface Database {
    transaction(
      callback: (transaction: DBTransaction) => void,
      error?: (error: Error) => void,
      success?: () => void
    ): void;
  }
  
  // 基础模型接口
  export interface BaseModel {
    id?: number;
    created_at?: number;
  }
  
  // 用户模型接口
  export interface User extends BaseModel {
    username: string;
    email?: string;
  }
  
  // 数据库查询选项接口
  export interface QueryOptions {
    limit?: number;
    offset?: number;
    orderBy?: string;
  }
  
  // 数据库操作结果
  export type DBOperationResult<T> = {
    success: boolean;
    data?: T;
    error?: Error;
  };