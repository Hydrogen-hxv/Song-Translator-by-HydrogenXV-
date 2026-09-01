/**
 * FlashcardModal Component
 * Interactive 3D Flip Card game with Spaced Repetition self-assessment,
 * Progress tracking, TTS, and Score Summary screen.
 * Enhanced with high-contrast text and sharp visual styling.
 */
import { t } from "../helpers/i18n.js";

/**
 * Renders an active flashcard card state.
 * @param {object} card - Current vocabulary item.
 * @param {number} currentIndex - Index in the active session (0-based).
 * @param {number} totalCards - Total number of cards in this session.
 * @param {boolean} isFlipped - Whether the card is currently flipped to back.
 * @returns {string} HTML markup.
 */
export function renderFlashcardCard(card, currentIndex, totalCards, isFlipped = false) {
    if (!card) return '';

    const sourceFlag = card.sourceLang === 'japanese' ? '🇯🇵' : card.sourceLang === 'english' ? '🇬🇧' : card.sourceLang === 'chinese' ? '🇨🇳' : '🌐';
    const progressPercent = Math.round(((currentIndex) / totalCards) * 100);

    return `
    <div class="flex flex-col items-center justify-between h-full max-w-md mx-auto w-full select-none">
        <!-- Progress Bar Header -->
        <div class="w-full mb-4">
            <div class="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                <span>${t('flashcard.cardProgress')} ${currentIndex + 1} / ${totalCards}</span>
                <span class="text-indigo-600 dark:text-indigo-400 font-bold">${progressPercent}%</span>
            </div>
            <div class="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div class="bg-indigo-600 h-full rounded-full transition-all duration-300" style="width: ${progressPercent}%"></div>
            </div>
        </div>

        <!-- 3D Flip Card Container -->
        <div class="w-full h-80 md:h-96 perspective-1000 cursor-pointer" onclick="toggleFlipFlashcard()">
            <div id="flashcard-inner" class="flashcard-inner relative w-full h-full text-center transition-transform duration-500 transform-style-3d ${isFlipped ? 'flipped' : ''}">
                
                <!-- FRONT OF CARD -->
                <div class="flashcard-front absolute w-full h-full backface-hidden rounded-3xl p-6 md:p-8 bg-linear-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-850 shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between items-center">
                    <div class="w-full flex justify-between items-center">
                        <span class="text-xs font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/60 flex items-center gap-1.5">
                            <span>${sourceFlag}</span>
                            <span class="capitalize">${card.sourceLang || 'Vocab'}</span>
                        </span>
                        ${card.partOfSpeech ? `<span class="text-[10px] uppercase font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-600">${escapeHtml(card.partOfSpeech)}</span>` : ''}
                    </div>

                    <div class="my-auto">
                        <h3 class="text-3xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight mb-2">
                            ${escapeHtml(card.word)}
                        </h3>
                        <div id="reading-hint-container" class="mt-2 min-h-6">
                            <button type="button" onclick="event.stopPropagation(); toggleReadingHint()" id="btn-reading-hint" class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                                <i class="fa-solid fa-eye mr-1"></i> ${t('flashcard.showHint')}
                            </button>
                            <p id="reading-hint-text" class="hidden text-sm font-mono text-slate-700 dark:text-slate-200 font-bold">
                                ${escapeHtml(card.reading || '')}
                            </p>
                        </div>
                    </div>

                    <div class="text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1.5 animate-pulse">
                        <i class="fa-solid fa-rotate text-sm"></i>
                        <span>${t('flashcard.clickToFlip')}</span>
                    </div>
                </div>

                <!-- BACK OF CARD -->
                <div class="flashcard-back absolute w-full h-full backface-hidden rounded-3xl p-6 md:p-8 bg-linear-to-b from-indigo-50 to-white dark:from-slate-800 dark:to-indigo-950/40 shadow-xl border-2 border-indigo-200 dark:border-indigo-800/80 flex flex-col justify-between items-center rotate-y-180">
                    <div class="w-full flex justify-between items-center">
                        <span class="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
                            <i class="fa-solid fa-circle-check"></i> ${t('flashcard.solutionTitle')}
                        </span>
                        <button type="button" onclick="event.stopPropagation(); playVocabAudio('${escapeJsStr(card.word)}', '${card.sourceLang}')" class="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300 p-1 transition" title="${t('vocabCard.listenPronunciation')}">
                            <i class="fa-solid fa-volume-high text-base"></i>
                        </button>
                    </div>

                    <div class="my-auto overflow-y-auto w-full max-h-48 px-2">
                        <h4 class="text-2xl md:text-3xl font-bold font-heading text-slate-900 dark:text-white mb-1">
                            ${escapeHtml(card.word)}
                        </h4>
                        ${card.reading ? `<p class="text-sm font-mono text-indigo-700 dark:text-indigo-300 mb-3 font-bold">${escapeHtml(card.reading)}</p>` : ''}
                        
                        <div class="p-3 bg-white dark:bg-slate-800 rounded-xl border border-indigo-100 dark:border-indigo-900/60 shadow-xs">
                            <span class="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 block mb-0.5">${t('vocabCard.meaningLabel')}</span>
                            <p class="text-base md:text-lg font-bold text-slate-900 dark:text-slate-50">${escapeHtml(card.meaning)}</p>
                        </div>

                        ${card.contextInSong ? `
                        <p class="text-xs text-slate-700 dark:text-slate-300 mt-2 font-medium italic bg-slate-50 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-200/70 dark:border-slate-800">
                            "${escapeHtml(card.contextInSong)}"
                        </p>` : ''}
                    </div>

                    <div class="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                        ${t('flashcard.rateMemoryHint')}
                    </div>
                </div>

            </div>
        </div>

        <!-- Action Control Buttons -->
        <div class="w-full mt-6 grid grid-cols-2 gap-3">
            <button type="button" onclick="answerFlashcard(false)" class="py-3 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/70 text-rose-800 dark:text-rose-200 font-bold text-sm border border-rose-200 dark:border-rose-800 shadow-sm transition flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95">
                <i class="fa-solid fa-xmark text-lg text-rose-600 dark:text-rose-400"></i>
                <span>${t('flashcard.forgotBtn')}</span>
            </button>

            <button type="button" onclick="answerFlashcard(true)" class="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95">
                <i class="fa-solid fa-check text-lg text-white"></i>
                <span>${t('flashcard.gotItBtn')}</span>
            </button>
        </div>

        <!-- Keyboard Shortcut Hint -->
        <div class="mt-3 text-[11px] text-slate-600 dark:text-slate-400 font-medium flex items-center gap-3">
            <span><kbd class="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px] text-slate-700 dark:text-slate-200 font-mono font-bold">Space</kbd> พลิกการ์ด</span>
            <span><kbd class="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px] text-slate-700 dark:text-slate-200 font-mono font-bold">←</kbd> ลืม</span>
            <span><kbd class="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px] text-slate-700 dark:text-slate-200 font-mono font-bold">→</kbd> จำได้</span>
        </div>
    </div>`;
}

/**
 * Renders the final score summary screen.
 * @param {object} stats
 * @param {number} stats.total - Total words reviewed.
 * @param {number} stats.correct - Number of "Got it" answers.
 * @param {Array<object>} stats.forgottenCards - List of cards marked as forgot.
 * @returns {string} HTML markup.
 */
export function renderFlashcardSummary(stats) {
    const { total, correct, forgottenCards } = stats;
    const scorePercent = total > 0 ? Math.round((correct / total) * 100) : 0;
    
    let celebrationBadge = '';
    let celebrationTitle = '';
    let celebrationDesc = '';

    if (scorePercent >= 80) {
        celebrationBadge = '🎉';
        celebrationTitle = t('flashcard.summaryGreatTitle');
        celebrationDesc = t('flashcard.summaryGreatDesc');
    } else if (scorePercent >= 50) {
        celebrationBadge = '👍';
        celebrationTitle = t('flashcard.summaryGoodTitle');
        celebrationDesc = t('flashcard.summaryGoodDesc');
    } else {
        celebrationBadge = '💪';
        celebrationTitle = t('flashcard.summaryKeepTryingTitle');
        celebrationDesc = t('flashcard.summaryKeepTryingDesc');
    }

    let forgottenListHtml = '';
    if (forgottenCards && forgottenCards.length > 0) {
        forgottenListHtml = `
        <div class="mt-4 text-left w-full">
            <h5 class="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1">
                <i class="fa-solid fa-rotate-left text-rose-500"></i>
                <span>${t('flashcard.forgottenListTitle')} (${forgottenCards.length})</span>
            </h5>
            <div class="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                ${forgottenCards.map(c => `
                    <div class="p-2 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex justify-between items-center">
                        <div>
                            <span class="font-bold text-slate-900 dark:text-slate-100">${escapeHtml(c.word)}</span>
                            ${c.reading ? `<span class="text-slate-600 dark:text-slate-400 font-mono text-[10px] ml-1">(${escapeHtml(c.reading)})</span>` : ''}
                        </div>
                        <span class="text-indigo-700 dark:text-indigo-300 font-bold">${escapeHtml(c.meaning)}</span>
                    </div>
                `).join('')}
            </div>
        </div>`;
    }

    return `
    <div class="text-center py-4 px-2 max-w-md mx-auto flex flex-col items-center">
        <div class="text-5xl mb-2 animate-bounce">${celebrationBadge}</div>
        <h3 class="text-xl md:text-2xl font-bold font-heading text-slate-900 dark:text-white mb-1">
            ${celebrationTitle}
        </h3>
        <p class="text-xs text-slate-600 dark:text-slate-300 mb-6 font-medium">${celebrationDesc}</p>

        <!-- Score Ring / Box -->
        <div class="w-full bg-linear-to-br from-indigo-600 to-indigo-800 text-white rounded-3xl p-6 shadow-xl mb-4 border border-indigo-500/50">
            <span class="text-xs uppercase font-bold text-indigo-200 tracking-wider">${t('flashcard.finalScore')}</span>
            <div class="text-4xl md:text-5xl font-black font-heading my-1 text-white">
                ${correct} / ${total}
            </div>
            <div class="text-sm font-bold text-indigo-100">
                ${scorePercent}% ${t('flashcard.accuracy')}
            </div>
        </div>

        ${forgottenListHtml}

        <!-- Action Buttons -->
        <div class="w-full mt-6 space-y-2">
            ${forgottenCards && forgottenCards.length > 0 ? `
                <button type="button" onclick="restartFlashcardsOnlyForgotten()" class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-md transition flex items-center justify-center gap-2 text-sm">
                    <i class="fa-solid fa-repeat"></i>
                    <span>${t('flashcard.reviewForgottenBtn')} (${forgottenCards.length})</span>
                </button>
            ` : ''}

            <button type="button" onclick="restartFlashcardsAll()" class="w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100 font-bold rounded-2xl transition flex items-center justify-center gap-2 text-sm">
                <i class="fa-solid fa-rotate"></i>
                <span>${t('flashcard.restartAllBtn')}</span>
            </button>

            <button type="button" onclick="closeModal('flashcardModal')" class="w-full py-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 text-xs font-bold">
                ${t('flashcard.backToDeckBtn')}
            </button>
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
