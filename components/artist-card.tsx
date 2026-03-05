import Image from "next/image";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";

interface ArtistCardProps {
  id: string;
  name: string;
  avatar_url?: string;
  verified?: boolean;
  listeners?: string;
}

export function ArtistCard({
  id,
  name,
  avatar_url,
  verified,
  listeners,
}: ArtistCardProps) {
  return (
    <div className="group relative space-y-3 overflow-hidden rounded-xl border border-border/50 bg-card p-4 transition-all hover:bg-accent/50 hover:shadow-lg text-center">
      <div className="relative mx-auto aspect-square w-full max-w-[160px] overflow-hidden rounded-full shadow-lg">
        <Link href={`/artist/${id}`}>
          <Image
            src={avatar_url || "/placeholder-artist.png"}
            alt={name}
            fill
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
      </div>
      <div className="space-y-1">
        <Link href={`/artist/${id}`}>
          <div className="flex items-center justify-center gap-1">
            <h3 className="font-bold leading-none tracking-tight hover:underline line-clamp-1 text-base">
              {name}
            </h3>
            {verified && (
              <BadgeCheck className="h-4 w-4 fill-primary text-background" />
            )}
          </div>
        </Link>
        {listeners && (
          <p className="text-xs font-medium text-muted-foreground">
            {listeners}
          </p>
        )}
        <p className="text-xs font-black uppercase tracking-widest text-primary pt-1">
          Artist
        </p>
      </div>
    </div>
  );
}
