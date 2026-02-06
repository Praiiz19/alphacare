import { ProviderCard } from "./ProviderCard";
import type { Provider } from "@/types";

interface ProviderGridProps {
  providers: Provider[];
  onViewProfile?: (id: string) => void;
  onBook?: (id: string) => void;
}

export function ProviderGrid({ providers, onViewProfile, onBook }: ProviderGridProps) {
  if (providers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">No providers found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {providers.map((provider) => (
        <ProviderCard
          key={provider.id}
          provider={provider}
          onViewProfile={() => onViewProfile?.(provider.id)}
          onBook={() => onBook?.(provider.id)}
        />
      ))}
    </div>
  );
}
