import type { SpotifyRef } from "@/lib/spotify";
import { spotifyEmbedUrl } from "@/lib/spotify";

type SpotifyEmbedProps = {
  spotify: SpotifyRef;
  /** compact = catalogue bar; standard = track player; list = album tracklist */
  size?: "compact" | "standard" | "list";
  className?: string;
  title?: string;
};

export function SpotifyEmbed({
  spotify,
  size = "standard",
  className = "",
  title = "Spotify player",
}: SpotifyEmbedProps) {
  const height =
    size === "compact" ? 80 : size === "list" ? 352 : 152;

  return (
    <div className={`overflow-hidden bg-black ${className}`}>
      <iframe
        src={spotifyEmbedUrl(spotify)}
        width="100%"
        height={height}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={title}
        className="block w-full border-0"
      />
    </div>
  );
}
