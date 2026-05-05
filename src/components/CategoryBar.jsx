const sortOptions = [
  { label: 'Latest', value: 'latest' },
  { label: 'Popular', value: 'mostViewed' },
  { label: 'Liked', value: 'mostLiked' },
  { label: 'Oldest', value: 'oldest' },
];

const categories = [
  'All', 'Music', 'Gaming', 'Mixes', 'Live', 'Comedy', 
  'Programming', 'React JS', 'Modern UI', 'Lo-fi'
];

const CategoryBar = ({ onSortChange, currentSort }) => {
  return (
    <div className="sticky top-0 bg-bg py-3 z-100 w-full">
      <div className="flex gap-3 overflow-x-auto px-1 no-scrollbar">
        {sortOptions.map((option) => (
          <button 
            key={option.value} 
            onClick={() => onSortChange(option.value)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${currentSort === option.value ? 'bg-text-primary text-bg' : 'bg-surface text-text-primary hover:bg-surface-hover'}`}
          >
            {option.label}
          </button>
        ))}
        <div className="w-[1px] h-6 bg-border mx-1 self-center" />
        {categories.map((category, index) => (
          <button 
            key={index} 
            className="px-3 py-1.5 rounded-lg whitespace-nowrap text-sm font-medium bg-surface text-text-primary hover:bg-surface-hover transition-colors"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
