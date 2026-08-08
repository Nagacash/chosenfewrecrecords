import { getTranslations, setRequestLocale } from "next-intl/server";
import { VideosBrowser } from "@/components/home/VideosBrowser";
import { getVideos } from "@/lib/youtube";

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
    <div className="pt-16">
      <VideosBrowser
        videos={videos}
        label={t("label")}
        allLabel={t("all")}
        mode="full"
      />
    </div>
  );
}
