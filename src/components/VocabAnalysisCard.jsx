/**
 * VocabAnalysisCard Component
 * Generates HTML markup for AI Lyrics Analysis, Interactive Highlighter,
 * Detailed Vocabulary Cards with A/B Conversations and Word-by-Word Tokenization.
 * Enhanced with high-contrast, crystal-clear typography in both Light and Dark themes.
 */
import { t } from "../helpers/i18n.js";
import { highlightLyricsWithVocab } from "../helpers/vocabEngine.js";

/**
 * Renders the full AI Lyrics Analysis view.
 * @param {object} analysisData - Parsed JSON analysis output.
 * @param {string} originalLyrics - Raw song lyrics.
 * @param {Array<string>} savedVocabIds - Set/array of IDs or words already in user's My Deck.
 * @param {object} currentUser - Firebase user object.
 * @param {boolean} fromCache - Whether this result was loaded from database cache.
 * @returns {string} HTML markup string.
 */
export function renderVocabAnalysisResult(analysisData, originalLyrics, savedVocabIds = [], currentUser = null, fromCache = false) {
    if (!analysisData || !analysisData.vocabularies || analysisData.vocabularies.length === 0) {
        return `<div class="p-8 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
            <i class="fa-solid fa-triangle-exclamation text-amber-500 text-2xl mb-2"></i>
            <p class="text-sm font-semibold">${t('vocabAnalysis.emptyOrInvalid')}</p>
        </div>`;
    }

    const { songTitle, artist, sourceLang, targetLang, vocabularies } = analysisData;
    const highlightedLyricsHtml = highlightLyricsWithVocab(originalLyrics, vocabularies);

    const sourceFlag = sourceLang === 'japanese' ? '🇯🇵' : sourceLang === 'english' ? '🇬🇧' : sourceLang === 'chinese' ? '🇨🇳' : '🌐';
    const targetFlag = targetLang === 'thai' ? '🇹🇭' : targetLang === 'japanese' ? '🇯🇵' : targetLang === 'english' ? '🇬🇧' : '🌐';

    let vocabCardsHtml = '';
    vocabularies.forEach((v, idx) => {
        const vocabId = v.id || `v_${idx}`;
        const isSaved = savedVocabIds.includes(vocabId) || savedVocabIds.includes(v.word);
        const starIconClass = isSaved ? 'fa-solid fa-star text-amber-400' : 'fa-regular fa-star text-slate-400 dark:text-slate-500 hover:text-amber-400';
        const starBtnText = isSaved ? t('vocabCard.saved') : t('vocabCard.saveToDeck');

        const safeVocabJson = JSON.stringify({
            ...v,
            id: vocabId,
            sourceLang: sourceLang,
            targetLang: targetLang,
            songTitle: songTitle || '',
            artist: artist || ''
        }).replace(/"/g, '&quot;');

        // Conversation rendering
        let conversationHtml = '';
        if (v.conversation) {
            const { contextTitle, speakerA, speakerB } = v.conversation;
            conversationHtml = `
            <div class="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/80">
                <div class="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-2.5">
                    <i class="fa-solid fa-comments"></i>
                    <span>${t('vocabCard.conversationTitle')} ${contextTitle ? `(${escapeHtml(contextTitle)})` : ''}</span>
                </div>
                
                <!-- Chat Dialogue -->
                <div class="space-y-3 bg-slate-50 dark:bg-slate-900/80 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    <!-- Speaker A -->
                    ${renderSpeakerMessage(speakerA, 'A', 'bg-indigo-600 text-white', 'bg-white dark:bg-indigo-950/40 text-slate-900 dark:text-slate-100 border-indigo-200 dark:border-indigo-900/60')}
                    
                    <!-- Speaker B -->
                    ${renderSpeakerMessage(speakerB, 'B', 'bg-emerald-600 text-white', 'bg-white dark:bg-emerald-950/40 text-slate-900 dark:text-slate-100 border-emerald-200 dark:border-emerald-900/60')}
                </div>
            </div>`;
        }

        vocabCardsHtml += `
        <div id="vocab-card-${vocabId}" class="vocab-card bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-300">
            <div class="flex items-start justify-between gap-3 mb-2">
                <div class="flex-grow">
                    <div class="flex items-center gap-2 flex-wrap mb-1">
                        <span class="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/90 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">#${idx + 1}</span>
                        <h4 class="text-lg md:text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                            ${escapeHtml(v.word)}
                        </h4>
                        <button type="button" onclick="playVocabAudio('${escapeJsStr(v.word)}', '${sourceLang}')" class="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300 p-1 transition" title="${t('vocabCard.listenPronunciation')}">
                            <i class="fa-solid fa-volume-high text-sm"></i>
                        </button>
                        ${v.partOfSpeech ? `<span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600">${escapeHtml(v.partOfSpeech)}</span>` : ''}
                    </div>
                    ${v.reading ? `<p class="text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-300 font-mono"><i class="fa-solid fa-microphone-lines text-indigo-500 dark:text-indigo-400 mr-1 text-[11px]"></i> ${escapeHtml(v.reading)}</p>` : ''}
                </div>

                <!-- Bookmark Button -->
                <button type="button" id="save-btn-${vocabId}" onclick="toggleSaveVocab(event, '${vocabId}', '${safeVocabJson}')" class="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/90 hover:border-amber-400 dark:hover:border-amber-400 text-slate-700 dark:text-slate-200 text-xs font-bold transition shadow-xs">
                    <i id="save-icon-${vocabId}" class="${starIconClass}"></i>
                    <span id="save-label-${vocabId}">${starBtnText}</span>
                </button>
            </div>

            <!-- Meaning Definition -->
            <div class="mt-2.5 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/60">
                <span class="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block mb-0.5">${t('vocabCard.meaningLabel')} (${targetFlag} ${targetLang})</span>
                <p class="text-sm md:text-base font-bold text-slate-900 dark:text-slate-50">${escapeHtml(v.meaning)}</p>
            </div>

            <!-- Context in Song -->
            ${v.contextInSong ? `
            <div class="mt-2 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <i class="fa-solid fa-music text-indigo-500 dark:text-indigo-400 mt-0.5 text-[11px]"></i>
                <div>
                    <span class="font-bold text-slate-900 dark:text-slate-100 mr-1">${t('vocabCard.inSongContext')}:</span>
                    <span class="font-medium">${escapeHtml(v.contextInSong)}</span>
                </div>
            </div>` : ''}

            <!-- Conversations & Word-by-Word Analysis -->
            ${conversationHtml}
        </div>`;
    });

    return `
    <div class="space-y-6 animate-fadeIn">
        <!-- Summary Header Card -->
        <div class="bg-linear-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-5 md:p-6 shadow-xl border border-indigo-700/50">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div class="flex items-center gap-2 mb-1 flex-wrap">
                        <span class="bg-indigo-500/40 text-indigo-100 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-400/40">
                            <i class="fa-solid fa-wand-magic-sparkles mr-1"></i> AI Vocab Studio
                        </span>
                        ${fromCache ? `<span class="bg-emerald-500/40 text-emerald-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/40 flex items-center gap-1"><i class="fa-solid fa-bolt"></i> Database Cache Hit</span>` : ''}
                        <span class="text-xs text-indigo-200 font-medium">
                            ${sourceFlag} <span class="capitalize">${sourceLang}</span> → ${targetFlag} <span class="capitalize">${targetLang}</span>
                        </span>
                        <span class="text-xs bg-white/20 text-white px-2 py-0.5 rounded-md font-bold">
                            ${vocabularies.length} ${t('vocabAnalysis.wordsExtracted')}
                        </span>
                    </div>
                    <h3 class="text-xl md:text-2xl font-bold font-heading text-white">${escapeHtml(songTitle || 'Untitled Song')}</h3>
                    <p class="text-xs md:text-sm text-indigo-200 font-medium">${escapeHtml(artist || 'Unknown Artist')}</p>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto">
                    <button type="button" onclick="openMyDeckModal()" class="w-full md:w-auto px-4 py-2.5 rounded-xl bg-white text-indigo-950 font-bold text-xs md:text-sm shadow-md hover:bg-indigo-50 transition flex items-center justify-center gap-2">
                        <i class="fa-solid fa-layer-group text-indigo-600"></i>
                        <span>${t('nav.myDeck')}</span>
                        <span id="deck-pill-badge" class="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">${savedVocabIds.length}</span>
                    </button>
                    <button type="button" onclick="startFlashcardsFromCurrent()" class="w-full md:w-auto px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs md:text-sm shadow-md transition flex items-center justify-center gap-2">
                        <i class="fa-solid fa-bolt text-amber-300"></i>
                        <span>${t('vocabAnalysis.practiceNow')}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- 2 Columns: Lyrics Highlighter (Left) + Vocabulary Context Cards (Right) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <!-- Left Column: Interactive Lyrics Highlighter -->
            <div class="lg:col-span-5 space-y-3">
                <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 shadow-sm border border-slate-200 dark:border-slate-700 lg:sticky lg:top-24 max-h-[85vh] flex flex-col">
                    <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3 mb-3">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-highlighter text-amber-500 text-base"></i>
                            <h4 class="font-bold text-sm md:text-base font-heading text-slate-900 dark:text-white">${t('vocabAnalysis.highlighterHeading')}</h4>
                        </div>
                        <span class="text-[10px] text-slate-500 dark:text-slate-400 font-medium">${t('vocabAnalysis.highlighterHint')}</span>
                    </div>

                    <div class="overflow-y-auto pr-2 space-y-1 text-slate-800 dark:text-slate-200 font-medium">
                        ${highlightedLyricsHtml}
                    </div>
                </div>
            </div>

            <!-- Right Column: Deep Vocabulary Context Cards -->
            <div class="lg:col-span-7 space-y-4">
                <div class="flex items-center justify-between">
                    <h4 class="font-bold text-base md:text-lg font-heading text-slate-900 dark:text-white flex items-center gap-2">
                        <i class="fa-solid fa-book-open-reader text-indigo-500"></i>
                        <span>${t('vocabAnalysis.vocabListHeading')}</span>
                    </h4>
                    <span class="text-xs text-slate-600 dark:text-slate-400 font-semibold">${vocabularies.length} ${t('vocabAnalysis.items')}</span>
                </div>

                <div class="space-y-4" id="vocab-cards-container">
                    ${vocabCardsHtml}
                </div>
            </div>
        </div>
    </div>`;
}

/**
 * Renders speaker dialog message and its word-by-word tokenization breakdown.
 */
function renderSpeakerMessage(speakerObj, label, avatarStyle, bubbleStyle) {
    if (!speakerObj) return '';

    let tokensHtml = '';
    if (speakerObj.tokens && speakerObj.tokens.length > 0) {
        tokensHtml = `
        <div class="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700/80">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                <i class="fa-solid fa-code-fork mr-1"></i> ${t('vocabCard.tokenizationTitle')}
            </span>
            <div class="flex flex-wrap gap-1.5">
                ${speakerObj.tokens.map(tk => `
                    <div class="bg-white dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-center shadow-2xs hover:border-indigo-400 transition-colors">
                        <span class="block font-bold text-xs text-slate-900 dark:text-white">${escapeHtml(tk.token)}</span>
                        ${tk.reading ? `<span class="block text-[9px] text-slate-500 dark:text-slate-400 font-mono font-medium">${escapeHtml(tk.reading)}</span>` : ''}
                        <span class="block text-[10px] font-semibold text-indigo-700 dark:text-indigo-300">${escapeHtml(tk.meaning || '')}</span>
                        ${tk.pos ? `<span class="block text-[8px] font-bold text-slate-400 dark:text-slate-400 uppercase">${escapeHtml(tk.pos)}</span>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>`;
    }

    return `
    <div class="flex items-start gap-2.5">
        <div class="w-6 h-6 md:w-7 md:h-7 rounded-full ${avatarStyle} flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs">
            ${label}
        </div>
        <div class="flex-grow p-3 rounded-2xl border ${bubbleStyle}">
            <div class="flex items-center justify-between gap-2">
                <p class="font-bold text-xs md:text-sm text-slate-900 dark:text-slate-100">${escapeHtml(speakerObj.text)}</p>
                <button type="button" onclick="playVocabAudio('${escapeJsStr(speakerObj.text)}')" class="text-slate-400 hover:text-indigo-600 p-0.5 transition" title="${t('vocabCard.listenPronunciation')}">
                    <i class="fa-solid fa-volume-high text-[11px]"></i>
                </button>
            </div>
            <p class="text-xs text-slate-700 dark:text-slate-300 mt-1 font-medium italic">${escapeHtml(speakerObj.translation)}</p>
            ${tokensHtml}
        </div>
    </div>`;
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
