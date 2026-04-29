import { Match } from "@/components/sports/MatchCard";
import { Team } from "@/components/sports/TeamCard";
import { Player } from "@/components/sports/PlayerCard";
import { League } from "@/components/sports/LeagueCard";
import { NewsArticle } from "@/components/sports/NewsCard";

// Helper to generate dates
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

export const mockLiveMatches: Match[] = [
  {
    id: "live-1",
    homeTeam: {
      id: "team-lal",
      name: "Los Angeles Lakers",
      shortName: "LAL",
    },
    awayTeam: {
      id: "team-gsw",
      name: "Golden State Warriors",
      shortName: "GSW",
    },
    homeScore: 87,
    awayScore: 82,
    status: "live",
    minute: 28,
    startTime: new Date(now.getTime() - 90 * 60000).toISOString(),
    league: { id: "league-nba", name: "NBA" },
    sport: "Basketball",
    venue: "Crypto.com Arena",
  },
  {
    id: "live-2",
    homeTeam: {
      id: "team-mun",
      name: "Manchester United",
      shortName: "Man Utd",
      logo: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=100&h=100&fit=crop",
    },
    awayTeam: {
      id: "team-liv",
      name: "Liverpool FC",
      shortName: "Liverpool",
      logo: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=100&h=100&fit=crop",
    },
    homeScore: 2,
    awayScore: 1,
    status: "live",
    minute: 67,
    startTime: new Date(now.getTime() - 67 * 60000).toISOString(),
    league: { id: "league-epl", name: "Premier League" },
    sport: "Football",
    venue: "Old Trafford",
  },
  {
    id: "live-3",
    homeTeam: {
      id: "team-rma",
      name: "Real Madrid",
      shortName: "Real Madrid",
      logo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&h=100&fit=crop",
    },
    awayTeam: {
      id: "team-bar",
      name: "FC Barcelona",
      shortName: "Barcelona",
    },
    homeScore: 1,
    awayScore: 1,
    status: "live",
    minute: 45,
    startTime: new Date(now.getTime() - 45 * 60000).toISOString(),
    league: { id: "league-laliga", name: "La Liga" },
    sport: "Football",
    venue: "Santiago Bernabeu",
  },
];

export const mockUpcomingMatches: Match[] = [
  {
    id: "upcoming-1",
    homeTeam: {
      id: "team-che",
      name: "Chelsea FC",
      shortName: "Chelsea",
    },
    awayTeam: {
      id: "team-ars",
      name: "Arsenal FC",
      shortName: "Arsenal",
    },
    status: "upcoming",
    startTime: new Date(today.getTime() + 19 * 60 * 60000).toISOString(),
    league: { id: "league-epl", name: "Premier League" },
    sport: "Football",
    venue: "Stamford Bridge",
  },
  {
    id: "upcoming-2",
    homeTeam: {
      id: "team-bay",
      name: "Bayern Munich",
      shortName: "Bayern",
    },
    awayTeam: {
      id: "team-bvb",
      name: "Borussia Dortmund",
      shortName: "Dortmund",
    },
    status: "upcoming",
    startTime: new Date(tomorrow.getTime() + 15 * 60 * 60000).toISOString(),
    league: { id: "league-bund", name: "Bundesliga" },
    sport: "Football",
    venue: "Allianz Arena",
  },
  {
    id: "upcoming-3",
    homeTeam: {
      id: "team-bos",
      name: "Boston Celtics",
      shortName: "Celtics",
    },
    awayTeam: {
      id: "team-mia",
      name: "Miami Heat",
      shortName: "Heat",
    },
    status: "upcoming",
    startTime: new Date(tomorrow.getTime() + 20 * 60 * 60000).toISOString(),
    league: { id: "league-nba", name: "NBA" },
    sport: "Basketball",
    venue: "TD Garden",
  },
  {
    id: "upcoming-4",
    homeTeam: {
      id: "player-djok",
      name: "Novak Djokovic",
      shortName: "Djokovic",
    },
    awayTeam: {
      id: "player-alc",
      name: "Carlos Alcaraz",
      shortName: "Alcaraz",
    },
    status: "upcoming",
    startTime: new Date(tomorrow.getTime() + 14 * 60 * 60000).toISOString(),
    league: { id: "league-atp", name: "ATP Tour" },
    sport: "Tennis",
    venue: "Centre Court",
  },
];

export const mockCompletedMatches: Match[] = [
  {
    id: "completed-1",
    homeTeam: {
      id: "team-mci",
      name: "Manchester City",
      shortName: "Man City",
    },
    awayTeam: {
      id: "team-tot",
      name: "Tottenham Hotspur",
      shortName: "Spurs",
    },
    homeScore: 3,
    awayScore: 1,
    status: "completed",
    startTime: new Date(yesterday.getTime() + 15 * 60 * 60000).toISOString(),
    league: { id: "league-epl", name: "Premier League" },
    sport: "Football",
    venue: "Etihad Stadium",
  },
  {
    id: "completed-2",
    homeTeam: {
      id: "team-acm",
      name: "AC Milan",
      shortName: "Milan",
    },
    awayTeam: {
      id: "team-int",
      name: "Inter Milan",
      shortName: "Inter",
    },
    homeScore: 2,
    awayScore: 2,
    status: "completed",
    startTime: new Date(yesterday.getTime() + 20 * 60 * 60000).toISOString(),
    league: { id: "league-seria", name: "Serie A" },
    sport: "Football",
    venue: "San Siro",
  },
  {
    id: "completed-3",
    homeTeam: {
      id: "team-phx",
      name: "Phoenix Suns",
      shortName: "Suns",
    },
    awayTeam: {
      id: "team-den",
      name: "Denver Nuggets",
      shortName: "Nuggets",
    },
    homeScore: 110,
    awayScore: 115,
    status: "completed",
    startTime: new Date(yesterday.getTime() + 22 * 60 * 60000).toISOString(),
    league: { id: "league-nba", name: "NBA" },
    sport: "Basketball",
    venue: "Footprint Center",
  },
];

export const mockNews: NewsArticle[] = [
  {
    id: "news-1",
    title: "Champions League Quarter-Finals Draw Revealed",
    summary: "The draw for the Champions League quarter-finals has been completed, with some exciting matchups on the horizon.",
    thumbnail: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=300&fit=crop",
    source: "Sports Daily",
    publishedAt: new Date(now.getTime() - 2 * 60 * 60000).toISOString(),
    category: "Champions League",
    sport: "Football",
  },
  {
    id: "news-2",
    title: "NBA Playoffs: Teams to Watch This Season",
    summary: "As the regular season winds down, we look at the teams most likely to make a deep playoff run.",
    thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
    source: "Basketball Weekly",
    publishedAt: new Date(now.getTime() - 5 * 60 * 60000).toISOString(),
    category: "Analysis",
    sport: "Basketball",
  },
  {
    id: "news-3",
    title: "Transfer Window: Top Deals to Expect",
    summary: "With the transfer window approaching, here are the biggest moves that could shake up the football world.",
    thumbnail: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400&h=300&fit=crop",
    source: "Transfer Talk",
    publishedAt: new Date(now.getTime() - 8 * 60 * 60000).toISOString(),
    category: "Transfers",
    sport: "Football",
  },
  {
    id: "news-4",
    title: "Wimbledon Preparations Begin for Top Seeds",
    summary: "The grass court season is upon us as players prepare for the prestigious Wimbledon tournament.",
    thumbnail: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop",
    source: "Tennis World",
    publishedAt: new Date(now.getTime() - 12 * 60 * 60000).toISOString(),
    category: "Tournament",
    sport: "Tennis",
  },
];

export const mockTeams: Team[] = [
  {
    id: "team-mun",
    name: "Manchester United",
    shortName: "Man Utd",
    logo: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=100&h=100&fit=crop",
    sport: "Football",
    league: { id: "league-epl", name: "Premier League" },
    country: "England",
    isFollowed: true,
  },
  {
    id: "team-liv",
    name: "Liverpool FC",
    shortName: "Liverpool",
    logo: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=100&h=100&fit=crop",
    sport: "Football",
    league: { id: "league-epl", name: "Premier League" },
    country: "England",
    isFollowed: false,
  },
  {
    id: "team-rma",
    name: "Real Madrid",
    shortName: "Real Madrid",
    logo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&h=100&fit=crop",
    sport: "Football",
    league: { id: "league-laliga", name: "La Liga" },
    country: "Spain",
    isFollowed: true,
  },
  {
    id: "team-lal",
    name: "Los Angeles Lakers",
    shortName: "Lakers",
    sport: "Basketball",
    league: { id: "league-nba", name: "NBA" },
    country: "USA",
    isFollowed: false,
  },
  {
    id: "team-gsw",
    name: "Golden State Warriors",
    shortName: "Warriors",
    sport: "Basketball",
    league: { id: "league-nba", name: "NBA" },
    country: "USA",
    isFollowed: true,
  },
];

export const mockPlayers: Player[] = [
  {
    id: "player-1",
    name: "Marcus Rashford",
    photo: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100&h=100&fit=crop",
    position: "Forward",
    nationality: "England",
    team: { id: "team-mun", name: "Manchester United" },
    sport: "Football",
    jerseyNumber: 10,
    isFollowed: true,
  },
  {
    id: "player-2",
    name: "Mohamed Salah",
    photo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&h=100&fit=crop",
    position: "Forward",
    nationality: "Egypt",
    team: { id: "team-liv", name: "Liverpool FC" },
    sport: "Football",
    jerseyNumber: 11,
    isFollowed: false,
  },
  {
    id: "player-3",
    name: "Vinicius Junior",
    position: "Winger",
    nationality: "Brazil",
    team: { id: "team-rma", name: "Real Madrid" },
    sport: "Football",
    jerseyNumber: 7,
    isFollowed: true,
  },
  {
    id: "player-4",
    name: "LeBron James",
    position: "Small Forward",
    nationality: "USA",
    team: { id: "team-lal", name: "Los Angeles Lakers" },
    sport: "Basketball",
    jerseyNumber: 23,
    isFollowed: true,
  },
  {
    id: "player-5",
    name: "Stephen Curry",
    position: "Point Guard",
    nationality: "USA",
    team: { id: "team-gsw", name: "Golden State Warriors" },
    sport: "Basketball",
    jerseyNumber: 30,
    isFollowed: false,
  },
];

export const mockLeagues: League[] = [
  {
    id: "league-epl",
    name: "Premier League",
    sport: "Football",
    country: "England",
    season: "2024-25",
    teamsCount: 20,
  },
  {
    id: "league-laliga",
    name: "La Liga",
    sport: "Football",
    country: "Spain",
    season: "2024-25",
    teamsCount: 20,
  },
  {
    id: "league-nba",
    name: "NBA",
    sport: "Basketball",
    country: "USA",
    season: "2024-25",
    teamsCount: 30,
  },
  {
    id: "league-bund",
    name: "Bundesliga",
    sport: "Football",
    country: "Germany",
    season: "2024-25",
    teamsCount: 18,
  },
  {
    id: "league-atp",
    name: "ATP Tour",
    sport: "Tennis",
    country: "International",
    season: "2024",
  },
  {
    id: "league-seria",
    name: "Serie A",
    sport: "Football",
    country: "Italy",
    season: "2024-25",
    teamsCount: 20,
  },
];

export const mockNotifications = [
  {
    id: "notif-1",
    type: "score_update" as const,
    title: "Goal! Manchester United 2-1 Liverpool",
    message: "Marcus Rashford scores in the 67th minute",
    timestamp: new Date(now.getTime() - 5 * 60000).toISOString(),
    read: false,
    matchId: "live-2",
  },
  {
    id: "notif-2",
    type: "match_start" as const,
    title: "Match Started: Real Madrid vs Barcelona",
    message: "El Clasico is now live!",
    timestamp: new Date(now.getTime() - 45 * 60000).toISOString(),
    read: false,
    matchId: "live-3",
  },
  {
    id: "notif-3",
    type: "match_reminder" as const,
    title: "Upcoming: Chelsea vs Arsenal",
    message: "Match starts in 2 hours",
    timestamp: new Date(now.getTime() - 60 * 60000).toISOString(),
    read: true,
    matchId: "upcoming-1",
  },
  {
    id: "notif-4",
    type: "final_score" as const,
    title: "Full Time: Manchester City 3-1 Tottenham",
    message: "Manchester City wins at home",
    timestamp: new Date(yesterday.getTime() + 17 * 60 * 60000).toISOString(),
    read: true,
    matchId: "completed-1",
  },
];

export const mockSports = [
  { id: "football", name: "Football" },
  { id: "basketball", name: "Basketball" },
  { id: "tennis", name: "Tennis" },
  { id: "cricket", name: "Cricket" },
  { id: "baseball", name: "Baseball" },
  { id: "hockey", name: "Hockey" },
];

export const mockMatchEvents = [
  {
    id: "event-1",
    matchId: "live-2",
    type: "goal" as const,
    minute: 23,
    team: "home",
    player: "Bruno Fernandes",
    description: "Goal from outside the box",
  },
  {
    id: "event-2",
    matchId: "live-2",
    type: "yellow_card" as const,
    minute: 35,
    team: "away",
    player: "Virgil van Dijk",
    description: "Foul on Marcus Rashford",
  },
  {
    id: "event-3",
    matchId: "live-2",
    type: "goal" as const,
    minute: 52,
    team: "away",
    player: "Mohamed Salah",
    description: "Header from corner kick",
  },
  {
    id: "event-4",
    matchId: "live-2",
    type: "goal" as const,
    minute: 67,
    team: "home",
    player: "Marcus Rashford",
    description: "Counter-attack finish",
  },
  {
    id: "event-5",
    matchId: "live-2",
    type: "substitution" as const,
    minute: 70,
    team: "home",
    player: "Alejandro Garnacho",
    description: "Replaces Antony",
  },
];

export const mockMatchStats = {
  possession: { home: 52, away: 48 },
  shots: { home: 14, away: 11 },
  shotsOnTarget: { home: 6, away: 4 },
  corners: { home: 7, away: 5 },
  fouls: { home: 12, away: 14 },
  yellowCards: { home: 1, away: 2 },
  redCards: { home: 0, away: 0 },
};

export const mockLineup = {
  home: {
    formation: "4-2-3-1",
    players: [
      { id: "p1", name: "Andre Onana", position: "GK", number: 24 },
      { id: "p2", name: "Diogo Dalot", position: "RB", number: 20 },
      { id: "p3", name: "Raphael Varane", position: "CB", number: 19 },
      { id: "p4", name: "Lisandro Martinez", position: "CB", number: 6 },
      { id: "p5", name: "Luke Shaw", position: "LB", number: 23 },
      { id: "p6", name: "Casemiro", position: "CDM", number: 18 },
      { id: "p7", name: "Kobbie Mainoo", position: "CM", number: 37 },
      { id: "p8", name: "Antony", position: "RW", number: 21 },
      { id: "p9", name: "Bruno Fernandes", position: "CAM", number: 8 },
      { id: "p10", name: "Marcus Rashford", position: "LW", number: 10 },
      { id: "p11", name: "Rasmus Hojlund", position: "ST", number: 11 },
    ],
  },
  away: {
    formation: "4-3-3",
    players: [
      { id: "p12", name: "Alisson Becker", position: "GK", number: 1 },
      { id: "p13", name: "Trent Alexander-Arnold", position: "RB", number: 66 },
      { id: "p14", name: "Virgil van Dijk", position: "CB", number: 4 },
      { id: "p15", name: "Ibrahima Konate", position: "CB", number: 5 },
      { id: "p16", name: "Andrew Robertson", position: "LB", number: 26 },
      { id: "p17", name: "Alexis Mac Allister", position: "CM", number: 10 },
      { id: "p18", name: "Dominik Szoboszlai", position: "CM", number: 8 },
      { id: "p19", name: "Ryan Gravenberch", position: "CM", number: 38 },
      { id: "p20", name: "Mohamed Salah", position: "RW", number: 11 },
      { id: "p21", name: "Darwin Nunez", position: "ST", number: 9 },
      { id: "p22", name: "Luis Diaz", position: "LW", number: 7 },
    ],
  },
};
