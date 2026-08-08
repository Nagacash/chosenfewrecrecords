/** Site-wide ambient beat coordination */

export const AMBIENT_STREAM = "/api/ambient";

export const AMBIENT_PAUSE_EVENT = "cfr:ambient-pause";
export const AMBIENT_EXTERNAL_EVENT = "cfr:external-media";

/** Call when YouTube / Spotify (or any external player) starts or is unlocked */
export function notifyExternalMedia() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(AMBIENT_EXTERNAL_EVENT));
}
