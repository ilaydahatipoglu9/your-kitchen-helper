import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History as HistoryIcon, Filter, Download, BarChart3, Calendar, ChevronRight } from "lucide-react";

const MOCK_HISTORY = [
  { id: "eval-001", name: "Reasoning Benchmark Q3", date: "2024-05-12T10:30:00Z", models: ["GPT-4", "Claude 3"], avgTtft: "0.45s", winner: "Claude 3" },
  { id: "eval-002", name: "Code Generation Test", date: "2024-05-11T14:15:00Z", models: ["GPT-4", "Llama 3"], avgTtft: "0.62s", winner: "GPT-4" },
  { id: "eval-003", name: "Creative Writing Eval", date: "2024-05-10T09:00:00Z", models: ["Claude 3", "Gemini 1.5"], avgTtft: "0.38s", winner: "Tie" },
];

export default function History() {
  return (
    <Layout>
      <div className="flex flex-col h-full max-w-[1440px] mx-auto w-full p-6 gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              <HistoryIcon className="h-6 w-6 text-primary" />
              Evaluation History
            </h1>
            <p className="text-sm text-muted-foreground">Review past benchmarking sessions and export analytics.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="gap-2"
              data-usecases="UC_124"
            >
              <Filter className="h-4 w-4" />
              Filter Results
            </Button>
            <Button 
              variant="secondary" 
              className="gap-2"
              data-usecases="UC_126"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
          <Card className="bg-card/50 border-border/50" data-usecases="UC_037">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Evaluations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,284</div>
              <p className="text-xs text-emerald-500 mt-1">+12% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border/50" data-usecases="UC_037">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. TTFT (Global)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0.52s</div>
              <p className="text-xs text-emerald-500 mt-1">-0.05s improvement</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border/50" data-usecases="UC_037">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Top Performing Model</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">GPT-4 Turbo</div>
              <p className="text-xs text-muted-foreground mt-1">Based on Judge ratings</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 shadow-sm flex-1" data-usecases="UC_044,UC_079">
          <CardHeader className="py-4 px-6 border-b bg-muted/20">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Recent Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {MOCK_HISTORY.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 hover:bg-muted/10 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-md bg-secondary flex items-center justify-center border">
                      <Calendar className="h-5 w-5 text-secondary-foreground/70" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">{session.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <span>{new Date(session.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="font-mono">{session.id}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="flex flex-col items-end text-sm">
                      <span className="text-muted-foreground text-xs">Models Compared</span>
                      <div className="flex gap-1 mt-1">
                        {session.models.map(m => (
                          <span key={m} className="px-2 py-0.5 bg-background rounded border text-xs">{m}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end text-sm w-24">
                      <span className="text-muted-foreground text-xs">Avg TTFT</span>
                      <span className="font-mono mt-1">{session.avgTtft}</span>
                    </div>
                    <div className="flex flex-col items-end text-sm w-24">
                      <span className="text-muted-foreground text-xs">Judge Winner</span>
                      <span className="font-medium text-primary mt-1">{session.winner}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
