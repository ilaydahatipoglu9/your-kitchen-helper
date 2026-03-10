import { LiveMatch } from "@/components/matches/LiveMatchCard";
import { UpcomingMatch } from "@/components/matches/UpcomingMatchCard";
import { ContentItem } from "@/components/content/ContentCard";

export const mockLiveMatches: LiveMatch[] = [
  {
    id: "1",
    homeTeam: {
      name: "Manchester United",
      shortName: "MUN",
      score: 2,
    },
    awayTeam: {
      name: "Liverpool",
      shortName: "LIV",
      score: 1,
    },
    league: "Premier League",
    status: "live",
    minute: 67,
    venue: "Old Trafford",
  },
  {
    id: "2",
    homeTeam: {
      name: "Real Madrid",
      shortName: "RMA",
      score: 0,
    },
    awayTeam: {
      name: "Barcelona",
      shortName: "BAR",
      score: 0,
    },
    league: "La Liga",
    status: "halftime",
    venue: "Santiago Bernabéu",
  },
  {
    id: "3",
    homeTeam: {
      name: "Bayern Munich",
      shortName: "BAY",
      score: 3,
    },
    awayTeam: {
      name: "Borussia Dortmund",
      shortName: "BVB",
      score: 2,
    },
    league: "Bundesliga",
    status: "live",
    minute: 82,
    venue: "Allianz Arena",
  },
  {
    id: "4",
    homeTeam: {
      name: "AC Milan",
      shortName: "MIL",
      score: 1,
    },
    awayTeam: {
      name: "Inter Milan",
      shortName: "INT",
      score: 1,
    },
    league: "Serie A",
    status: "live",
    minute: 45,
    venue: "San Siro",
  },
];

export const mockUpcomingMatches: UpcomingMatch[] = [
  {
    id: "5",
    homeTeam: {
      name: "Chelsea",
      shortName: "CHE",
    },
    awayTeam: {
      name: "Arsenal",
      shortName: "ARS",
    },
    league: "Premier League",
    date: "Tomorrow",
    time: "15:00",
    venue: "Stamford Bridge",
    isNotificationSet: true,
  },
  {
    id: "6",
    homeTeam: {
      name: "PSG",
      shortName: "PSG",
    },
    awayTeam: {
      name: "Marseille",
      shortName: "MAR",
    },
    league: "Ligue 1",
    date: "Dec 15",
    time: "20:45",
    venue: "Parc des Princes",
    isNotificationSet: false,
  },
  {
    id: "7",
    homeTeam: {
      name: "Juventus",
      shortName: "JUV",
    },
    awayTeam: {
      name: "Napoli",
      shortName: "NAP",
    },
    league: "Serie A",
    date: "Dec 16",
    time: "18:00",
    venue: "Allianz Stadium",
    isNotificationSet: false,
  },
  {
    id: "8",
    homeTeam: {
      name: "Atletico Madrid",
      shortName: "ATM",
    },
    awayTeam: {
      name: "Sevilla",
      shortName: "SEV",
    },
    league: "La Liga",
    date: "Dec 17",
    time: "21:00",
    venue: "Wanda Metropolitano",
    isNotificationSet: true,
  },
];

export const mockContentItems: ContentItem[] = [
  {
    id: "1",
    title: "Manchester United's Stunning Comeback Against Liverpool",
    excerpt:
      "In a thrilling encounter at Old Trafford, Manchester United staged a remarkable comeback to defeat their rivals Liverpool in what many are calling the match of the season.",
    imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=450&fit=crop",
    category: "Match Report",
    author: "John Smith",
    publishedAt: "2 hours ago",
    readTime: "5 min read",
    tags: ["Premier League", "Manchester United", "Liverpool"],
    isBookmarked: false,
  },
  {
    id: "2",
    title: "Transfer News: Top 10 Players Who Could Move in January",
    excerpt:
      "With the January transfer window approaching, we look at the biggest names who could be on the move and where they might end up.",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop",
    category: "Transfer News",
    author: "Sarah Johnson",
    publishedAt: "4 hours ago",
    readTime: "8 min read",
    tags: ["Transfers", "January Window"],
    isBookmarked: true,
  },
  {
    id: "3",
    title: "Champions League Preview: Quarter-Final Draw Analysis",
    excerpt:
      "Breaking down all the quarter-final matchups and predicting which teams will advance to the semi-finals of Europe's premier club competition.",
    imageUrl: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&h=450&fit=crop",
    category: "Analysis",
    author: "Mike Williams",
    publishedAt: "6 hours ago",
    readTime: "10 min read",
    tags: ["Champions League", "Analysis"],
    isBookmarked: false,
  },
  {
    id: "4",
    title: "Rising Stars: Young Players to Watch This Season",
    excerpt:
      "From teenage sensations to breakthrough performers, these are the young talents making waves across Europe's top leagues.",
    imageUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=450&fit=crop",
    category: "Features",
    author: "Emma Davis",
    publishedAt: "Yesterday",
    readTime: "7 min read",
    tags: ["Young Players", "Talent"],
    isBookmarked: false,
  },
  {
    id: "5",
    title: "Tactical Breakdown: How Modern Teams Press High",
    excerpt:
      "An in-depth look at the evolution of pressing in modern football and how top managers implement their pressing systems.",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=450&fit=crop",
    category: "Tactics",
    author: "David Brown",
    publishedAt: "2 days ago",
    readTime: "12 min read",
    tags: ["Tactics", "Analysis"],
    isBookmarked: false,
  },
];

export const mockQuickStats = [
  {
    id: "1",
    name: "Manchester United",
    stat: "League Position",
    value: "3rd",
    trend: "up" as const,
    change: "+2",
  },
  {
    id: "2",
    name: "Liverpool",
    stat: "Goals Scored",
    value: "42",
    trend: "up" as const,
    change: "+3",
  },
  {
    id: "3",
    name: "Erling Haaland",
    stat: "Season Goals",
    value: "18",
    trend: "up" as const,
    change: "+2",
  },
  {
    id: "4",
    name: "Arsenal",
    stat: "Clean Sheets",
    value: "8",
    trend: "neutral" as const,
    change: "0",
  },
];

export const mockTrendingTopics = [
  {
    id: "1",
    name: "ElClasico",
    category: "La Liga",
    count: 125000,
    href: "/search?q=ElClasico",
  },
  {
    id: "2",
    name: "ChampionsLeague",
    category: "UEFA",
    count: 98000,
    href: "/search?q=ChampionsLeague",
  },
  {
    id: "3",
    name: "TransferNews",
    category: "Transfers",
    count: 76000,
    href: "/search?q=TransferNews",
  },
  {
    id: "4",
    name: "PremierLeague",
    category: "England",
    count: 54000,
    href: "/search?q=PremierLeague",
  },
  {
    id: "5",
    name: "WorldCup2026",
    category: "FIFA",
    count: 43000,
    href: "/search?q=WorldCup2026",
  },
];

export const mockMatchEvents = [
  {
    id: "1",
    type: "goal",
    minute: 23,
    team: "home",
    player: "Marcus Rashford",
    assist: "Bruno Fernandes",
  },
  {
    id: "2",
    type: "yellow_card",
    minute: 34,
    team: "away",
    player: "Virgil van Dijk",
  },
  {
    id: "3",
    type: "goal",
    minute: 45,
    team: "away",
    player: "Mohamed Salah",
    assist: "Trent Alexander-Arnold",
  },
  {
    id: "4",
    type: "substitution",
    minute: 55,
    team: "home",
    playerIn: "Alejandro Garnacho",
    playerOut: "Antony",
  },
  {
    id: "5",
    type: "goal",
    minute: 67,
    team: "home",
    player: "Rasmus Højlund",
    assist: "Marcus Rashford",
  },
];

export const mockMatchStats = {
  possession: { home: 48, away: 52 },
  shots: { home: 14, away: 11 },
  shotsOnTarget: { home: 6, away: 4 },
  corners: { home: 5, away: 7 },
  fouls: { home: 12, away: 9 },
  yellowCards: { home: 1, away: 2 },
  redCards: { home: 0, away: 0 },
};

export const mockLeagues = [
  {
    id: "1",
    name: "Premier League",
    country: "England",
    logo: "",
    teams: 20,
    currentMatchday: 15,
  },
  {
    id: "2",
    name: "La Liga",
    country: "Spain",
    logo: "",
    teams: 20,
    currentMatchday: 16,
  },
  {
    id: "3",
    name: "Bundesliga",
    country: "Germany",
    logo: "",
    teams: 18,
    currentMatchday: 14,
  },
  {
    id: "4",
    name: "Serie A",
    country: "Italy",
    logo: "",
    teams: 20,
    currentMatchday: 15,
  },
  {
    id: "5",
    name: "Ligue 1",
    country: "France",
    logo: "",
    teams: 18,
    currentMatchday: 15,
  },
];

export const mockUserPreferences = {
  favoriteTeams: ["Manchester United", "Real Madrid"],
  favoritePlayers: ["Erling Haaland", "Kylian Mbappé"],
  favoriteLeagues: ["Premier League", "La Liga", "Champions League"],
  notificationSettings: {
    matchStart: true,
    goals: true,
    finalScore: true,
    lineups: false,
    transfers: true,
  },
};
