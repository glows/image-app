// components/DatabaseProvider.tsx
import React from 'react';
import { SQLiteProvider } from 'expo-sqlite';
import { DATABASE_NAME, initDatabase } from '@/hooks/useDatabase';

interface DatabaseProviderProps {
  children: React.ReactNode;
}

export function DatabaseProvider({ children }: DatabaseProviderProps) {
  return (
    <SQLiteProvider 
      databaseName={DATABASE_NAME} 
      onInit={initDatabase}
      useSuspense
    >
      {children}
    </SQLiteProvider>
  );
}