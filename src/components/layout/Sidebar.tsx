import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Star, Users, Trophy, UserCircle, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface FollowedEntity {
  id: string;
  name: string;
  type: "team" | "league" | "player";
  logo?: string;
  isLive?: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

// Mock data for followed entities
const followedEntities: FollowedEntity[] = [
  { id: "1", name: "Manchester United", type: "team", isLive: true },
  { id: "2", name: "Real Madrid", type: "team", isLive: false },
  { id: "3", name: "Premier League", type: "league", isLive: true },
  { id: "4", name: "La Liga", type: "league", isLive: false },
  { id: "5", name: "Cristiano Ronaldo", type: "player", isLive: false },
  { id: "6", name: "Lionel Messi", type: "player", isLive: true },
];

const getEntityIcon = (type: FollowedEntity["type"]) => {
  switch (type) {
    case "team":
      return Users;
    case "league":
      return Trophy;
    case "player":
      return UserCircle;
    default:
      return Star;
  }
};

const getEntityPath = (entity: FollowedEntity) => {
  switch (entity.type) {
    case "team":
      return `/team/${entity.id}`;
    case "league":
      return `/league/${entity.id}`;
    case "player":
      return `/player/${entity.id}`;
    default:
      return "/";
  }
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  const groupedEntities = {
    teams: followedEntities.filter((e) => e.type === "team"),
    leagues: followedEntities.filter((e) => e.type === "league"),
    players: followedEntities.filter((e) => e.type === "player"),
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border bg-card transition-transform duration-300 lg:sticky lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <ScrollArea className="h-full py-4">
          <div className="px-4">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Star className="h-4 w-4 text-primary" />
              Following
            </h2>

            {/* Teams */}
            <div className="mb-4">
              <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Teams
              </h3>
              <ul className="space-y-1">
                {groupedEntities.teams.map((entity) => {
                  const Icon = getEntityIcon(entity.type);
                  const path = getEntityPath(entity);
                  const isActive = location.pathname === path;

                  return (
                    <li key={entity.id}>
                      <Link
                        to={path}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-accent"
                        )}
                        data-usecases="UC_007,UC_008"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="flex-1 truncate">{entity.name}</span>
                        {entity.isLive && (
                          <span className="flex items-center gap-1">
                            <Activity className="h-3 w-3 text-live animate-pulse-live" />
                            <span className="text-xs font-medium text-live">LIVE</span>
                          </span>
                        )}
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <Separator className="my-4" />

            {/* Leagues */}
            <div className="mb-4">
              <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Leagues
              </h3>
              <ul className="space-y-1">
                {groupedEntities.leagues.map((entity) => {
                  const Icon = getEntityIcon(entity.type);
                  const path = getEntityPath(entity);
                  const isActive = location.pathname === path;

                  return (
                    <li key={entity.id}>
                      <Link
                        to={path}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-accent"
                        )}
                        data-usecases="UC_007,UC_008"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="flex-1 truncate">{entity.name}</span>
                        {entity.isLive && (
                          <span className="flex items-center gap-1">
                            <Activity className="h-3 w-3 text-live animate-pulse-live" />
                            <span className="text-xs font-medium text-live">LIVE</span>
                          </span>
                        )}
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <Separator className="my-4" />

            {/* Players */}
            <div className="mb-4">
              <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Players
              </h3>
              <ul className="space-y-1">
                {groupedEntities.players.map((entity) => {
                  const Icon = getEntityIcon(entity.type);
                  const path = getEntityPath(entity);
                  const isActive = location.pathname === path;

                  return (
                    <li key={entity.id}>
                      <Link
                        to={path}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-accent"
                        )}
                        data-usecases="UC_007,UC_008"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="flex-1 truncate">{entity.name}</span>
                        {entity.isLive && (
                          <span className="flex items-center gap-1">
                            <Activity className="h-3 w-3 text-live animate-pulse-live" />
                            <span className="text-xs font-medium text-live">LIVE</span>
                          </span>
                        )}
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};

export default Sidebar;
