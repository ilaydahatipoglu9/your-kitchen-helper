// Sports Hub Constants and Configuration

export const APP_NAME = "Sports Hub";
export const APP_DESCRIPTION = "Your central destination for discovering, tracking, and staying informed about your favorite sports.";

// Navigation items
export const NAV_ITEMS = [
  { label: "Discover", href: "/discover", icon: "Compass" },
  { label: "Live Matches", href: "/", icon: "Radio" },
  { label: "My Feed", href: "/feed", icon: "Rss" },
  { label: "Profile", href: "/profile", icon: "User" },
] as const;

// Sports categories
export const SPORTS = [
  { id: "football", name: "Football", icon: "Trophy" },
  { id: "basketball", name: "Basketball", icon: "Trophy" },
  { id: "tennis", name: "Tennis", icon: "Trophy" },
  { id: "cricket", name: "Cricket", icon: "Trophy" },
  { id: "baseball", name: "Baseball", icon: "Trophy" },
  { id: "hockey", name: "Hockey", icon: "Trophy" },
] as const;

// Match status types
export const MATCH_STATUS = {
  LIVE: "live",
  UPCOMING: "upcoming",
  FINISHED: "finished",
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  MATCH: "match",
  SCORE: "score",
  NEWS: "news",
  ALERT: "alert",
} as const;

// Feed content types
export const FEED_TYPES = {
  NEWS: "news",
  HIGHLIGHT: "highlight",
  STATS: "stats",
  UPDATE: "update",
} as const;

// API endpoints (for future use)
export const API_ENDPOINTS = {
  MATCHES: "/api/matches",
  TEAMS: "/api/teams",
  PLAYERS: "/api/players",
  LEAGUES: "/api/leagues",
  NOTIFICATIONS: "/api/notifications",
  USER: "/api/user",
  PREFERENCES: "/api/preferences",
  SEARCH: "/api/search",
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
} as const;

// Animation durations (in ms)
export const ANIMATIONS = {
  FAST: 150,
  NORMAL: 200,
  SLOW: 300,
  SCORE_UPDATE: 200,
  LIVE_PULSE: 2000,
  PAGE_TRANSITION: 300,
  MODAL_OPEN: 250,
  SIDEBAR_SLIDE: 250,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  USER: "sports-hub-user",
  PREFERENCES: "sports-hub-preferences",
  THEME: "sports-hub-theme",
  RECENT_SEARCHES: "sports-hub-recent-searches",
} as const;
