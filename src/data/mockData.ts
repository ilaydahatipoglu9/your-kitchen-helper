import type { MatchData } from "@/components/sports/MatchCard";
import type { ContentData } from "@/components/sports/ContentCard";

// Mock Live Matches
export const liveMatches: MatchData[] = [
  {
    id: "1",
    homeTeam: { id: "t1", name: "Manchester United", shortName: "MUN" },
    awayTeam: { id: "t2", name: "Liverpool", shortName: "LIV" },
    homeScore: 2,
    awayScore: 1,
    status: "live",
    matchTime: "67",
    league: { id: "l1", name: "Premier League" },
    sport: "Football",
  },
  {
    id: "2",
    homeTeam: { id: "t3", name: "Real Madrid", shortName: "RMA" },
    awayTeam: { id: "t4", name: "Barcelona", shortName: "BAR" },
    homeScore: 1,
    awayScore: 1,
    status: "halftime",
    league: { id: "l2", name: "La Liga" },
    sport: "Football",
  },
  {
    id: "3",
    homeTeam: { id: "t5", name: "Bayern Munich", shortName: "BAY" },
    awayTeam: { id: "t6", name: "Borussia Dortmund", shortName: "BVB" },
    homeScore: 3,
    awayScore: 0,
    status: "live",
    matchTime: "82",
    league: { id: "l3", name: "Bundesliga" },
    sport: "Football",
  },
  {
    id: "4",
    homeTeam: { id: "t7", name: "Los Angeles Lakers", shortName: "LAL" },
    awayTeam: { id: "t8", name: "Golden State Warriors", shortName: "GSW" },
    homeScore: 98,
    awayScore: 102,
    status: "live",
    matchTime: "Q4",
    league: { id: "l4", name: "NBA" },
    sport: "Basketball",
  },
];

// Mock Upcoming Matches
export const upcomingMatches: MatchData[] = [
  {
    id: "5",
    homeTeam: { id: "t9", name: "Chelsea", shortName: "CHE" },
    awayTeam: { id: "t10", name: "Arsenal", shortName: "ARS" },
    status: "upcoming",
    startTime: "Today, 20:00",
    league: { id: "l1", name: "Premier League" },
    sport: "Football",
  },
  {
    id: "6",
    homeTeam: { id: "t11", name: "Juventus", shortName: "JUV" },
    awayTeam: { id: "t12", name: "AC Milan", shortName: "ACM" },
    status: "upcoming",
    startTime: "Tomorrow, 18:45",
    league: { id: "l5", name: "Serie A" },
    sport: "Football",
  },
  {
    id: "7",
    homeTeam: { id: "t13", name: "Paris Saint-Germain", shortName: "PSG" },
    awayTeam: { id: "t14", name: "Marseille", shortName: "OM" },
    status: "upcoming",
    startTime: "Tomorrow, 21:00",
    league: { id: "l6", name: "Ligue 1" },
    sport: "Football",
  },
  {
    id: "8",
    homeTeam: { id: "t15", name: "Boston Celtics", shortName: "BOS" },
    awayTeam: { id: "t16", name: "Miami Heat", shortName: "MIA" },
    status: "upcoming",
    startTime: "Wed, 19:30",
    league: { id: "l4", name: "NBA" },
    sport: "Basketball",
  },
];

// Mock Finished Matches
export const finishedMatches: MatchData[] = [
  {
    id: "9",
    homeTeam: { id: "t17", name: "Tottenham", shortName: "TOT" },
    awayTeam: { id: "t18", name: "Manchester City", shortName: "MCI" },
    homeScore: 1,
    awayScore: 3,
    status: "finished",
    league: { id: "l1", name: "Premier League" },
    sport: "Football",
  },
  {
    id: "10",
    homeTeam: { id: "t19", name: "Atletico Madrid", shortName: "ATM" },
    awayTeam: { id: "t20", name: "Sevilla", shortName: "SEV" },
    homeScore: 2,
    awayScore: 0,
    status: "finished",
    league: { id: "l2", name: "La Liga" },
    sport: "Football",
  },
];

// Mock Content/Articles
export const trendingContent: ContentData[] = [
  {
    id: "c1",
    title: "Premier League Title Race Heats Up as Top Teams Battle for Supremacy",
    excerpt: "With just 10 games remaining, the Premier League title race is shaping up to be one of the most exciting in recent memory.",
    imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=450&fit=crop",
    category: "Football",
    publishedAt: "2 hours ago",
    source: "Sports Daily",
    type: "article",
    relatedTeams: ["Manchester United", "Liverpool", "Manchester City"],
  },
  {
    id: "c2",
    title: "NBA Playoffs Preview: Western Conference Showdown",
    excerpt: "Breaking down the key matchups and predictions for this year's Western Conference playoffs.",
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=450&fit=crop",
    category: "Basketball",
    publishedAt: "4 hours ago",
    source: "Hoops Central",
    type: "article",
    relatedTeams: ["Lakers", "Warriors"],
  },
  {
    id: "c3",
    title: "Transfer Window: Top 10 Deals That Could Happen This Summer",
    excerpt: "A look at the biggest potential transfers that could reshape European football.",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop",
    category: "Transfers",
    publishedAt: "6 hours ago",
    source: "Transfer Talk",
    type: "news",
  },
  {
    id: "c4",
    title: "Rising Stars: Young Players Making Waves This Season",
    excerpt: "Meet the next generation of football superstars who are taking the sport by storm.",
    imageUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=450&fit=crop",
    category: "Features",
    publishedAt: "8 hours ago",
    source: "Sports Weekly",
    type: "article",
  },
  {
    id: "c5",
    title: "Champions League Quarter-Finals Draw Analysis",
    excerpt: "Expert analysis of the Champions League quarter-final matchups and predictions.",
    imageUrl: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&h=450&fit=crop",
    category: "Champions League",
    publishedAt: "12 hours ago",
    source: "UEFA News",
    type: "news",
  },
  {
    id: "c6",
    title: "Tactical Breakdown: How Modern Teams Are Evolving",
    excerpt: "An in-depth look at the tactical innovations changing the beautiful game.",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=450&fit=crop",
    category: "Analysis",
    publishedAt: "1 day ago",
    source: "Tactics Board",
    type: "article",
  },
];

// Mock User Profile
export const mockUserProfile = {
  id: "u1",
  username: "sportsfan123",
  email: "sportsfan@example.com",
  displayName: "John Doe",
  avatar: null,
  createdAt: "2023-01-15",
  preferences: {
    favoriteTeams: ["t1", "t3", "t7"],
    favoriteLeagues: ["l1", "l2", "l4"],
    favoritePlayers: ["p1", "p2"],
    favoriteSports: ["Football", "Basketball"],
  },
  notificationSettings: {
    matchStart: true,
    goals: true,
    finalScore: true,
    news: false,
    transfers: true,
  },
};

// Mock Teams
export const mockTeams = [
  { id: "t1", name: "Manchester United", shortName: "MUN", league: "Premier League", sport: "Football" },
  { id: "t2", name: "Liverpool", shortName: "LIV", league: "Premier League", sport: "Football" },
  { id: "t3", name: "Real Madrid", shortName: "RMA", league: "La Liga", sport: "Football" },
  { id: "t4", name: "Barcelona", shortName: "BAR", league: "La Liga", sport: "Football" },
  { id: "t5", name: "Bayern Munich", shortName: "BAY", league: "Bundesliga", sport: "Football" },
  { id: "t7", name: "Los Angeles Lakers", shortName: "LAL", league: "NBA", sport: "Basketball" },
  { id: "t8", name: "Golden State Warriors", shortName: "GSW", league: "NBA", sport: "Basketball" },
];

// Mock Players
export const mockPlayers = [
  { id: "p1", name: "Cristiano Ronaldo", team: "Al-Nassr", position: "Forward", nationality: "Portugal" },
  { id: "p2", name: "Lionel Messi", team: "Inter Miami", position: "Forward", nationality: "Argentina" },
  { id: "p3", name: "Kylian Mbappe", team: "Real Madrid", position: "Forward", nationality: "France" },
  { id: "p4", name: "Erling Haaland", team: "Manchester City", position: "Forward", nationality: "Norway" },
  { id: "p5", name: "LeBron James", team: "Los Angeles Lakers", position: "Forward", nationality: "USA" },
];

// Mock Leagues
export const mockLeagues = [
  { id: "l1", name: "Premier League", country: "England", sport: "Football" },
  { id: "l2", name: "La Liga", country: "Spain", sport: "Football" },
  { id: "l3", name: "Bundesliga", country: "Germany", sport: "Football" },
  { id: "l4", name: "NBA", country: "USA", sport: "Basketball" },
  { id: "l5", name: "Serie A", country: "Italy", sport: "Football" },
  { id: "l6", name: "Ligue 1", country: "France", sport: "Football" },
];

// Mock Notifications
export const mockNotifications = [
  {
    id: "n1",
    type: "goal",
    title: "GOAL! Manchester United 2-1 Liverpool",
    message: "Bruno Fernandes scores from the penalty spot!",
    timestamp: "5 minutes ago",
    read: false,
    matchId: "1",
  },
  {
    id: "n2",
    type: "match_start",
    title: "Match Started: Real Madrid vs Barcelona",
    message: "El Clasico is now live!",
    timestamp: "45 minutes ago",
    read: false,
    matchId: "2",
  },
  {
    id: "n3",
    type: "final_score",
    title: "Full Time: Tottenham 1-3 Manchester City",
    message: "Manchester City wins convincingly at Tottenham.",
    timestamp: "2 hours ago",
    read: true,
    matchId: "9",
  },
  {
    id: "n4",
    type: "news",
    title: "Transfer News: Major signing announced",
    message: "Breaking: Top player set to join new club.",
    timestamp: "4 hours ago",
    read: true,
  },
];

// Mock Match Events
export const mockMatchEvents = [
  { id: "e1", matchId: "1", type: "goal", minute: 23, team: "home", player: "Marcus Rashford", assist: "Bruno Fernandes" },
  { id: "e2", matchId: "1", type: "goal", minute: 45, team: "away", player: "Mohamed Salah", assist: "Trent Alexander-Arnold" },
  { id: "e3", matchId: "1", type: "yellow_card", minute: 52, team: "away", player: "Virgil van Dijk" },
  { id: "e4", matchId: "1", type: "goal", minute: 67, team: "home", player: "Bruno Fernandes", assist: "Penalty" },
  { id: "e5", matchId: "1", type: "substitution", minute: 70, team: "home", playerIn: "Antony", playerOut: "Jadon Sancho" },
];

// Mock Match Statistics
export const mockMatchStats = {
  matchId: "1",
  possession: { home: 48, away: 52 },
  shots: { home: 12, away: 15 },
  shotsOnTarget: { home: 5, away: 6 },
  corners: { home: 4, away: 7 },
  fouls: { home: 11, away: 9 },
  yellowCards: { home: 1, away: 2 },
  redCards: { home: 0, away: 0 },
};

// Mock Admin Data
export const mockDataSources = [
  { id: "ds1", name: "Sports API Pro", type: "REST API", status: "active", lastSync: "2 minutes ago" },
  { id: "ds2", name: "Live Scores Feed", type: "WebSocket", status: "active", lastSync: "Real-time" },
  { id: "ds3", name: "Stats Provider", type: "REST API", status: "inactive", lastSync: "1 hour ago" },
];

export const mockAlertRules = [
  { id: "ar1", name: "High Error Rate", metric: "error_rate", threshold: 5, unit: "%", enabled: true },
  { id: "ar2", name: "API Latency", metric: "response_time", threshold: 500, unit: "ms", enabled: true },
  { id: "ar3", name: "Low Uptime", metric: "uptime", threshold: 99, unit: "%", enabled: false },
];

export const mockSystemHealth = {
  uptime: 99.98,
  responseTime: 145,
  errorRate: 0.02,
  activeUsers: 12453,
  requestsPerMinute: 8234,
};
