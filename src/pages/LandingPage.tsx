import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Radio,
  Calendar,
  Bell,
  Search,
  Heart,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: Radio,
    title: "Live Scores",
    description: "Real-time score updates from all your favorite sports and leagues.",
  },
  {
    icon: Calendar,
    title: "Match Schedules",
    description: "Never miss a game with comprehensive schedules and reminders.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Get alerts for goals, game starts, and important updates.",
  },
  {
    icon: Search,
    title: "Discover",
    description: "Find and follow teams, players, and leagues from around the world.",
  },
  {
    icon: Heart,
    title: "Personalized Feed",
    description: "Your sports content, tailored to your preferences.",
  },
  {
    icon: TrendingUp,
    title: "Stats & Analytics",
    description: "Deep dive into player and team statistics.",
  },
];

const sports = [
  { name: "Football", color: "bg-green-500" },
  { name: "Basketball", color: "bg-orange-500" },
  { name: "Baseball", color: "bg-red-500" },
  { name: "Hockey", color: "bg-blue-500" },
  { name: "Soccer", color: "bg-emerald-500" },
  { name: "Tennis", color: "bg-yellow-500" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="font-heading text-lg font-bold text-primary-foreground">S</span>
            </div>
            <span className="font-heading text-xl font-bold">Sports Hub</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container relative px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Your Ultimate{" "}
              <span className="text-primary">Sports Hub</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Track live scores, follow your favorite teams, and never miss a moment.
              All your sports content in one place.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link to="/signup">
                  Start Free
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <Link to="/discover">Explore Sports</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Ticker */}
      <section className="border-y bg-muted/50 py-6">
        <div className="container px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {sports.map((sport) => (
              <div
                key={sport.name}
                className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm"
              >
                <span className={`h-2.5 w-2.5 rounded-full ${sport.color}`} />
                <span className="text-sm font-medium">{sport.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold">
              Everything You Need
            </h2>
            <p className="mt-4 text-muted-foreground">
              Powerful features to keep you connected to the sports you love.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of sports fans who trust Sports Hub for their daily sports updates.
            </p>
            <Button size="lg" asChild>
              <Link to="/signup">
                Create Free Account
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="font-heading text-lg font-bold text-primary-foreground">S</span>
              </div>
              <span className="font-heading text-xl font-bold">Sports Hub</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/terms" className="hover:text-foreground">Terms</Link>
              <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
              <Link to="/contact" className="hover:text-foreground">Contact</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              2024 Sports Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
