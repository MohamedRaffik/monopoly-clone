import React, { useMemo } from 'react';

function App() {
  const ws = useMemo(() => new WebSocket('ws://localhost:8000/ws'), []);

  ws.onopen = () => {
    setInterval(() => ws.send(JSON.stringify({ 'message': 'HELLOO' })), 1000);
  };

  return (
    <div>
      
    </div>
  );
}

export default App;
