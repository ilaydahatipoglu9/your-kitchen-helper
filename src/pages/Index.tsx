import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { LiveTicker } from "@/components/layout/LiveTicker";
import { CentralFeed } from "@/components/feed/CentralFeed";
import { DeepDivePanel } from "@/components/feed/DeepDivePanel";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { UserPreferenceModal } from "@/components/profile/UserPreferenceModal";
import { UserProfileModal } from "@/components/profile/UserProfileModal";

const Index = () => {
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
      <Sidebar
        onSearchClick={() => setIsSearchOpen(true)}
        onProfileClick={() => setIsProfileOpen(true)}
        onSettingsClick={() => setIsPreferencesOpen(true)}
      />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <LiveTicker />
        
        <div className="flex-1 flex overflow-hidden relative">
          <CentralFeed onMatchSelect={setSelectedMatchId} />
          
          <DeepDivePanel
            matchId={selectedMatchId}
            onClose={() => setSelectedMatchId(null)}
          />
        </div>
      </div>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <UserPreferenceModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
      />
    </div>
  );
};

export default Index;
