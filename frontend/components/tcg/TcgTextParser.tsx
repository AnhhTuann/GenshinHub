import React, { useMemo } from 'react';
import { TcgDictionaryEntry } from '@/lib/yattaTcg';
import FallbackImage from '@/components/ui/FallbackImage';

interface TcgTextParserProps {
  text: string;
  params?: Record<string, any>;
  dictionary?: Record<string, TcgDictionaryEntry>;
}

const TcgTextParser: React.FC<TcgTextParserProps> = ({ text, params, dictionary }) => {
  const parsedTokens = useMemo(() => {
    if (!text) return [];

    let parsedText = text;
    
    // Replace param variables with their string values first
    if (params) {
      const paramRegex = /\$\[([a-zA-Z0-9_]+)\]/g;
      parsedText = parsedText.replace(paramRegex, (match, key) => {
        if (params[key] !== undefined) {
          return String(params[key]);
        }
        return match; 
      });
    }

    // Flatten nested color tags caused by param replacement
    // e.g. <color=#FFF><color=#FFF>Duration</color>: 2</color> -> <color=#FFF>Duration: 2</color>
    let prevText;
    do {
      prevText = parsedText;
      parsedText = parsedText.replace(/<color=#[^>]+><color=#[^>]+>(.*?)<\/color>(.*?)<\/color>/gi, '<color=#FFFFFFFF>$1$2</color>');
    } while (parsedText !== prevText);

    // Split by tags and newlines
    return parsedText.split(/(<color=#[0-9a-fA-F]+>.*?<\/color>|\{SPRITE_PRESET#\d+\}|\\n)/g);
  }, [text, params]);

  if (!parsedTokens.length) return null;

  return (
    <span className="text-gray-300 leading-relaxed text-[13px] sm:text-sm">
      {parsedTokens.map((token, index) => {
        if (!token) return null;
        
        if (token === '\\n') {
          return <br key={index} />;
        }
        
        const colorMatch = token.match(/<color=#([0-9a-fA-F]{6})[0-9a-fA-F]{2}>(.*?)<\/color>/i);
        if (colorMatch) {
          const content = colorMatch[2];
          
          // Special badge for Duration / Usages / Shield
          if (content.includes('Duration (Rounds):') || content.includes('Usage(s):') || content.includes('Shield')) {
            return (
              <span key={index} className="inline-flex items-center gap-1.5 bg-[#161b22] px-2.5 py-1 rounded-md border border-white/10 shadow-inner mt-2 mb-1 w-fit">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[12px] font-bold text-gray-300 uppercase tracking-widest">{content}</span>
              </span>
            );
          }

          return (
            <span key={index} style={{ color: `#${colorMatch[1]}` }} className="font-bold">
              {content}
            </span>
          );
        }
        
        const colorMatchNoAlpha = token.match(/<color=#([0-9a-fA-F]{6})>(.*?)<\/color>/i);
        if (colorMatchNoAlpha) {
          const content = colorMatchNoAlpha[2];
          return (
            <span key={index} style={{ color: `#${colorMatchNoAlpha[1]}` }} className="font-bold">
              {content}
            </span>
          );
        }

        const spriteMatch = token.match(/\{SPRITE_PRESET#(\d+)\}/);
        if (spriteMatch) {
          const spriteId = spriteMatch[1];
          const elementMap: Record<string, string> = {
            '2100': 'physical', '2101': 'cryo', '2102': 'hydro', '2103': 'pyro',
            '2104': 'electro', '2105': 'anemo', '2106': 'geo', '2107': 'dendro',
          };
          
          if (elementMap[spriteId]) {
            return (
              <span key={index} className="inline-block w-4 h-4 align-text-bottom mr-0.5 relative top-0.5">
                <FallbackImage 
                  src={`/assets/elements/${elementMap[spriteId]}.webp`} 
                  alt={elementMap[spriteId]} 
                  fill 
                  className="object-contain drop-shadow-md" 
                />
              </span>
            );
          }
          return null;
        }

        return <React.Fragment key={index}>{token}</React.Fragment>;
      })}
    </span>
  );
};

export default React.memo(TcgTextParser);
