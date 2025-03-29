export default function Loading() {
  return (
    <div className="container mx-auto min-h-[600px] flex flex-col items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-muted rounded-full animate-[spin_1.5s_linear_infinite]" />
        <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-[spin_1s_linear_infinite]" />
      </div>
      <p className="mt-4 text-lg text-muted-foreground">Loading...</p>
    </div>
  );
} 