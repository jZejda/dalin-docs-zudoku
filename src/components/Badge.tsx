import type { ReactNode } from "react";

/**
 * Accent variants match VitePress's `<Badge type="...">` so migrated pages
 * keep working unchanged; colors follow the site theme tokens.
 */
const variants = {
  info: "bg-muted text-muted-foreground",
  tip: "bg-primary/10 text-primary",
  warning: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  danger: "bg-rose-500/15 text-rose-700 dark:text-rose-400",
};

type BadgeProps = {
  type?: keyof typeof variants;
  /** Label text; `children` can be used instead. */
  text?: string;
  children?: ReactNode;
};

export const Badge = ({ type = "tip", text, children }: BadgeProps) => (
  <span
    className={`ml-1.5 inline-block -translate-y-px whitespace-nowrap rounded-full px-2.5 py-0.5 align-middle text-xs font-semibold tracking-wide ${variants[type]}`}
  >
    {children ?? text}
  </span>
);

export default Badge;
