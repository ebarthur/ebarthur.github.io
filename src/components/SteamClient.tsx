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
        const res = await fetch("/api/steam");
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
        <div className="text-xs text-slate-500">Loading Steam profile…</div>
      </div>
    );
  }

  const avatar = player.avatarfull || player.avatar || "";
  const name = player.personaname || "Unknown";
  const profileUrl = player.profileurl || "";
  const statusMap = [
    "Offline",
    "Online",
    "Busy",
    "Away",
    "Snooze",
    "Looking to trade",
    "Looking to play",
  ];
  const status = statusMap[player.personastate ?? 0] ?? "Unknown";
  const game = player.gameextrainfo;

  const playingClass = clsx(
    "mt-1.5 text-xs rounded-md px-2 py-1",
    game ? "border border-green-300 bg-green-50 text-green-900" : "text-slate-500"
  );

  return (
    <div className="mt-4">
      <div className="flex items-center gap-3">
        <img src={avatar} alt={name} className="w-10 h-10 rounded-md" />
        <div>
          <div className="flex items-center gap-2 font-medium">
            <span>{name}</span>
            {profileUrl ? (
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Steam profile"
                className="inline-flex items-center text-slate-500 hover:(text-slate-900 dark:text-slate-100) transition-colors"
              >
                <span
                  className="i-solar-link-round-linear text-base"
                  aria-hidden="true"
                ></span>
              </a>
            ) : null}
          </div>
          <div className="text-[11px] text-slate-500">Status: {status}</div>
        </div>
      </div>
      <div className={playingClass}>
        {game ? (
          <>
            Playing: <strong>{game}</strong>
          </>
        ) : (
          "Not playing right now"
        )}
      </div>
    </div>
  );
}
