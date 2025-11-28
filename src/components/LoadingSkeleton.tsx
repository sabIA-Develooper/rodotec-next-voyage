interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div 
      className={`animate-pulse bg-white/5 rounded ${className}`}
      role="status"
      aria-label="Carregando..."
    >
      <span className="sr-only">Carregando...</span>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-[#0B1220] rounded-3xl overflow-hidden border border-white/5">
      <Skeleton className="h-64 rounded-none" />
      <div className="p-6 lg:p-8 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="space-y-2 pt-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
          <Skeleton className="h-3 w-3/4" />
        </div>
        <Skeleton className="h-12 w-full rounded-xl mt-6" />
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#020617] pt-20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 py-12 sm:py-16">
        <Skeleton className="h-6 w-64 mb-8" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <Skeleton className="h-96 lg:h-[600px] rounded-3xl" />
          
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-14 flex-1 rounded-xl" />
              <Skeleton className="h-14 flex-1 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-4 mb-12">
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-6 w-full max-w-3xl" />
      <Skeleton className="h-6 w-2/3 max-w-3xl" />
    </div>
  );
}

export function ListItemSkeleton() {
  return (
    <div className="flex items-start gap-4 p-4 bg-[#0B1220] rounded-xl border border-white/5">
      <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

