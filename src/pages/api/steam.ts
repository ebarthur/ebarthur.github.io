import type { APIRoute } from "astro";
import { getSecret } from "astro:env/server";

export const GET: APIRoute = async () => {
  try {
    const STEAM_API_KEY = getSecret("STEAM_API_KEY")!;
    const STEAM_ID = getSecret("STEAM_ID")!;

    const headers = {
      "Content-Type": "application/json",
    };

    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${STEAM_ID}`;
    const res = await fetch(url);
    if (!res.ok) {
      return new Response(null, { status: 204, headers });
    }
    const data = await res.json();
    const player = data?.response?.players?.[0] ?? null;

    if (!player) {
      return new Response(null, { status: 204, headers });
    }

    return new Response(JSON.stringify({ player }), { headers });
  } catch (_) {
    return new Response(null, {
      status: 204,
      headers: { "Content-Type": "application/json" },
    });
  }
};
