import { Search, Bell, User, ChevronRight, Filter } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground">
        <span className="hover:text-foreground cursor-pointer transition-colors">My Files</span>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="hover:text-foreground cursor-pointer transition-colors">Documents</span>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="font-medium text-foreground">Work</span>
      </div>

      {/* Search & Profile */}
      <div className="flex items-center gap-4">
        <div className="relative w-64" data-usecases="UC_071">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search files..." 
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-background border border-input rounded-full focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
        </div>
        
        <button className="p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors" data-usecases="UC_037,UC_072,UC_075">
          <Filter className="w-5 h-5" />
        </button>

        <button className="p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 cursor-pointer">
          <User className="w-4 h-4 text-primary" />
        </div>
      </div>
    </header>
  );
}
