import { NextResponse } from "next/server";

// Proxies GitHub API to avoid rate limiting on the client
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") || "Amit292004";

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { "Accept": "application/vnd.github.v3+json" },
        next: { revalidate: 3600 }, // cache for 1 hour
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`, {
        headers: { "Accept": "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok) {
      return NextResponse.json({ error: "GitHub user not found" }, { status: 404 });
    }

    const user = await userRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];

    const topRepos = repos
      .filter((r: any) => !r.fork)
      .slice(0, 6)
      .map((r: any) => ({
        name: r.name,
        description: r.description,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        url: r.html_url,
        topics: r.topics?.slice(0, 3) || [],
      }));

    return NextResponse.json({
      username: user.login,
      name: user.name,
      bio: user.bio,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,
      topRepos,
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
