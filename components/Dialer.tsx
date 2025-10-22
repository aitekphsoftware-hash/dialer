import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { CallState, TranscriptEntry } from '../types';
import { Icon } from './Icon';
import { IVR_MESSAGE } from '../constants';

interface DialerProps {
  playDtmf: () => void;
  playRing: () => void;
  stopRing: () => void;
  isMobile?: boolean;
}

// FIX: Changed component to a const with React.FC to resolve key prop issue.
interface KeypadButtonProps {
  value: string;
  onClick: (val: string) => void;
}

const KeypadButton: React.FC<KeypadButtonProps> = ({ value, onClick }) => {
  return (
    <button
      onClick={() => onClick(value)}
      className="bg-gray-600/50 h-14 w-14 rounded-full text-2xl font-light text-white flex items-center justify-center hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
    >
      {value}
    </button>
  );
};

export const Dialer = ({ playDtmf, playRing, stopRing, isMobile = false }: DialerProps) => {
  const {
    callState,
    setCallState,
    selectedTemplate,
    dialerNumber,
    setDialerNumber,
    transcript,
    addToTranscript,
    updateLastTranscript,
    clearTranscript,
  } = useAppContext();
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const callTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  
  const speak = (text: string, onEnd?: () => void) => {
    if ('speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = 0.7;
      utterance.rate = 1.0;
      
      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          const partialText = text.substring(0, event.charIndex + event.charLength);
          updateLastTranscript({ text: partialText });
        }
      };

      utterance.onend = () => {
        updateLastTranscript({ text, isSpeaking: false });
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } else {
        // Fallback for no speech synthesis or empty text
        updateLastTranscript({ text, isSpeaking: false });
        if (onEnd) onEnd();
    }
  };


  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);
  
  useEffect(() => {
     // Cleanup timeouts and sounds on unmount or state change
    return () => {
      if (callTimeoutRef.current) {
        clearTimeout(callTimeoutRef.current);
      }
      stopRing();
      window.speechSynthesis.cancel();
    }
  }, [stopRing]);

  const handleKeyPress = (value: string) => {
    if (callState === CallState.Idle || callState === CallState.Ended) {
      setDialerNumber(prev => (prev + value).slice(0, 12));
      playDtmf();
    }
  };

  const handleCall = () => {
    if (!selectedTemplate || !dialerNumber) return;

    clearTranscript();
    addToTranscript({ speaker: 'System', text: `Dialing ${dialerNumber}...` });
    setCallState(CallState.Ringing);
    playRing();
    
    // Ring for 2.8s, then play IVR
    callTimeoutRef.current = setTimeout(() => {
        stopRing();
        addToTranscript({ speaker: 'IVR', text: '', isSpeaking: true });
        speak(IVR_MESSAGE, () => {
            // After IVR finishes, wait a bit then play agent greeting
            callTimeoutRef.current = setTimeout(() => {
                if (!selectedTemplate) return;
                addToTranscript({ speaker: 'Agent', text: '', isSpeaking: true });
                speak(selectedTemplate.previewLine, () => {
                    setCallState(CallState.Connected);
                });
            }, 1000);
        });
    }, 2800);
  };
  
  const handleEndCall = () => {
    if (callTimeoutRef.current) {
        clearTimeout(callTimeoutRef.current);
    }
    stopRing();
    window.speechSynthesis.cancel();
    setCallState(CallState.Ended);
    addToTranscript({ speaker: 'System', text: 'Call Ended.' });

    // After a 2-second delay to show the 'Ended' state, reset to 'Idle'.
    // This fixes a bug where the state would get stuck on 'Ended'.
    setTimeout(() => {
        setCallState(CallState.Idle);
    }, 2000);
  };

  const isCalling = callState === CallState.Ringing || callState === CallState.Connected;

  return (
    <div className={`flex flex-col h-full ${isMobile ? 'max-h-[50vh]' : ''}`}>
      {!isMobile && <h2 className="text-lg font-bold text-white mb-2">Try it now</h2>}
      {selectedTemplate && (
        <p className="text-xs text-center text-teal-300 bg-teal-900/50 rounded-md py-1 px-2 mb-3">
          Selected: <span className="font-bold">{selectedTemplate.title}</span>
        </p>
      )}
      <div className={`bg-gray-900 rounded-lg p-4 flex-1 flex flex-col ${isMobile ? 'border border-gray-700' : ''}`}>
        <div id="transcript-box" className="flex-1 overflow-y-auto mb-4 bg-black/20 p-2 rounded-md min-h-[80px] text-sm space-y-2">
            {transcript.map((entry, index) => (
                <div key={index}>
                    <span className={`font-bold ${entry.speaker === 'IVR' ? 'text-cyan-400' : entry.speaker === 'Agent' ? 'text-amber-400' : 'text-gray-500'}`}>{entry.speaker}: </span>
                    <span className="text-gray-300 whitespace-pre-wrap break-words">
                        {entry.text}
                        {entry.isSpeaking && <span className="inline-block w-0.5 h-4 bg-teal-300 animate-pulse ml-1" style={{ transform: 'translateY(2px)' }}></span>}
                    </span>
                </div>
            ))}
            <div ref={transcriptEndRef} />
        </div>

        <input
            id="dialer-input"
            type="text"
            value={dialerNumber}
            readOnly
            placeholder="Enter number..."
            className="w-full bg-transparent text-center text-3xl text-white font-light tracking-wider mb-4 p-2 focus:outline-none"
        />

        <div className="grid grid-cols-3 gap-4 justify-items-center mb-4">
          {'123456789*0#'.split('').map(key => (
            <KeypadButton key={key} value={key} onClick={handleKeyPress} />
          ))}
        </div>
        
        <div className="flex justify-center gap-8">
            {isCalling ? (
                <button onClick={handleEndCall} className="bg-red-600 h-16 w-16 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-transform transform hover:scale-105">
                    <Icon icon="phone-hangup" className="w-8 h-8"/>
                </button>
            ) : (
                <button 
                    onClick={handleCall}
                    disabled={!dialerNumber || !selectedTemplate}
                    className="bg-green-600 h-16 w-16 rounded-full flex items-center justify-center text-white hover:bg-green-700 transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:transform-none">
                    <Icon icon="phone" className="w-8 h-8"/>
                </button>
            )}
        </div>
      </div>
    </div>
  );
};