interface FallbackImageProps {
  category: 'childhood' | 'teenage' | 'adult';
  size?: 'small' | 'medium' | 'large';
}

export default function FallbackImage({ category, size = 'medium' }: FallbackImageProps) {
  const getSize = () => {
    switch (size) {
      case 'small': return 'w-16 h-16';
      case 'large': return 'w-64 h-64';
      default: return 'w-32 h-32';
    }
  };

  const getGradient = () => {
    switch (category) {
      case 'childhood':
        return 'bg-gradient-to-br from-blue-500/30 to-purple-500/30';
      case 'teenage':
        return 'bg-gradient-to-br from-purple-500/30 to-rose-500/30';
      default:
        return 'bg-gradient-to-br from-rose-500/30 to-phoenix-red/30';
    }
  };

  const getIcon = () => {
    switch (category) {
      case 'childhood': return '👶';
      case 'teenage': return '🎨';
      default: return '🌟';
    }
  };

  const getText = () => {
    switch (category) {
      case 'childhood': return 'Детство';
      case 'teenage': return 'Отрочество';
      default: return 'Современность';
    }
  };

  return (
    <div className={`${getSize()} ${getGradient()} rounded-2xl flex flex-col items-center justify-center`}>
      <span className="text-3xl mb-2 opacity-70">{getIcon()}</span>
      <span className="text-xs opacity-50">{getText()}</span>
    </div>
  );
}