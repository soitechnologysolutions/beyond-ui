import * as React from "react";
import { ChatWidget } from "./ChatWidget";

export const ChatWidgetExample: React.FC = () => {
  return (
    <div className="relative w-full h-[600px] bg-gray-100 dark:bg-gray-800/50 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Chat Widget Example</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">
        Look at the bottom right of this container box to see the Chat Widget. <br/><br/>
        We are using the <code>strategy="absolute"</code> prop here so it stays constrained inside this preview window instead of overlaying the entire screen!
      </p>
      
      <ChatWidget 
        strategy="absolute" 
        position="bottom-right" 
      />
    </div>
  );
};