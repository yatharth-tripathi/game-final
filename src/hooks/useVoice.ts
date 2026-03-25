"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseVoiceReturn {
  isListening: boolean;
  transcript: string;
  isSupported: boolean;
  isSpeaking: boolean;
  voiceEnabled: boolean;
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  toggleVoice: () => void;
  resetTranscript: () => void;
}

export function useVoice(): UseVoiceReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const shouldListenRef = useRef(false);

  // Check support + load preference
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    const hasTTS = typeof window.speechSynthesis !== "undefined";
    setIsSupported(!!(SpeechRecognitionAPI && hasTTS));

    try {
      const saved = localStorage.getItem("nexus-voice-enabled");
      if (saved === "true") setVoiceEnabled(true);
    } catch { /* ignore */ }
  }, []);

  // Initialize recognition
  useEffect(() => {
    if (!isSupported) return;

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) return;

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      // Auto-restart if supposed to be listening (Chrome stops after silence)
      if (shouldListenRef.current) {
        try {
          recognition.start();
        } catch { /* already started */ }
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      shouldListenRef.current = false;
      try { recognition.stop(); } catch { /* ignore */ }
    };
  }, [isSupported]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || !voiceEnabled) return;
    try {
      shouldListenRef.current = true;
      setTranscript("");
      recognitionRef.current.start();
      setIsListening(true);
    } catch { /* already started */ }
  }, [voiceEnabled]);

  const stopListening = useCallback(() => {
    shouldListenRef.current = false;
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch { /* ignore */ }
    }
    setIsListening(false);
  }, []);

  const speak = useCallback((text: string) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [voiceEnabled]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  const toggleVoice = useCallback(() => {
    setVoiceEnabled((prev) => {
      const next = !prev;
      try { localStorage.setItem("nexus-voice-enabled", String(next)); } catch { /* ignore */ }
      if (!next) {
        // Turning off: stop everything
        shouldListenRef.current = false;
        try { recognitionRef.current?.stop(); } catch { /* ignore */ }
        window.speechSynthesis?.cancel();
        setIsListening(false);
        setIsSpeaking(false);
      }
      return next;
    });
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript("");
  }, []);

  return {
    isListening, transcript, isSupported, isSpeaking, voiceEnabled,
    startListening, stopListening, speak, stopSpeaking, toggleVoice, resetTranscript,
  };
}
