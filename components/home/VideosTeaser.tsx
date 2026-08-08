import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VideoCard } from "@/components/ui/VideoCard";
import { getVideos, YOUTUBE_CHANNEL } from "@/lib/youtube";

export async function VideosTeaser() {
  const t = await getTranslations("Videos");
  const videos = await getVideos();

  return (
    <section id="videos" className="scroll-mt-20 bg-background px-5 py-[var(--section-y-tight)] md:px-10 md:py-14">
      <SectionLabel>
        {t("label")} ·{" "}
        <a
          href={YOUTUBE_CHANNEL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent no-underline"
        >
          @chosenfewrecords
        </a>
      </SectionLabel>

      <div className="mt-8 grid grid-cols-1 gap-0.5 bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
        {videos.map((video) => (
          <VideoCard key={video.id} id={video.id} title={video.title} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/videos"
            className="inline-block border-2 border-white/35 px-9 py-3.5 font-display text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors duration-fast hover:border-accent hover:text-accent"
        >
          {t("all")}
        </Link>
      </div>
    </section>
  );
}
