<div align="center">
  <img src="public/calimind_logo.svg" alt="CaliMind" width="76">

  # CaliMind Downloads

  **Find your version. Download with confidence.**

  The official, responsive release portal for CaliMind.

  [![Portal version](https://img.shields.io/badge/portal-v0.1.0-641A91?style=for-the-badge)](package.json)
  ![React](https://img.shields.io/badge/React-19-641A91?style=for-the-badge&logo=react&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-6-641A91?style=for-the-badge&logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-8-641A91?style=for-the-badge&logo=vite&logoColor=white)
</div>

## Overview

CaliMind Downloads helps people find the latest CaliMind app releases and
download the files attached to each release. It reads public release data from
the CaliMind GitHub repository and does not hard-code or fabricate release
versions.

The portal is built with React, TypeScript, Vite, Tailwind CSS, and the
shadcn-style UI components already provided in `src/components/ui`. Its
responsive interface uses CaliMind's purple palette and glassmorphism styling.

## Features

- Browse current public releases, release notes, and downloadable assets.
- Search by release name, tag, notes, or asset filename.
- Filter by platform and optionally include pre-releases.
- Look up releases by their six-digit release code.
- Open dedicated release-detail pages and navigate without full-page reloads.
- Refresh automatically on page load, every five minutes, and when returning to
  an inactive tab; refresh manually at any time.
- Download assets in the page with transfer progress and visible error states.
- Learn about CaliMind and report issues from dedicated sections.
- Use the portal on desktop, tablet, and mobile.

## Get started

### Requirements

- Node.js 20 or later
- npm

### Install and run

```sh
npm install
npm run dev
```

Vite prints the local development URL after the server starts.

### Build and preview

```sh
npm run build
npm run preview
```

### Lint

```sh
npm run lint
```

## Releases and downloads

The portal reads public releases from
[`hannsderrick23-debug/CaliMind`](https://github.com/hannsderrick23-debug/CaliMind/releases).
Published releases become available automatically; the portal version and
CaliMind app versions are separate.

Downloads are fetched by the browser, streamed into memory for progress
reporting, and saved locally when complete. Cross-origin browser access is
required from the upstream asset host. If an upstream host blocks cross-origin
requests, the portal displays the download error; supporting that host would
require a same-origin download service. Large downloads need enough browser
memory to buffer the file.

## Project structure

```text
src/
├── components/       Shared release, feature, issue, and footer components
├── components/ui/    Provided shadcn-style UI primitives
├── lib/              Release types and shared helpers
└── pages/             Home, About, Help, and release-detail pages
public/
├── images/            CaliMind app screenshots
└── calimind_logo.svg
```

## Report an issue

Use the **Report an issue** section in the portal or visit the
[CaliMind issue tracker](https://github.com/hannsderrick23-debug/CaliMind/issues).
Do not include passwords, private notes, or other sensitive information in a
report.

## Maintainer

The CaliMind product is developed by **Aventorgo LLC**.

[Aventorgo website](https://aventorgo.vercel.app/)

## License

This repository does not currently include a `LICENSE` file. No license to
reuse, modify, or redistribute the portal source is granted by this README.
