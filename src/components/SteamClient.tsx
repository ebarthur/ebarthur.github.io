import type { SteamPlayer, SteamResponse } from "@/lib/types";
import { useMounted } from "@/lib/use-mounted";
import clsx from "clsx";
import React from "react";

export default function SteamClient() {
  const [player, setPlayer] = React.useState<SteamPlayer | null>(null);
  const [hidden, setHidden] = React.useState(false);

  const mounted = useMounted();

  React.useEffect(() => {
    if (!mounted) return;

    const load = async () => {
      try {
        const res = await fetch(
          "https://steam-worker.steam67.workers.dev/steam",
        );
        if (!res.ok) {
          setHidden(true);
          return;
        }

        const data = (await res.json()) as SteamResponse;
        const p = data?.player ?? null;
        if (!p) {
          setHidden(true);
          return;
        }

        setPlayer(p);
      } catch {
        setHidden(true);
      }
    };

    load();
  }, [mounted]);

  if (hidden) return null;

  if (!player) {
    return (
      <div className="mt-4">
        <div className="i-svg-spinners-3-dots-move text-secondary" />
      </div>
    );
  }

  const avatar = player.avatarfull || player.avatar || "";
  const name = player.personaname || "Unknown";

  const media = player.gameid
    ? `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${player.gameid}/capsule_184x69.jpg`
    : avatar;
  const game = player.gameextrainfo;

  const playingClass = clsx(
    "text-xs rounded-md inline-flex",
    game ? "text-emerald-700 dark:text-emerald-500" : "text-secondary",
  );

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2">
        <img
          src={media}
          alt={name}
          className="h-10 w-auto rounded-md object-cover"
        />
        <div>
          <div className="flex items-center gap-2 font-medium">
            <span>{name}</span>
            <a
              href={player.profileurl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="i-solar-link-round-linear text-xs text-base"
                aria-hidden="true"
              ></div>
            </a>
          </div>
          <div className={playingClass}>
            <div
              className="i-solar-gamepad-minimalistic-bold-duotone text-base mr-1"
              aria-hidden="true"
            ></div>
            {game ? (
              <>
                Playing: <strong className="ml-1">{game}</strong>
              </>
            ) : (
              "Not playing right now"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
