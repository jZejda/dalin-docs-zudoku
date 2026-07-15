import type { ComponentType, ReactNode } from "react";
import { Link } from "zudoku/components";
import {
  ArrowUpRight,
  MissingIcon,
  Bell,
  Book,
  BookOpen,
  BookOpenText,
  Bot,
  Box,
  Boxes,
  Building,
  CircleHelp,
  Code,
  Contact,
  Container,
  CreditCard,
  Database,
  FilePlus,
  FileText,
  FolderCog,
  FolderTree,
  Gauge,
  Globe,
  Info,
  Key,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  Link as LinkIcon,
  Mail,
  Map as MapIcon,
  MapPin,
  Monitor,
  MousePointerClick,
  Package,
  PackagePlus,
  Plug,
  PlugZap,
  Printer,
  Puzzle,
  Rocket,
  Send,
  Settings,
  ShieldCheck,
  ShoppingBasket,
  ShoppingCart,
  Smartphone,
  Sparkles,
  SquareLibrary,
  Store,
  Tags,
  Terminal,
  Truck,
  Undo2,
  Users,
  Workflow,
  Wrench,
  Zap,
} from "zudoku/icons";

type IconComponent = ComponentType<{ className?: string }>;

/**
 * Icons available to `<LinkCard icon="...">`. Keys use lucide's kebab-case
 * names — the same convention as `icon` in `zudoku.config.tsx`. To add one,
 * import it from `zudoku/icons` above and add a map entry here
 * (icon gallery: https://lucide.dev/icons/).
 */
const cardIcons: Record<string, IconComponent> = {
  "arrow-up-right": ArrowUpRight,
  bell: Bell,
  book: Book,
  "book-open": BookOpen,
  "book-open-text": BookOpenText,
  bot: Bot,
  box: Box,
  boxes: Boxes,
  building: Building,
  "circle-help": CircleHelp,
  code: Code,
  contact: Contact,
  container: Container,
  "credit-card": CreditCard,
  database: Database,
  "file-plus": FilePlus,
  "file-text": FileText,
  "folder-cog": FolderCog,
  "folder-tree": FolderTree,
  gauge: Gauge,
  globe: Globe,
  info: Info,
  key: Key,
  layers: Layers,
  "layout-dashboard": LayoutDashboard,
  "life-buoy": LifeBuoy,
  link: LinkIcon,
  mail: Mail,
  map: MapIcon,
  "map-pin": MapPin,
  monitor: Monitor,
  "mouse-pointer-click": MousePointerClick,
  package: Package,
  "package-plus": PackagePlus,
  plug: Plug,
  "plug-zap": PlugZap,
  printer: Printer,
  puzzle: Puzzle,
  rocket: Rocket,
  send: Send,
  settings: Settings,
  "shield-check": ShieldCheck,
  "shopping-basket": ShoppingBasket,
  "shopping-cart": ShoppingCart,
  smartphone: Smartphone,
  sparkles: Sparkles,
  "square-library": SquareLibrary,
  store: Store,
  tags: Tags,
  terminal: Terminal,
  truck: Truck,
  "undo-2": Undo2,
  users: Users,
  workflow: Workflow,
  wrench: Wrench,
  zap: Zap,
};

/**
 * Accent for the icon tile: tinted background + icon in the same hue.
 * `gray` (default) is the muted secondary style; `purple` maps to the
 * brand primary so it follows the theme in both light and dark mode.
 */
const accents = {
  gray: "bg-muted text-muted-foreground",
  purple: "bg-primary/10 text-primary",
  blue: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  teal: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  orange: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  red: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  pink: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
};

type LinkCardProps = {
  /** Target route (`/introduction`) or external URL (`https://…`). */
  to: string;
  title: string;
  /** Short subtitle; `children` can be used instead for rich content. */
  description?: string;
  /** Icon name from the registry above, or a lucide component. */
  icon?: string | IconComponent;
  color?: keyof typeof accents;
  children?: ReactNode;
};

const isExternal = (to: string) => /^https?:\/\//.test(to);

export const LinkCard = ({
  to,
  title,
  description,
  icon,
  color = "gray",
  children,
}: LinkCardProps) => {
  const Icon =
    typeof icon === "string" ? (cardIcons[icon] ?? MissingIcon) : icon;
  const body = children ?? description;
  const external = isExternal(to);

  const content = (
    <>
      {Icon && (
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${accents[color]}`}
        >
          <Icon className="size-5" />
        </span>
      )}
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 font-semibold text-[0.95rem] text-foreground">
          {title}
          {external && (
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
          )}
        </span>
        {body && (
          <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
            {body}
          </span>
        )}
      </span>
    </>
  );

  const cardClasses = `group flex ${body ? "items-start" : "items-center"} gap-4 rounded-[var(--radius)] border border-border bg-card p-5 no-underline transition-colors hover:border-primary/50 hover:bg-accent/40`;

  return external ? (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClasses}
    >
      {content}
    </a>
  ) : (
    <Link to={to} className={cardClasses}>
      {content}
    </Link>
  );
};

type CardGridProps = {
  /** Columns on desktop; collapses responsively. Default 2. */
  columns?: 1 | 2 | 3 | 4;
  children: ReactNode;
};

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export const CardGrid = ({ columns = 2, children }: CardGridProps) => (
  <div className={`not-prose my-6 grid gap-4 ${columnClasses[columns]}`}>
    {children}
  </div>
);