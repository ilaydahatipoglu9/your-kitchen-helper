import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Server, Database, Globe, CheckCircle2, AlertCircle } from "lucide-react";

const MOCK_SERVICES = [
  { id: "srv-01", name: "OpenAI API Gateway", status: "operational", latency: "120ms", uptime: "99.99%" },
  { id: "srv-02", name: "Anthropic API Gateway", status: "operational", latency: "145ms", uptime: "99.95%" },
  { id: "srv-03", name: "Meta Llama Inference", status: "degraded", latency: "850ms", uptime: "98.50%" },
  { id: "srv-04", name: "Google Gemini API", status: "operational", latency: "110ms", uptime: "99.90%" },
  { id: "srv-05", name: "Evaluation Database", status: "operational", latency: "15ms", uptime: "100%" },
];

export default function SystemStatus() {
  return (
    <Layout>
      <div className="flex flex-col h-full max-w-[1440px] mx-auto w-full p-6 gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              System Health Monitoring
            </h1>
            <p className="text-sm text-muted-foreground">Transparency into the operational status of integrated LLM endpoints.</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            All Systems Operational
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
          <Card className="bg-card/50 border-border/50" data-usecases="UC_131">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">API Requests (24h)</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1.2M</div>
              <p className="text-xs text-emerald-500 mt-1">99.9% Success Rate</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border/50" data-usecases="UC_131">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Streams</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">42</div>
              <p className="text-xs text-muted-foreground mt-1">Across 12 sessions</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border/50" data-usecases="UC_131">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Database Load</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24%</div>
              <p className="text-xs text-emerald-500 mt-1">Healthy</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 shadow-sm flex-1" data-usecases="UC_127">
          <CardHeader className="py-4 px-6 border-b bg-muted/20">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Server className="h-5 w-5" />
              Service Availability
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {MOCK_SERVICES.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-4 hover:bg-muted/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-md bg-secondary flex items-center justify-center border">
                      {service.status === "operational" ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{service.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <span className="font-mono">{service.id}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="flex flex-col items-end text-sm w-24">
                      <span className="text-muted-foreground text-xs">Latency</span>
                      <span className={`font-mono mt-1 ${service.status === "degraded" ? "text-amber-500" : ""}`}>
                        {service.latency}
                      </span>
                    </div>
                    <div className="flex flex-col items-end text-sm w-24">
                      <span className="text-muted-foreground text-xs">Uptime (30d)</span>
                      <span className="font-mono mt-1">{service.uptime}</span>
                    </div>
                    <div className="w-24 flex justify-end">
                      {service.status === "operational" ? (
                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-xs rounded border border-emerald-500/20">
                          Operational
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-amber-500/10 text-amber-500 text-xs rounded border border-amber-500/20">
                          Degraded
                        </span>
                      )}
                    </div>
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
