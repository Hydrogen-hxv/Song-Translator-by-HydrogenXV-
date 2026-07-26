/**
 * Helper utilities for translation cleaning and processing.
 */

/**
 * Cleans the raw JSON response from the Gemini API, removing markdown blocks.
 * @param {string} text - Raw output text from AI model.
 * @returns {string} Cleaned JSON string.
 */
export function cleanTranslationOutput(text) {
    if (!text) return '';
    return text.replace(/```json/g, "").replace(/```/g, "").trim();
}
