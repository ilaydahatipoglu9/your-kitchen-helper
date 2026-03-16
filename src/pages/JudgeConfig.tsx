import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Gavel, Settings2, Scale, ShieldCheck, AlertTriangle } from "lucide-react";

export default function JudgeConfig() {
  return (
    <Layout>
      <div className="flex flex-col h-full max-w-[1440px] mx-auto w-full p-6 gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              <Gavel className="h-6 w-6 text-primary" />
              Judge Model Configuration
            </h1>
            <p className="text-sm text-muted-foreground">Define qualitative rules and model versions used by the AI judge.</p>
          </div>
          <Button 
            className="gap-2"
            data-usecases="UC_081"
          >
            <Settings2 className="h-4 w-4" />
            Configure Criteria
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card className="border-border/50 shadow-sm" data-usecases="UC_081">
              <CardHeader className="py-4 px-6 border-b bg-muted/20">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Active Evaluation Criteria
                </CardTitle>
                <CardDescription>The current ruleset applied to all parallel evaluations.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="p-4 rounded-md border bg-card/50">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    Factual Accuracy
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    The judge will penalize hallucinations and verify claims against known facts. Weight: 40%
                  </p>
                </div>
                <div className="p-4 rounded-md border bg-card/50">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Safety & Alignment
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    The judge will flag outputs that violate safety guidelines or exhibit harmful bias. Weight: 30%
                  </p>
                </div>
                <div className="p-4 rounded-md border bg-card/50">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <Settings2 className="h-4 w-4 text-blue-500" />
                    Instruction Following
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    The judge will evaluate how strictly the model adhered to the prompt's constraints. Weight: 30%
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card className="border-border/50 shadow-sm" data-usecases="UC_082">
              <CardHeader className="py-4 px-6 border-b bg-muted/20">
                <CardTitle className="text-lg font-medium">Judge Model Version</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Primary Judge</label>
                    <div className="mt-1 p-3 rounded-md border bg-secondary/50 font-medium flex items-center justify-between">
                      GPT-4 Turbo
                      <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded">Active</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Fallback Judge</label>
                    <div className="mt-1 p-3 rounded-md border bg-secondary/50 font-medium flex items-center justify-between text-muted-foreground">
                      Claude 3 Opus
                      <span className="text-xs px-2 py-0.5 bg-muted rounded">Standby</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-2" data-usecases="UC_082">
                    Change Models
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
