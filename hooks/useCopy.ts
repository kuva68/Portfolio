import { useState } from "react";
import * as Clipboard from "expo-clipboard";
export const useCopy = (callback = 2000) => {
  const [copied, setCopied] = useState<boolean>(false);
  const copyText = (text: string) => {
    Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), callback);
  };

  return { copyText, copied };
};
