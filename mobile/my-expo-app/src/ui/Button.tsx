import { Text, TouchableOpacity, View } from 'react-native';
import { cn } from '../lib/utils';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
};

export function Button({ title, onPress, variant = 'primary', className = '' }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(
        'px-4 py-2 rounded-lg',
        variant === 'primary' ? 'bg-primary text-white' : 'bg-secondary text-white',
        className
      )}
    >
      <Text className="text-center font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}
