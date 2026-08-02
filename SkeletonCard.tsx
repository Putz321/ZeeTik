export default function SkeletonCard() {
  return (
    <div className="w-full max-w-2xl mx-auto cyber-glass rounded-2xl p-6 space-y-6 animate-pulse border border-cyber-border/30">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:w-48 h-64 bg-slate-800/80 rounded-xl" />
        <div className="flex-1 space-y-4">
          <div className="h-6 bg-slate-800/80 rounded w-3/4" />
          <div className="h-4 bg-slate-800/80 rounded w-1/2" />
          <div className="h-10 bg-slate-800/80 rounded-lg w-full mt-6" />
          <div className="h-10 bg-slate-800/80 rounded-lg w-full" />
        </div>
      </div>
    </div>
  );
}