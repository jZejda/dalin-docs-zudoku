import type { ZudokuPlugin } from "zudoku";

type OpenGraphPluginOptions = {
  /** Canonical site origin without a trailing slash, e.g. "https://docs.zaslat.cz". */
  origin: string;
  /** Site name shown by social previews (og:site_name). */
  siteName: string;
  /** og:locale, e.g. "cs_CZ". */
  locale?: string;
  /**
   * Default share image (og:image) — absolute URL or a path under `public/`.
   * Crawlers require a raster image (PNG/JPG, ideally 1200×630); SVG is ignored
   * by Facebook, Twitter/X, Slack and iMessage.
   */
  image?: string;
  /** og:type, defaults to "website". */
  type?: string;
};

/**
 * Emits Open Graph + Twitter card tags on every page. og:url follows the
 * current route. og:title / og:description are intentionally NOT set here:
 * plugins don't see page frontmatter, and crawlers fall back to the page's
 * `<title>` and `<meta name="description">`, which Zudoku already renders
 * from frontmatter. A page can still override any tag via `<Head>` in MDX —
 * unhead dedupes meta by `property`, page-level tags win.
 */
export const openGraphPlugin = (
  options: OpenGraphPluginOptions,
): ZudokuPlugin => {
  const absolute = (path: string) =>
    /^https?:\/\//.test(path)
      ? path
      : new URL(path, options.origin).toString();

  return {
    getHead: ({ location }) => (
      <>
        <meta property="og:site_name" content={options.siteName} />
        <meta property="og:type" content={options.type ?? "website"} />
        {options.locale && (
          <meta property="og:locale" content={options.locale} />
        )}
        <meta property="og:url" content={absolute(location.pathname)} />
        {options.image && (
          <meta property="og:image" content={absolute(options.image)} />
        )}
        <meta
          name="twitter:card"
          content={options.image ? "summary_large_image" : "summary"}
        />
      </>
    ),
  };
};
