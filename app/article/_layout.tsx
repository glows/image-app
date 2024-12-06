import { Stack } from 'expo-router';

export default function ArticleLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 这里的 Stack 会应用于 article 下所有页面 */}
    </Stack>
  );
}
