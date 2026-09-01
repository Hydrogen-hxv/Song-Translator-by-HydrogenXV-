/**
 * Vocab Engine & Language Learning Helper
 * Handles AI prompt construction, tokenization, TTS speech synthesis,
 * database caching (Firestore & LocalStorage) for instant analysis acceleration,
 * and high-contrast lyrics highlighting.
 */

/**
 * Builds the AI prompt for lyrics vocabulary extraction and tokenized conversations.
 * @param {object} params
 * @param {string} params.sourceLang - 'japanese' | 'english' | 'chinese'
 * @param {string} params.targetLang - 'thai' | 'japanese' | 'english'
 * @param {number} params.wordCount - 5 | 10 | 15 | 25 | 30
 * @param {string} params.songTitle
 * @param {string} params.artist
 * @param {string} params.lyrics
 * @returns {string} Prompt string
 */
export function buildVocabAnalysisPrompt({ sourceLang, targetLang, wordCount, songTitle, artist, lyrics }) {
    const targetCount = wordCount || 10;
    
    let langInstruction = '';
    if (sourceLang === 'japanese' && targetLang === 'thai') {
        langInstruction = `Source lyrics are Japanese (which may include mixed English/bilingual lines). Translate definitions, contexts, and conversation sentences to Thai. For Japanese readings, provide both Romaji (English letters) and Thai phonetic transliteration (e.g. "me / เมะ" for "目").`;
    } else if (sourceLang === 'japanese' && targetLang === 'japanese') {
        langInstruction = `Source lyrics are Japanese (which may include mixed English/bilingual lines). Explain vocabulary meanings in simplified Japanese (やさしい日本語). Provide Furigana/Romaji readings.`;
    } else if (sourceLang === 'japanese' && targetLang === 'english') {
        langInstruction = `Source lyrics are Japanese (which may include mixed English/bilingual lines). Translate definitions, contexts, and conversations to English. Provide Romaji readings.`;
    } else if (sourceLang === 'chinese' && targetLang === 'thai') {
        langInstruction = `Source lyrics are Chinese (which may include mixed English/bilingual lines). Translate definitions, contexts, and conversation sentences to Thai. For Chinese readings, provide both Pinyin and Thai phonetic transliteration (e.g. "nǐ hǎo / หนี่ ห่าว" for "你好").`;
    } else if (sourceLang === 'english' && targetLang === 'thai') {
        langInstruction = `Source lyrics are English (which may include mixed bilingual lines). Translate definitions, contexts, and conversations to Thai. Provide English IPA/phonetics and Thai phonetic pronunciation (e.g. "/ˈmjuːzɪk/ (มิวสิก)").`;
    } else if (sourceLang === 'english' && targetLang === 'japanese') {
        langInstruction = `Source lyrics are English (which may include mixed bilingual lines). Translate definitions, contexts, and conversations to Japanese (日本語). Provide English IPA/phonetics and Katakana pronunciation.`;
    } else {
        langInstruction = `Source lyrics language is ${sourceLang}. Target translation language is ${targetLang}. Provide accurate phonetics/readings and translations.`;
    }

    return `You are an expert language professor and computational linguist.
Analyze the song lyrics below and extract exactly ${targetCount} most important, interesting, or commonly used vocabulary words/idioms for language learners.

${langInstruction}

Rules:
1. Extract exactly ${targetCount} distinct vocabulary words that appear in the lyrics.
2. If the song lyrics contain 2 languages (e.g. Japanese mixed with English, Chinese mixed with English, or bilingual lyrics), process both languages and extract notable vocabulary words accurately without skipping lines.
3. For each vocabulary item, create a natural, everyday simulated dialogue (Speaker A and Speaker B) showing how native speakers use this word in real-world contexts.
4. Perform word-by-word tokenization breakdown (morpheme analysis) on BOTH Speaker A's and Speaker B's sentences. For every token/morpheme, provide its reading, meaning, and part of speech (Noun, Verb, Particle, Adjective, Adverb, Grammar Pattern, etc.).
5. Return ONLY a valid, strictly formatted JSON object with NO surrounding markdown or extra text.

Exact JSON Schema required:
{
  "songTitle": "${songTitle || ''}",
  "artist": "${artist || ''}",
  "sourceLang": "${sourceLang}",
  "targetLang": "${targetLang}",
  "vocabCount": ${targetCount},
  "vocabularies": [
    {
      "id": "v1",
      "word": "The exact word or phrase",
      "reading": "Pronunciation / Romaji / Phonetics / Thai reading",
      "meaning": "Meaning in ${targetLang}",
      "partOfSpeech": "Part of speech (e.g. Noun, Verb, Adjective, Idiom)",
      "contextInSong": "Original lyric line containing this word with its translation",
      "conversation": {
        "contextTitle": "Brief situation context (e.g. Ordering coffee, Talking with friend)",
        "speakerA": {
          "speaker": "A",
          "text": "Sentence spoken by Person A in ${sourceLang}",
          "translation": "Full sentence translation in ${targetLang}",
          "tokens": [
            {
              "token": "token1",
              "reading": "reading of token1",
              "meaning": "meaning of token1",
              "pos": "Noun / Particle / Verb etc."
            }
          ]
        },
        "speakerB": {
          "speaker": "B",
          "text": "Response spoken by Person B in ${sourceLang}",
          "translation": "Full response translation in ${targetLang}",
          "tokens": [
            {
              "token": "token1",
              "reading": "reading of token1",
              "meaning": "meaning of token1",
              "pos": "Noun / Particle / Verb etc."
            }
          ]
        }
      }
    }
  ]
}

Song Title: ${songTitle}
Artist: ${artist}
Lyrics:
${lyrics}`;
}

/**
 * Cleans and safely parses AI JSON output for vocabulary analysis.
 * @param {string} rawText 
 * @returns {object|null}
 */
export function parseVocabAnalysisJSON(rawText) {
    if (!rawText) return null;
    let cleanText = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
    
    const firstBrace = cleanText.indexOf('{');
    const lastBrace = cleanText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        cleanText = cleanText.substring(firstBrace, lastBrace + 1);
    }

    try {
        return JSON.parse(cleanText);
    } catch (err) {
        console.error("Failed to parse vocab analysis JSON:", err, cleanText);
        return null;
    }
}

/**
 * Generates a deterministic cache key for song analysis
 * @param {string} sourceLang 
 * @param {string} targetLang 
 * @param {number} wordCount 
 * @param {string} lyrics 
 * @param {string} songTitle 
 * @returns {string} Unique cache key
 */
export function generateAnalysisCacheKey(sourceLang, targetLang, wordCount, lyrics, songTitle = '') {
    const raw = `${sourceLang || ''}_${targetLang || ''}_${wordCount || 10}_${(songTitle || '').trim().toLowerCase()}_${(lyrics || '').trim().replace(/\s+/g, ' ')}`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
        const char = raw.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    const safeHash = Math.abs(hash).toString(36);
    const cleanTitle = (songTitle || 'song').replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20).toLowerCase();
    return `va_${sourceLang}_${targetLang}_w${wordCount}_${cleanTitle}_${safeHash}`;
}

/**
 * Local Cache for Song Analyses
 */
const ANALYSIS_CACHE_STORAGE_PREFIX = 'song_trans_analysis_cache_';

export function getCachedAnalysisLocal(cacheKey) {
    try {
        const item = localStorage.getItem(ANALYSIS_CACHE_STORAGE_PREFIX + cacheKey);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        return null;
    }
}

export function saveCachedAnalysisLocal(cacheKey, data) {
    try {
        localStorage.setItem(ANALYSIS_CACHE_STORAGE_PREFIX + cacheKey, JSON.stringify(data));
    } catch (e) {
        // Storage might be full, ignore
    }
}

/**
 * Native Web Speech API synthesis for pronunciation playback.
 * @param {string} text 
 * @param {string} langCode - 'japanese' | 'english' | 'chinese' | 'thai' | 'ja' | 'en' | 'th' | 'zh'
 */
export function playPronunciation(text, langCode = 'japanese') {
    if (!('speechSynthesis' in window) || !text) {
        console.warn("SpeechSynthesis not supported or empty text");
        return;
    }

    try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        
        let voiceLang = 'ja-JP';
        if (langCode === 'english' || langCode === 'en') voiceLang = 'en-US';
        else if (langCode === 'thai' || langCode === 'th') voiceLang = 'th-TH';
        else if (langCode === 'chinese' || langCode === 'zh') voiceLang = 'zh-CN';
        else if (langCode === 'japanese' || langCode === 'ja') voiceLang = 'ja-JP';

        utterance.lang = voiceLang;
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    } catch (e) {
        console.error("TTS playback error:", e);
    }
}

/**
 * LocalStorage Fallback helper for My Deck
 */
const LOCAL_STORAGE_DECK_KEY = 'song_translator_my_deck_v5';

export function getLocalDeck() {
    try {
        const data = localStorage.getItem(LOCAL_STORAGE_DECK_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

export function saveLocalDeck(deckList) {
    try {
        localStorage.setItem(LOCAL_STORAGE_DECK_KEY, JSON.stringify(deckList));
    } catch (e) {
        console.error("Error saving local deck:", e);
    }
}

/**
 * Highlights vocabulary occurrences inside original song lyrics with high contrast.
 * @param {string} lyrics 
 * @param {Array<object>} vocabularies 
 * @returns {string} HTML markup with styled highlight spans
 */
export function highlightLyricsWithVocab(lyrics, vocabularies = []) {
    if (!lyrics) return '';
    if (!vocabularies || vocabularies.length === 0) {
        return lyrics.split('\n').map(l => `<p class="py-1 text-slate-800 dark:text-slate-200 font-medium">${escapeHtml(l)}</p>`).join('');
    }

    // Sort vocab by word length descending so longer words match first
    const sortedVocabs = [...vocabularies].sort((a, b) => (b.word?.length || 0) - (a.word?.length || 0));

    const lines = lyrics.split('\n');
    const highlightedLines = lines.map(line => {
        if (!line.trim()) return '<div class="h-3"></div>';

        let lineHtml = escapeHtml(line);

        sortedVocabs.forEach((v, idx) => {
            const cleanWord = (v.word || '').split('(')[0].trim();
            if (!cleanWord || cleanWord.length < 1) return;

            const escapedWord = cleanWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escapedWord})`, 'gi');
            
            // Vibrant, high-contrast colors for both light and dark modes
            const colors = [
                'bg-indigo-100 text-indigo-950 dark:bg-indigo-900/90 dark:text-indigo-100 border-indigo-300 dark:border-indigo-600',
                'bg-amber-100 text-amber-950 dark:bg-amber-900/90 dark:text-amber-100 border-amber-300 dark:border-amber-600',
                'bg-emerald-100 text-emerald-950 dark:bg-emerald-900/90 dark:text-emerald-100 border-emerald-300 dark:border-emerald-600',
                'bg-rose-100 text-rose-950 dark:bg-rose-900/90 dark:text-rose-100 border-rose-300 dark:border-rose-600',
                'bg-sky-100 text-sky-950 dark:bg-sky-900/90 dark:text-sky-100 border-sky-300 dark:border-sky-600',
                'bg-purple-100 text-purple-950 dark:bg-purple-900/90 dark:text-purple-100 border-purple-300 dark:border-purple-600'
            ];
            const colorClass = colors[idx % colors.length];

            const safeMeaning = escapeHtml(v.meaning || '');
            const safeReading = escapeHtml(v.reading || '');

            lineHtml = lineHtml.replace(regex, (match) => {
                return `<mark onclick="focusVocabCard('${v.id || idx}')" title="${safeReading} - ${safeMeaning}" class="cursor-pointer inline-flex items-center px-2 py-0.5 my-0.5 rounded-lg font-bold text-xs md:text-sm border shadow-xs hover:scale-105 transition-all ${colorClass}">${match}</mark>`;
            });
        });

        return `<p class="py-1 leading-relaxed text-sm md:text-base text-slate-800 dark:text-slate-200 font-medium">${lineHtml}</p>`;
    });

    return highlightedLines.join('');
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
