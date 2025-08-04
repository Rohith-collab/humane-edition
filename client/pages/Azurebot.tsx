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

            <div className="w-full h-[800px] border rounded-lg overflow-hidden bg-card">
              <div className="p-6 h-full flex flex-col">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Web Speech API Demo</h3>
                  <p className="text-sm text-muted-foreground">
                    Click the microphone button to start speech recognition using your browser's Web Speech API.
                  </p>
                </div>

                <div className="flex-1 flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <Button
                      id="start-btn"
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2"
                      onClick={() => {
                        const startBtn = document.getElementById('start-btn');
                        const output = document.getElementById('speech-output');

                        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                          const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
                          const recognition = new SpeechRecognition();

                          recognition.continuous = true;
                          recognition.interimResults = true;
                          recognition.lang = 'en-US';

                          recognition.onstart = () => {
                            if (startBtn) startBtn.textContent = 'Listening...';
                            if (output) output.textContent = 'Listening... Speak now!';
                          };

                          recognition.onresult = (event: any) => {
                            let transcript = '';
                            for (let i = event.resultIndex; i < event.results.length; i++) {
                              if (event.results[i].isFinal) {
                                transcript += event.results[i][0].transcript + ' ';
                              }
                            }
                            if (output) output.textContent = transcript;
                          };

                          recognition.onerror = (event: any) => {
                            if (output) output.textContent = 'Error: ' + event.error;
                            if (startBtn) startBtn.textContent = 'Start Recording';
                          };

                          recognition.onend = () => {
                            if (startBtn) startBtn.textContent = 'Start Recording';
                          };

                          recognition.start();
                        } else {
                          if (output) output.textContent = 'Speech recognition not supported in this browser.';
                        }
                      }}
                    >
                      🎤 Start Recording
                    </Button>

                    <div className="text-sm text-muted-foreground">
                      Supports: Chrome, Edge, Safari (with permissions)
                    </div>
                  </div>

                  <div className="flex-1 bg-muted/50 rounded-lg p-4">
                    <div className="text-sm font-medium mb-2">Speech Output:</div>
                    <div
                      id="speech-output"
                      className="min-h-[200px] p-3 bg-background rounded border text-foreground"
                    >
                      Click "Start Recording" and speak into your microphone...
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Note: This demo uses the browser's built-in Web Speech API. For Azure Speech Services, you would need to provide your subscription key and implement the Azure SDK integration.
                  </div>
                </div>
              </div>
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
