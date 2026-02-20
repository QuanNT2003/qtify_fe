interface CategoryCardProps {
  title: string;
  color: string;
}

export function CategoryCard({ title, color }: CategoryCardProps) {
  return (
    <div
      className={`relative aspect-3/2 overflow-hidden rounded-lg p-4 transition-transform hover:scale-[1.02] cursor-pointer`}
      style={{ backgroundColor: color }}
    >
      <span className="text-xl font-bold text-white tracking-tight">
        {title}
      </span>
      <div className="absolute -bottom-2 -right-2 h-20 w-20 rotate-12 rounded bg-white/20 blur-xl transition-transform group-hover:scale-110" />
    </div>
  );
}
