import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VideoCard } from "@/components/ui/VideoCard";
import { getVideos, YOUTUBE_CHANNEL } from "@/lib/youtube";

export default async function VideosPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const [videos, t] = await Promise.all([
    getVideos(),
    getTranslations("Videos"),
  ]);

  return (
    <section className="bg-background px-5 pb-20 pt-28 md:px-10">
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
        <a
          href={YOUTUBE_CHANNEL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-white/30 px-9 py-3.5 font-display text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:border-accent hover:text-accent"
        >
          {t("all")}
        </a>
      </div>
    </section>
  );
}
