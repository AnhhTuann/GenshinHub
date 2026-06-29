import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API with the key from environment variables
const apiKey = process.env.GEMINI_API_KEY;

export async function generateCharacterBuild(characterName: string, characterElement: string, characterWeapon: string) {
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not defined in environment variables.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Use gemini-1.5-flash as it's fast and capable enough for this task
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    generationConfig: {
      responseMimeType: "application/json",
    }
  });

  const prompt = `
You are an expert Genshin Impact theorycrafter. Generate an optimal build and tier list ranking for the character "${characterName}".
Element: ${characterElement}. Weapon: ${characterWeapon}.

Output exactly in the following JSON schema:
{
  "tier": "String (one of: SS, S, A, B, C, D)",
  "role": "String (e.g. Main DPS, Sub DPS, Support, Healer, Shielder)",
  "recommendedC": "String (e.g. C0, C1, C2, C6)",
  "tierNoteEn": ["String (pros/cons in English)"],
  "tierNoteVi": ["String (pros/cons in Vietnamese)"],
  "bestWeapons": [
    {
      "nameEn": "String (Weapon Name English)",
      "nameVi": "String (Weapon Name Vietnamese)",
      "rank": "Number (3, 4, 5)",
      "isF2P": "Boolean",
      "subStat": "String (e.g. CRIT Rate, ATK%, Energy Recharge)",
      "passiveDescEn": "String (Short summary of passive effect in English)",
      "passiveDescVi": "String (Short summary of passive effect in Vietnamese)"
    }
  ],
  "bestArtifacts": [
    {
      "setNameEn": "String (Artifact Set Name English)",
      "setNameVi": "String (Artifact Set Name Vietnamese)",
      "pieces": "Number (usually 4)",
      "sands": ["String (e.g. ATK%, EM, ER)"],
      "goblet": ["String (e.g. Elemental DMG Bonus, ATK%)"],
      "circlet": ["String (e.g. CRIT Rate, CRIT DMG)"],
      "subStatsPriority": ["String (e.g. CRIT Rate, CRIT DMG, ATK%, ER)"]
    }
  ],
  "teams": [
    {
      "name": "String (Team Name e.g. National, Freeze, Vaporize)",
      "rank": "String (S, A, B)",
      "description": "String (Brief team explanation in Vietnamese)",
      "members": [
        {
          "characterId": "String (lower-case-id, e.g. bennett, xingqiu, xiangling)",
          "role": "String (e.g. Healer/Buffer)",
          "roleDesc": "String (Role description in Vietnamese)",
          "weapons": ["String"],
          "artifacts": ["String"],
          "substats": ["String"]
        }
      ]
    }
  ],
  "talentPriority": ["String", "String", "String"]
}

Provide the response matching the JSON schema. Provide 3 best weapons, 1 or 2 best artifact sets, and 1 or 2 best teams.
  `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Parse the JSON output
    const buildData = JSON.parse(responseText);
    return buildData;
  } catch (error: any) {
    console.error("Error calling Gemini API:", error.message);
    throw new Error("Failed to generate character build from AI.");
  }
}
