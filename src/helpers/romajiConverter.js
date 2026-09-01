/**
 * Helper utilities for translation cleaning and processing.
 * Robustly parses and extracts JSON structures even from mixed bilingual outputs.
 */

/**
 * Cleans the raw JSON response from the Gemini API, extracting strictly the JSON array or object.
 * @param {string} text - Raw output text from AI model.
 * @returns {string} Cleaned JSON string.
 */
export function cleanTranslationOutput(text) {
    if (!text) return '[]';
    let clean = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    
    // Extract JSON array [...] if present
    const firstBracket = clean.indexOf('[');
    const lastBracket = clean.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
        clean = clean.substring(firstBracket, lastBracket + 1);
    } else {
        // Fallback: check JSON object {...}
        const firstBrace = clean.indexOf('{');
        const lastBrace = clean.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
            clean = clean.substring(firstBrace, lastBrace + 1);
        }
    }
    
    // Validate JSON or auto-repair trailing commas
    try {
        const parsed = JSON.parse(clean);
        return JSON.stringify(parsed);
    } catch (e) {
        try {
            const repaired = clean.replace(/,\s*([\]}])/g, '$1');
            const parsed = JSON.parse(repaired);
            return JSON.stringify(parsed);
        } catch (e2) {
            return clean;
        }
    }
}
