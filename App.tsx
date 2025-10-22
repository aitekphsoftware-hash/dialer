
import React from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { RightRail } from './components/RightRail';
import { Dialer } from './components/Dialer';
import { useSound } from './hooks/useSound';

function App() {
  const { play: playDtmf } = useSound('/dtmf.mp3');
  const { play: playRing, stop: stopRing } = useSound('/ring.mp3', { loop: true });

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <MainContent />
        </main>
        <RightRail>
          <Dialer playDtmf={playDtmf} playRing={playRing} stopRing={stopRing} />
        </RightRail>
      </div>
      {/* Mobile Dialer Dock */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-50 p-2">
         <Dialer playDtmf={playDtmf} playRing={playRing} stopRing={stopRing} isMobile={true} />
      </div>
    </div>
  );
}

export default App;
