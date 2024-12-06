// hooks/useBookmarks.ts
import { useDB } from './useDatabase';
// import { Bookmark } from './types/bookmark';
import { useCallback } from 'react';

const TABLE_NAME = 'bookmarks';

export interface Bookmark {
  id?: number;
  title: string;
  url: string;
  createdAt: string;
}

export function useBookmarks() {
  const { isReady, createItem, getItems, updateItem, deleteItem, withTransaction, db } = useDB();

  // 初始化书签表
  const initBookmarksTable = useCallback(async () => {
    if (!isReady) return;

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        favicon TEXT,
        created_at INTEGER DEFAULT (strftime('%s', 'now'))
      );
      CREATE INDEX IF NOT EXISTS idx_bookmarks_url ON ${TABLE_NAME}(url);
    `);
  }, [isReady, db]);

  // 添加书签
  const addBookmark = useCallback(async (bookmark: Omit<Bookmark, 'id' | 'created_at'>) => {
    if (!isReady) return { success: false, error: 'Database not ready' };
    
    // 检查是否已存在相同 URL
    const existing = await getItems<Bookmark>(TABLE_NAME, {
      condition: 'url = ?',
      params: [bookmark.url]
    });

    if (existing.success && existing.data.length > 0) {
      // 更新现有书签
      return updateItem(TABLE_NAME, existing.data[0].id!, bookmark);
    }

    // 创建新书签
    return createItem<Bookmark>(TABLE_NAME, bookmark);
  }, [isReady, createItem, getItems, updateItem]);

  // 获取所有书签
  const getAllBookmarks = useCallback(async () => {
    if (!isReady) return { success: false, error: 'Database not ready' };
    
    return getItems<Bookmark>(TABLE_NAME);
  }, [isReady, getItems]);

  // 删除书签
  const removeBookmark = useCallback(async (id: number) => {
    if (!isReady) return { success: false, error: 'Database not ready' };
    
    return deleteItem(TABLE_NAME, id);
  }, [isReady, deleteItem]);

  // 按 URL 搜索书签
  const searchBookmarks = useCallback(async (searchTerm: string) => {
    if (!isReady) return { success: false, error: 'Database not ready' };
    
    return getItems<Bookmark>(TABLE_NAME, {
      condition: 'url LIKE ? OR title LIKE ?',
      params: [`%${searchTerm}%`, `%${searchTerm}%`]
    });
  }, [isReady, getItems]);

  return {
    isReady,
    initBookmarksTable,
    addBookmark,
    getAllBookmarks,
    removeBookmark,
    searchBookmarks
  };
}