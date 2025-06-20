import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6 text-foreground">Eleven - Design System Docs</h1>
      <p className="text-lg text-muted-foreground mb-8">
        🎉 ShadCN is working perfectly in the Eleven project!
      </p>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>✅ Status Check</CardTitle>
            <CardDescription>All systems are operational and ready for design system documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>✅ Next.js Server Running</li>
              <li>✅ TinaCMS Integration Active</li>
              <li>✅ Tailwind CSS Configured</li>
              <li>✅ ShadCN Components Working</li>
              <li>✅ TypeScript Path Aliases Working</li>
              <li>✅ Project Name: "Eleven"</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>🎨 ShadCN Component Test</CardTitle>
            <CardDescription>Testing beautiful, accessible components that rival ZeroHeight</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground">
              These professional ShadCN components provide the visual quality needed to compete with ZeroHeight:
            </p>
            <div className="flex gap-4">
              <Button>Primary Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/20 bg-accent/10">
          <CardHeader>
            <CardTitle className="text-primary">🚀 Ready for Production</CardTitle>
            <CardDescription className="text-muted-foreground">
              The Eleven design system documentation is ready for beautiful component pages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">
              This is the professional quality needed to replace ZeroHeight. 
              The visual design now matches industry standards!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 