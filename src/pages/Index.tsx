import * as React from "react";
import { AppStoreProvider, useAppStore } from "@/lib/appStore";
import { Sidebar } from "@/components/shell/Sidebar";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { SettingsDialog } from "@/components/settings/SettingsDialog";
import { ProfileDrawer } from "@/components/profile/ProfileDrawer";
import { OnboardingEmptyState } from "@/components/onboarding/OnboardingEmptyState";
import { Button } from "@/components/ui/button";

function MainShell() {
  const { state, actions } = useAppStore();
  const [authOpen, setAuthOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  const hasSelection = !!state.selectedConversationId;

  return (
    <div className="flex h-dvh w-full bg-background">
      <Sidebar onOpenSettings={() => setSettingsOpen(true)} onOpenProfile={() => setProfileOpen(true)} />

      <div className="flex min-w-0 flex-1 flex-col">
        {hasSelection ? <ChatPanel onOpenAuth={() => setAuthOpen(true)} /> : <OnboardingEmptyState />}

        {state.auth.status === "signed-in" && (
          <div className="pointer-events-none fixed bottom-4 right-4 hidden md:block">
            <div className="pointer-events-auto flex gap-2 rounded-full border bg-background/70 p-1 shadow-sm backdrop-blur">
              <Button variant="ghost" onClick={() => setSettingsOpen(true)} className="h-9 rounded-full">
                Settings
              </Button>
              <Button variant="ghost" onClick={() => actions.signOut()} className="h-9 rounded-full" data-usecases="UC_015">
                Sign out
              </Button>
            </div>
          </div>
        )}
      </div>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      <ProfileDrawer open={profileOpen} onOpenChange={setProfileOpen} />
    </div>
  );
}

const Index = () => {
  return (
    <AppStoreProvider>
      <MainShell />
    </AppStoreProvider>
  );
};

export default Index;
