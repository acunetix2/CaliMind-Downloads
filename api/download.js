import { once } from "node:events"

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

  const requestUrl = new URL(request.url ?? "/", `https://${request.headers.host ?? "localhost"}`)
  const assetId = requestUrl.searchParams.get("assetId")
  const source = requestUrl.searchParams.get("source")
  const tag = requestUrl.searchParams.get("tag")
  let upstreamUrl
  const headers = {}

  if (assetId && /^\d{1,20}$/.test(assetId)) {
    upstreamUrl = `https://api.github.com/repos/${REPOSITORY}/releases/assets/${assetId}`
    headers.Accept = "application/octet-stream"
    headers["X-GitHub-Api-Version"] = GITHUB_API_VERSION
  } else if (
    (source === "zip" || source === "tar.gz") &&
    tag &&
    tag.length <= 128 &&
    /^[A-Za-z0-9._-]+$/.test(tag)
  ) {
    upstreamUrl = `https://codeload.github.com/${REPOSITORY}/legacy.${source}/refs/tags/${encodeURIComponent(tag)}`
  } else {
    sendError(response, 400, "A valid release asset or source archive is required.")
    return
  }

  let upstream
  try {
    upstream = await fetch(upstreamUrl, { headers, redirect: "follow" })
  } catch (error) {
    console.error("Release download request failed:", error)
    sendError(response, 502, "The release file server could not be reached.")
    return
  }

  if (!upstream.ok) {
    const statusCode = upstream.status === 404 ? 404 : 502
    sendError(
      response,
      statusCode,
      upstream.status === 404
        ? "This file is no longer available in the release."
        : "The release file server could not provide this download.",
    )
    return
  }

  if (!upstream.body) {
    sendError(response, 502, "The release file server returned an empty response.")
    return
  }

  response.statusCode = 200
  response.setHeader("Content-Type", upstream.headers.get("content-type") || "application/octet-stream")
  response.setHeader("Content-Disposition", "attachment")
  response.setHeader("Cache-Control", "private, no-store")
  response.setHeader("X-Content-Type-Options", "nosniff")

  const contentLength = upstream.headers.get("content-length")
  if (contentLength && /^\d+$/.test(contentLength)) {
    response.setHeader("Content-Length", contentLength)
  }

  const reader = upstream.body.getReader()
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (!response.write(value)) await once(response, "drain")
    }
    response.end()
  } catch (error) {
    console.error("Release download stream failed:", error)
    response.destroy(error)
  } finally {
    reader.releaseLock()
  }
}
