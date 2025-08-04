import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, ExternalLink } from "lucide-react";

const Azurebot = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Azure Speech Bot</h1>
        </div>

        {/* Azure Speech SDK Interface */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Azure Speech SDK Sample</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <AlertDescription>
                This is the Azure Speech SDK sample interface. You'll need to provide your Azure Speech Service subscription key and region to use the features.
              </AlertDescription>
            </Alert>

            <div className="w-full h-[800px] border rounded-lg overflow-hidden">
              <iframe
                title="Azure Speech SDK"
                src="/browser/index.html"
                allow="microphone"
                style={{ width: '100%', height: '100%', border: 'none' }}
                sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
              />
            </div>
          </CardContent>
        </Card>

        {/* Additional Options */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Speech Recognition</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Test Azure's speech-to-text capabilities with microphone input or audio files.
              </p>
              <Button
                variant="outline"
                onClick={() => window.open('/browser/index.html', '_blank')}
                className="gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open in New Tab
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dialog Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Test Azure's dialog service connector for conversational AI applications.
              </p>
              <Button
                variant="outline"
                onClick={() => window.open('/browser/dialog/DialogServiceConnectorSample.html', '_blank')}
                className="gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open Dialog Sample
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Azurebot;
