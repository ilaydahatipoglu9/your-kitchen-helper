import { Link } from "react-router-dom";
import { Trophy, Zap, Bell, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Live Scores",
    description: "Get real-time score updates for all your favorite sports and teams.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Receive personalized alerts for goals, match starts, and final scores.",
  },
  {
    icon: Users,
    title: "Follow Teams",
    description: "Follow your favorite teams and players to get customized content.",
  },
  {
    icon: Trophy,
    title: "Comprehensive Stats",
    description: "Access detailed statistics, lineups, and match analysis.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="font-heading text-lg font-bold text-primary-foreground">SH</span>
            </div>
            <span className="font-heading text-xl font-bold">Sports Hub</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/auth/signin">
              <Button variant="ghost" data-usecases="UC_269">Sign In</Button>
            </Link>
            <Link to="/auth/signup">
              <Button data-usecases="UC_269,UC_001">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Your Ultimate Sports Companion
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Stay connected to the sports you love with live scores, personalized updates, 
            and comprehensive statistics all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto" data-usecases="UC_269,UC_001">
                Start Free
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link to="/discover">
              <Button size="lg" variant="outline" className="w-full sm:w-auto" data-usecases="UC_103">
                Explore Sports
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12">
            Everything You Need
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of sports fans who trust Sports Hub for their daily sports updates.
          </p>
          <Link to="/auth/signup">
            <Button size="lg" data-usecases="UC_269,UC_001">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="font-heading text-sm font-bold text-primary-foreground">SH</span>
            </div>
            <span className="font-heading font-bold">Sports Hub</span>
          </div>
          <p className="text-sm text-muted-foreground">
            2024 Sports Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
