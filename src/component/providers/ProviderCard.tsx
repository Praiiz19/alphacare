import { Star, MapPin, Clock, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Provider } from "@/types";

interface ProviderCardProps {
  provider: Provider;
  onViewProfile?: () => void;
  onBook?: () => void;
}

export function ProviderCard({ provider, onViewProfile, onBook }: ProviderCardProps) {
  return (
    <div className="provider-card">
      <div className="flex gap-4">
        {/* Avatar */}
        <Avatar className="w-16 h-16 border-2 border-border">
          <AvatarImage src={provider.avatar} alt={provider.name} />
          <AvatarFallback className="bg-accent text-accent-foreground text-lg">
            {provider.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">
              {provider.name}
            </h3>
            {provider.isVerified && (
              <BadgeCheck className="w-4 h-4 text-primary flex-shrink-0" />
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-2">
            {provider.specialty || provider.type}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-medium">{provider.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({provider.reviewCount} reviews)
            </span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {provider.distance && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {provider.distance}
              </span>
            )}
            {provider.location && (
              <span className="truncate">{provider.location}</span>
            )}
          </div>

          {provider.availableTime && (
            <div className="flex items-center gap-1 mt-2 text-xs">
              <Clock className="w-3 h-3 text-healthcare-green" />
              <span className="text-healthcare-green font-medium">
                {provider.availableTime}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-border">
        <Button variant="outline" className="flex-1" onClick={onViewProfile}>
          Profile
        </Button>
        <Button className="flex-1" onClick={onBook}>
          Book Visit
        </Button>
      </div>
    </div>
  );
}
