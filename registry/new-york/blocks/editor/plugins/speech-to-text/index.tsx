"use client";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
} from "lexical";
import { Mic, MicOff } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/registry/new-york/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/new-york/ui/tooltip";

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}

let globalIsListening = false;
const listeners = new Set<(isListening: boolean) => void>();

function setGlobalIsListening(value: boolean) {
  globalIsListening = value;
  listeners.forEach((listener) => listener(value));
}

export function useSpeechToTextState() {
  const [isListening, setIsListening] = useState(globalIsListening);

  useEffect(() => {
    // Set initial state
    setIsListening(globalIsListening);
    
    const listener = (value: boolean) => {
      setIsListening(value);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return isListening;
}

export default function SpeechToTextPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isListening, setIsListening] = useState(globalIsListening);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const interimTranscriptRef = useRef<string>("");
  const isAbortingRef = useRef(false);
  const shouldBeListeningRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        interimTranscriptRef.current = interimTranscript;

        if (finalTranscript) {
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              // Insert final transcript at cursor position
              selection.insertText(finalTranscript.trim() + " ");
            } else {
              // If no selection, get selection again and insert
              const newSelection = $getSelection();
              if (newSelection) {
                newSelection.insertText(finalTranscript.trim() + " ");
              } else {
                // Fallback: get root and insert at end
                const root = $getRoot();
                const lastChild = root.getLastChild();
                if (lastChild) {
                  lastChild.selectEnd();
                  const endSelection = $getSelection();
                  if (endSelection && $isRangeSelection(endSelection)) {
                    endSelection.insertText(finalTranscript.trim() + " ");
                  }
                }
              }
            }
          });
          interimTranscriptRef.current = "";
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        // Ignore "aborted" errors - they're expected when we intentionally stop
        if (event.error === "aborted" || isAbortingRef.current) {
          return;
        }
        
        // These are common errors, don't stop listening
        if (event.error === "no-speech" || event.error === "audio-capture") {
          return;
        }
        
        // Log other errors but don't spam console
        if (event.error !== "network") {
          console.warn("Speech recognition error:", event.error);
        }
        
        shouldBeListeningRef.current = false;
        setIsListening(false);
        setGlobalIsListening(false);
        try {
          recognition.stop();
        } catch (e) {
          // Ignore errors when stopping
        }
      };

      recognition.onend = () => {
        // Only restart if we're supposed to be listening and not aborting
        if (shouldBeListeningRef.current && !isAbortingRef.current && recognitionRef.current) {
          // Small delay before restarting to avoid rapid restarts
          setTimeout(() => {
            if (shouldBeListeningRef.current && recognitionRef.current && !isAbortingRef.current) {
              try {
                recognitionRef.current.start();
              } catch (error) {
                // If restart fails, stop listening
                shouldBeListeningRef.current = false;
                setIsListening(false);
                setGlobalIsListening(false);
              }
            }
          }, 100);
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        isAbortingRef.current = true;
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore stop errors
        }
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // Ignore abort errors
        }
        isAbortingRef.current = false;
      }
    };
  }, [editor, isListening]);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;

    const newState = !isListening;
    shouldBeListeningRef.current = newState;

    if (newState) {
      // Starting
      isAbortingRef.current = false;
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setGlobalIsListening(true);
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
        shouldBeListeningRef.current = false;
        setIsListening(false);
        setGlobalIsListening(false);
      }
    } else {
      // Stopping
      isAbortingRef.current = true;
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore stop errors
      }
      setIsListening(false);
      setGlobalIsListening(false);
      // Reset abort flag after a short delay
      setTimeout(() => {
        isAbortingRef.current = false;
      }, 200);
    }
  }, [isListening]);

  // Sync local state with global state
  useEffect(() => {
    const listener = (value: boolean) => {
      setIsListening(value);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  // Listen for toolbar button clicks
  useEffect(() => {
    const handleToggle = () => {
      toggleListening();
    };

    window.addEventListener("toggle-speech-to-text", handleToggle);
    return () => {
      window.removeEventListener("toggle-speech-to-text", handleToggle);
    };
  }, [toggleListening]);

  if (!isSupported) {
    return null;
  }

  return createPortal(
    <div className="fixed bottom-4 right-4 z-50">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              onClick={toggleListening}
              size="icon"
              variant={isListening ? "default" : "outline"}
              className={`rounded-full shadow-lg ${
                isListening
                  ? "bg-red-500 hover:bg-red-600 animate-pulse"
                  : "bg-background"
              }`}
              aria-label={isListening ? "Stop recording" : "Start recording"}
            >
              {isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
          }
        />
        <TooltipContent>
          <p>{isListening ? "Stop speech-to-text" : "Start speech-to-text"}</p>
        </TooltipContent>
      </Tooltip>
    </div>,
    document.body
  );
}

