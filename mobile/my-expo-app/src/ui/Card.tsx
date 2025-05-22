import { View, Text } from 'react-native';
import { cn } from '../lib/utils';

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <View className={cn('bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-md', className)}>
      {children}
    </View>
  );
}
