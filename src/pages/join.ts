import type { APIRoute } from "astro";
let lastSavedInvite = "";

export const GET: APIRoute = async ({ redirect }) => {
  try {
    const response = await fetch(
      "https://discord.com/api/guilds/1168343363318202428/widget.json",
    );

    if (!response.ok) {
      throw new Error(`Discord API responded with ${response.status}`);
    }

    const data = await response.json();
    const instantInvite = data.instant_invite;

    if (!instantInvite) {
      throw new Error("No instant invite found in Discord widget response");
    }

    lastSavedInvite = instantInvite;
    return redirect(instantInvite);
  } catch (error) {
    console.error("Error fetching Discord invite:", error);

    if (lastSavedInvite) {
      return redirect(lastSavedInvite);
    }

    return new Response(
      "Discord couldn't fetch an invite, please try again later.",
      {
        status: 503,
        headers: {
          "Content-Type": "text/plain",
        },
      },
    );
  }
};
