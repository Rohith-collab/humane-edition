// In your React component
import React from 'react';

const SpeechIframe = () => {
  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <iframe
        title="Azure Speech SDK"
        src="http://127.0.0.1:5500/"
        allow="microphone" // Ensure this file is served publicly (see below)
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
};

export default SpeechIframe;
