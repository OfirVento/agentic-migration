import React, { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
    text: string;
    isActive: boolean;
    speed?: number; // ms per char
    onComplete?: () => void;
}

export const TypewriterText = ({ text, isActive, speed = 15, onComplete }: TypewriterTextProps) => {
    const [displayedText, setDisplayedText] = useState(isActive ? "" : text);
    const indexRef = useRef(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const onCompleteRef = useRef(onComplete);
    const displayedTextRef = useRef("");

    // Update ref when prop changes
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    // Keep strict tracked reference for comparison
    useEffect(() => {
        displayedTextRef.current = displayedText;
    }, [displayedText]);

    // If not active (old message), show full text immediately
    useEffect(() => {
        if (!isActive) {
            setDisplayedText(text);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            return;
        }
    }, [isActive, text]);

    // Typing effect logic
    useEffect(() => {
        if (!isActive) return;

        // Reset if text changes significantly (new message)
        if (text.startsWith(displayedTextRef.current) === false) {
            indexRef.current = 0;
            setDisplayedText("");
        }

        const typeChar = () => {
            if (indexRef.current < text.length) {
                const char = text.charAt(indexRef.current);
                setDisplayedText((prev) => prev + char);
                indexRef.current++;
                timeoutRef.current = setTimeout(typeChar, speed);
            } else {
                if (onCompleteRef.current) onCompleteRef.current();
            }
        };

        // Start typing if not already started
        if (indexRef.current === 0) {
            typeChar();
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [text, isActive, speed]);

    return <span>{displayedText}</span>;
};
