import { getTranslations } from "next-intl/server";
import { VideosBrowser } from "@/components/home/VideosBrowser";
import { getVideos } from "@/lib/youtube";

export async function VideosTeaser() {
  const t = await getTranslations("Videos");
  const videos = await getVideos();

  return (
    <VideosBrowser
      videos={videos}
      label={t("label")}
      allLabel={t("all")}
      mode="home"
    />
  );
}
