import { Users } from 'lucide-react';

interface ClientCardProps {
  title: string;
  count: number;
  icon?: React.ElementType;
  iconBgColor?: string;
}

const EDashBoardCard: React.FC<ClientCardProps> = ({
  title,
  count,
  icon: Icon = Users,
  iconBgColor = 'bg-teal-100 dark:bg-teal-700',
}) => {
  return (
    <div className="flex items-center gap-4 bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 sm:p-5 w-full hover:shadow-lg transition-all">
      <div className={`${iconBgColor} text-teal-800 dark:text-white p-2.5 sm:p-3 rounded-full`}>
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <div>
        <h2 className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300">
          {title}
        </h2>
        <p className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-100">
          {count}
        </p>
      </div>
    </div>
  );
};

export default EDashBoardCard;
