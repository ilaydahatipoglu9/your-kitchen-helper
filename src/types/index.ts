// Sports Hub Type Definitions

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  bio?: string;
  location?: string;
  avatar?: string;
  joinDate: string;
}

export interface Team {
  id: string;
  name: string;
  logo?: string;
  sport: string;
  league: string;
  country: string;
}

export interface Player {
  id: string;
  name: string;
  photo?: string;
  team: string;
  position: string;
  nationality: string;
}

export interface League {
  id: string;
  name: string;
  logo?: string;
  sport: string;
  country: string;
  teamsCount: number;
}

export interface Sport {
  id: string;
  name: string;
  icon?: string;
  description?: string;
}

export interface Match {
  id: string;
  sport: string;
  league: string;
  status: "live" | "upcoming" | "finished";
  homeTeam: {
    name: string;
    logo?: string;
    score?: number;
  };
  awayTeam: {
    name: string;
    logo?: string;
    score?: number;
  };
  startTime: string;
  venue?: string;
  matchTime?: string;
}

export interface MatchEvent {
  id: string;
  matchId: string;
  time: string;
  type: "goal" | "card" | "substitution" | "other";
  team: "home" | "away";
  player: string;
  description: string;
}

export interface Notification {
  id: string;
  type: "match" | "score" | "news" | "alert";
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export interface FeedItem {
  id: string;
  type: "news" | "highlight" | "stats" | "update";
  title: string;
  description: string;
  source: string;
  timestamp: string;
  image?: string;
  team?: string;
  league?: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface UserPreferences {
  sports: string[];
  teams: string[];
  leagues: string[];
  players: string[];
  notifications: {
    matchStart: boolean;
    scoreUpdates: boolean;
    news: boolean;
    transfers: boolean;
    weeklyDigest: boolean;
  };
}

export interface SearchResult {
  id: string;
  type: "team" | "player" | "league" | "sport";
  name: string;
  subtitle: string;
  followers?: number;
  isFollowing?: boolean;
}

export interface FilterCategory {
  id: string;
  label: string;
  items: FilterItem[];
}

export interface FilterItem {
  id: string;
  label: string;
  count?: number;
}
