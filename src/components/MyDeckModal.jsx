/**
 * MyDeckModal Component
 * Renders the Personal Vocabulary Deck modal, search/filtering,
 * pronunciation TTS triggers, deletion, and Flashcard game launcher.
 * Enhanced with high-contrast text and sharp visual styling.
 */
import { t } from "../helpers/i18n.js";

/**
 * Renders the HTML contents of the My Deck modal list.
 * @param {Array<object>} deckList - Array of saved vocabulary items.
 * @param {string} searchQuery - Search query string.
 * @param {string} filterLang - Language filter ('all', 'japanese', 'english', etc.).
 * @returns {string} HTML markup string.
 */
export function renderMyDeckList(deckList = [], searchQuery = '', filterLang = 'all') {
    if (!deckList || deckList.length === 0) {
        return `
        <div class="text-center py-12 px-4">
            <div class="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/60 rounded-full flex items-center justify-center mx-auto mb-3 text-indigo-500 text-2xl">
                <i class="fa-solid fa-folder-open"></i>
            </div>
            <h4 class="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">${t('myDeck.emptyTitle')}</h4>
            <p class="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed font-medium">${t('myDeck.emptyDesc')}</p>
        </div>`;
    }

    let filtered = [...deckList];

    // Filter by language
    if (filterLang !== 'all') {
        filtered = filtered.filter(item => item.sourceLang === filterLang);
    }

    // Filter by search query
    if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(item => 
            (item.word || '').toLowerCase().includes(q) ||
            (item.meaning || '').toLowerCase().includes(q) ||
            (item.reading || '').toLowerCase().includes(q) ||
            (item.songTitle || '').toLowerCase().includes(q)
        );
    }

    if (filtered.length === 0) {
        return `
        <div class="text-center py-8 text-slate-600 dark:text-slate-400 text-xs font-medium">
            <i class="fa-solid fa-magnifying-glass mb-2 text-lg"></i>
            <p>${t('myDeck.searchNoResult')}</p>
        </div>`;
    }

    return filtered.map((item, idx) => {
        const itemId = item.id || `deck_${idx}`;
        const sourceFlag = item.sourceLang === 'japanese' ? '🇯🇵' : item.sourceLang === 'english' ? '🇬🇧' : item.sourceLang === 'chinese' ? '🇨🇳' : '🌐';
        
        return `
        <div id="deck-item-${itemId}" class="p-3.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-indigo-300 dark:hover:border-indigo-700 transition">
            <div class="flex-grow">
                <div class="flex items-center gap-2 flex-wrap mb-1">
                    <span class="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                        <span>${sourceFlag}</span>
                        <span class="font-heading text-sm md:text-base">${escapeHtml(item.word)}</span>
                    </span>
                    <button type="button" onclick="playVocabAudio('${escapeJsStr(item.word)}', '${item.sourceLang}')" class="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300 p-0.5 transition" title="${t('vocabCard.listenPronunciation')}">
                        <i class="fa-solid fa-volume-high text-xs"></i>
                    </button>
                    ${item.partOfSpeech ? `<span class="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600">${escapeHtml(item.partOfSpeech)}</span>` : ''}
                </div>

                ${item.reading ? `<p class="text-xs text-slate-600 dark:text-slate-300 font-mono font-medium mb-1">${escapeHtml(item.reading)}</p>` : ''}
                <p class="text-xs font-bold text-indigo-700 dark:text-indigo-300">${escapeHtml(item.meaning)}</p>

                ${item.songTitle ? `<p class="text-[11px] text-slate-600 dark:text-slate-400 mt-1 font-medium"><i class="fa-solid fa-music mr-1 text-indigo-500"></i>${escapeHtml(item.songTitle)} ${item.artist ? `• ${escapeHtml(item.artist)}` : ''}</p>` : ''}
            </div>

            <div class="flex items-center gap-2 self-end md:self-center shrink-0">
                <button type="button" onclick="deleteFromDeck('${itemId}')" class="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/60 rounded-xl transition" title="${t('myDeck.deleteTooltip')}">
                    <i class="fa-solid fa-trash-can text-sm"></i>
                </button>
            </div>
        </div>`;
    }).join('');
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function escapeJsStr(str) {
    if (!str) return '';
    return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');
}
