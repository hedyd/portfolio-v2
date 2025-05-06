import { useState, useEffect, useMemo } from "react";

export const useTypewriter = (text: string, speed = 20) => {
  const [index, setIndex] = useState(0);
  const displayText = useMemo(() => text.slice(0, index), [index]);
  const lineBreak = "<br />";

  useEffect(() => {
    if (index >= text.length) return;

    const timeoutId = setTimeout(() => {
      if (text.charAt(index) === "<") {
        setIndex((i) => i + lineBreak.length);
      } else {
        setIndex((i) => i + 1);
      }
    }, speed);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [index, text, speed]);

  return displayText;
};
