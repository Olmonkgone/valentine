import React, { useState, useRef, useEffect } from 'react';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Proposal from './components/Proposal';
import { Music } from 'lucide-react';

function App() {
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleStart = () => {
    setStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().then(() => {
        setPlaying(true);
      }).catch(e => console.log("Audio play failed (user interaction needed)", e));
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  return (
    <div className="font-sans text-gray-800 antialiased selection:bg-romantic-200 selection:text-romantic-900">
      {/* Background Music - You can replace the src with a real file */}
      <audio ref={audioRef} loop>
        <source src="https://assets.mixkit.co/music/preview/mixkit-love-story-piano-solo-29.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 bg-white/50 backdrop-blur-md p-3 rounded-full shadow-md hover:bg-white transition-all text-romantic-600"
      >
        <Music size={24} className={playing ? "animate-pulse" : "opacity-50"} />
      </button>

      {!started ? (
        <Hero onStart={handleStart} />
      ) : (
        <div className="animate-fade-in-up">
          <Timeline />
          <Proposal />

          <footer className="py-8 text-center text-romantic-400 text-sm">
            <p>Made with ❤️ for You</p>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
