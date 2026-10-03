const REPOSITORY = "hannsderrick23-debug/CaliMind"
const GITHUB_API_VERSION = "2022-11-28"

function sendError(response, statusCode, message) {
  response.statusCode = statusCode
  response.setHeader("Content-Type", "application/json; charset=utf-8")
  response.setHeader("Cache-Control", "no-store")
  response.end(JSON.stringify({ error: message }))
}

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET")
    sendError(response, 405, "Only GET requests are supported.")
    return
  }

  let upstream
  try {
    upstream = await fetch(
      `https://api.github.com/repos/${REPOSITORY}/releases?per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": GITHUB_API_VERSION,
        },
        cache: "no-store",
      },
    )
  } catch (error) {
    console.error("Release list request failed:", error)
    sendError(response, 502, "The release service could not be reached.")
    return
  }

  if (!upstream.ok) {
    const statusCode = upstream.status === 403 || upstream.status === 429 ? 429 : 502
    sendError(
      response,
      statusCode,
      statusCode === 429
        ? "Release requests are temporarily limited. Try again shortly."
        : "The release service could not provide release information.",
    )
    return
  }

  let data
  try {
    data = await upstream.json()
  } catch (error) {
    console.error("Release list response was not valid JSON:", error)
    sendError(response, 502, "The release service returned an invalid response.")
    return
  }

  if (!Array.isArray(data)) {
    sendError(response, 502, "The release service returned an invalid release list.")
    return
  }

  const releases = data
    .filter((release) =>
      release &&
      typeof release.id === "number" &&
      typeof release.tag_name === "string" &&
      typeof release.prerelease === "boolean" &&
      Array.isArray(release.assets),
    )
    .map((release) => ({
      id: release.id,
      tag_name: release.tag_name,
      name: typeof release.name === "string" ? release.name : null,
      body: typeof release.body === "string" ? release.body : null,
      draft: Boolean(release.draft),
      prerelease: release.prerelease,
      published_at: typeof release.published_at === "string" ? release.published_at : null,
      assets: release.assets
        .filter((asset) =>
          asset &&
          typeof asset.id === "number" &&
          typeof asset.name === "string" &&
          typeof asset.size === "number",
        )
        .map((asset) => ({
          id: asset.id,
          name: asset.name,
          size: asset.size,
          content_type: typeof asset.content_type === "string" ? asset.content_type : "",
          download_count: typeof asset.download_count === "number" ? asset.download_count : 0,
        })),
    }))

  response.statusCode = 200
  response.setHeader("Content-Type", "application/json; charset=utf-8")
  response.setHeader("Cache-Control", "no-store")
  response.end(JSON.stringify(releases))
}
