import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useStore } from '../store/useStore.js';
import { Captions, FileText, Search } from 'lucide-react';

const socket = io('http://localhost:5000');

const RealTsuggestion = () => {
  const [suggestions, setSuggestions] = useState([]); // Raw suggestions from backend
  const [displayedSuggestion, setDisplayedSuggestion] = useState(''); // Text being displayed with typing effect
  const [isTranscriptionMode, setIsTranscriptionMode] = useState(false);
  const containerRef = useRef(null);

  const { searchedClaim, searchClaim } = useStore();

  const [formData, setFormData] = useState({
    claimID: '',
  });

  // Listen for new suggestions from the socket
  useEffect(() => {
    socket.on('new_suggestion', (data) => {
      const formattedResponse = data.response
        .split('\n')
        .map((line) => `${line}`)
        .join('\n');

      // Add the new suggestion to the list
      setSuggestions((prev) => {
        const newSuggestions = [formattedResponse, ...prev];
        return newSuggestions.length > 2 ? [formattedResponse] : newSuggestions;
      });

      // Start the typing effect for the new suggestion
      startTypingEffect(formattedResponse);
    });

    return () => {
      socket.off('new_suggestion');
    };
  }, []);

  // Scroll to the bottom of the suggestions container when new suggestions are added
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedSuggestion]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    searchClaim(formData.claimID);
  };

  // Toggle between transcription and claim info modes
  const toggleMode = () => {
    setIsTranscriptionMode(!isTranscriptionMode);
  };

  // Typing effect logic
  const startTypingEffect = (text) => {
    setDisplayedSuggestion(''); // Clear the previous suggestion
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedSuggestion((prev) => {
        const newDisplayedText = text.slice(0, index);
        return newDisplayedText;
      });

      index++;
      if (index > text.length) {
        clearInterval(interval); // Stop the typing effect when complete
      }
    }, 20); // Adjust typing speed (milliseconds per character)
  };

  return (
    <div className="flex flex-row justify-evenly items-center h-screen z-1 font-dmsans">
      {/* Suggestions Container */}
      <div className="h-[70%] w-[60%] ml-[4rem] bg-[rgba(0,0,0,0.7)] rounded-2xl flex flex-col">
        <div className="h-[4rem] w-full bg-[rgba(0,0,0,0.8)] flex justify-between items-center pl-[0.5rem] pr-[0.5rem] rounded-t-2xl font-bold  text-white">
          <div className="pl-[1rem] pb-[0.5rem] text-2xl font-extrabold font-dmsans bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            RTS powered by SAKSHAM
          </div>

          <div className="px-3 py-2 bg-green-700 text-white rounded-xl font-semibold hover:bg-green-500">
            <button>Start SAKSHAM</button>
          </div>
        </div>
        <div
          ref={containerRef}
          className="p-6 overflow-auto h-full font-medium text-lg"
        >
          {displayedSuggestion ? (
            <div>
              {displayedSuggestion.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          ) : (
            <div className="h-full w-full flex justify-center items-center size-[50%]">
              <div id="loader-wrapper">
                <div id="loader"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search and Claim Info Container */}
      <div className="h-[80%] w-[30%] bg-[rgba(0,0,0,0.7)] rounded-2xl flex flex-col">
        {/* Toggle Button */}
        <div className="w-full h-15 bg-[rgba(0,0,0)] rounded-t-2xl flex justify-between items-center">
          <div className="pl-[1rem] pt-[0.5rem] text-2xl font-extrabold font-dmsans bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
            {isTranscriptionMode
              ? 'Real-Time Transcription'
              : 'Get Claim Information'}
          </div>
          <button
            onClick={toggleMode}
            className="mr-4 px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            {isTranscriptionMode
              ? 'Switch to Claims'
              : 'Switch to Transcription'}
          </button>
        </div>

        {/* Content */}
        {isTranscriptionMode ? (
          <div className="w-full h-full p-6">
            {/* Real-Time Transcription Content */}
            <div className="w-full h-full flex justify-center items-center pb-[4rem] mt-[1rem]">
              <div className="flex flex-col">
                <div className="text-gray-400 mx-auto text-xl font-medium mt-2 opacity-60">
                  <Captions className="size-50 opacity-50" />
                  Real-Time Transcription
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Search Form */}
            <div className="w-full p-3 flex flex-col">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Claim ID"
                  className="h-12 rounded-md bg-[rgb(0,0,0,0.8)] pl-3 border-none w-[88%] text-white"
                  value={formData.claimID}
                  onChange={(e) =>
                    setFormData({ ...formData, claimID: e.target.value })
                  }
                />
                <button
                  type="submit"
                  className="h-12 bg-green-700 text-white rounded-md hover:bg-green-900 transition-colors w-[10%] flex justify-center items-center"
                >
                  <Search />
                </button>
              </form>
            </div>

            {/* Claim Info */}
            <div className="w-full h-full p-6">
              {searchedClaim === null ? (
                <div className="w-full h-full flex justify-center items-center pb-[4rem]">
                  <div className="flex flex-col">
                    <div className="size-50 bg-cover">
                      <img src="/database.png" alt="database" />
                    </div>
                    <div className="text-gray-400 mx-auto text-xl font-medium mt-2 opacity-60">
                      Enter Claim ID to search
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-white font-bold">
                    Claim ID: {searchedClaim?.claimID || 'N/A'}
                  </h3>
                  <p className="text-white">
                    Client Name: {searchedClaim?.clientSummary || 'N/A'}
                  </p>
                  <p className="text-white">
                    Client Info: {searchedClaim?.claimInfo || 'N/A'}
                  </p>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RealTsuggestion;
