import React, { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
    text: string;
    isActive: boolean;
    speed?: number; // ms per char
    onComplete?: () => void;
}

export const TypewriterText = ({ text, isActive, speed = 15, onComplete }: TypewriterTextProps) => {
    const [displayedText, setDisplayedText] = useState(isActive ? "" : text);
    const onCompleteRef = useRef(onComplete);

    // Keep ref updated
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        // Case 1: Not active (old message) -> Show full text immediately
        if (!isActive) {
            setDisplayedText(text);
            return;
        }

        // Case 2: Active -> Start typing animation
        setDisplayedText(""); // Start from empty
        let currentIdx = 0;

        const intervalId = setInterval(() => {
            if (currentIdx < text.length) {
                // Use slice to be safe and efficient
                setDisplayedText(text.slice(0, currentIdx + 1));
                currentIdx++;
            } else {
                clearInterval(intervalId);
                // Trigger completion
                if (onCompleteRef.current) onCompleteRef.current();
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [text, isActive, speed]);

    return <span>{displayedText}</span>;
};
