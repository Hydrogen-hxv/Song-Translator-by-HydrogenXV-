/**
 * LyricCard Component (Vanilla HTML template generator)
 */

/**
 * Renders the HTML markup for a single song translation card.
 * @param {object} s - Song data object.
 * @param {object} currentUser - Current logged-in user object from Firebase Auth.
 * @param {object} userProfileData - Current user's profile details from Firestore.
 * @param {boolean} isAdmin - Flag indicating if the current user is an admin.
 * @returns {string} HTML markup string.
 */
export function renderLyricCard(s, currentUser, userProfileData, isAdmin = false) {
    const isOwner = currentUser && s.translatedBy === currentUser.uid;
    const isFav = userProfileData && userProfileData.favorites && userProfileData.favorites.includes(s.id);
    const favIconClass = isFav ? 'fa-solid fa-star text-amber-400' : 'fa-regular fa-star text-slate-300 dark:text-slate-600 hover:text-amber-300 dark:hover:text-amber-400';
    const isSongHidden = s.hidden === true;

    let hiddenBadge = '';
    let cardStyleClass = "bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col hover:shadow-md transition";
    if (isSongHidden) {
        hiddenBadge = `<span class="bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-300 text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1"><i class="fa-solid fa-eye-slash"></i> ซ่อนอยู่</span>`;
        cardStyleClass = "bg-slate-100/70 dark:bg-slate-800/50 border-slate-300 dark:border-slate-700 rounded-2xl p-4 md:p-5 shadow-sm border flex flex-col opacity-75 transition";
    }

    let mediaLayout = '';
    if (s.mediaLink) {
        const ytMatch = s.mediaLink.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
        const spMatch = s.mediaLink.match(/spotify\.com\/(track|album|playlist)\/([a-zA-Z0-9]+)/i);
        if (ytMatch) {
            mediaLayout = `<div class="mt-3 aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-black"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/${ytMatch[1]}" frameborder="0" allowfullscreen></iframe></div>`;
        } else if (spMatch) {
            mediaLayout = `<div class="mt-3 h-20 rounded-xl overflow-hidden"><iframe src="https://open.spotify.com/embed/${spMatch[1]}/${spMatch[2]}?utm_source=generator" width="100%" height="100%" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen"></iframe></div>`;
        } else {
            mediaLayout = `<a href="${s.mediaLink}" target="_blank" class="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 px-3 py-2 rounded-xl text-xs font-bold flex justify-center items-center gap-2 mt-3 transition"><i class="fa-solid fa-arrow-up-right-from-square"></i> เปิดสื่อต้นฉบับบนเว็บ</a>`;
        }
    }

    let lyricsLayout = '';
    try {
        const parsed = JSON.parse(s.translatedOutput);
        if (Array.isArray(parsed)) {
            parsed.forEach(line => {
                if (s.language === 'japanese') {
                    lyricsLayout += `<div class="border-b border-slate-100 dark:border-slate-700/60 pb-2 mb-2 text-xs md:text-sm"><p class="text-slate-400 dark:text-slate-400 font-medium">ต้นฉบับ: ${line.original || ''}</p><p class="text-slate-500 dark:text-slate-300 font-mono">Romaji (EN): ${line.romaji_en || ''}</p><p class="text-indigo-400 dark:text-indigo-400">Romaji (TH): ${line.romaji_th || ''}</p><p class="text-slate-800 dark:text-slate-100 font-bold mt-0.5">แปลไทย: ${line.thai || ''}</p></div>`;
                } else if (s.language === 'chinese') {
                    lyricsLayout += `<div class="border-b border-slate-100 dark:border-slate-700/60 pb-2 mb-2 text-xs md:text-sm"><p class="text-slate-400 dark:text-slate-400 font-medium">ต้นฉบับ: ${line.original || ''}</p><p class="text-slate-500 dark:text-slate-300 font-mono">Pinyin (EN): ${line.pinyin_en || ''}</p><p class="text-indigo-400 dark:text-indigo-400">Pinyin (TH): ${line.pinyin_th || ''}</p><p class="text-slate-800 dark:text-slate-100 font-bold mt-0.5">แปลไทย: ${line.thai || ''}</p></div>`;
                } else {
                    lyricsLayout += `<div class="border-b border-slate-100 dark:border-slate-700/60 pb-2 mb-2 text-xs md:text-sm"><p class="text-slate-400 dark:text-slate-400">ต้นฉบับ: ${line.original || ''}</p><p class="text-slate-800 dark:text-slate-100 font-bold mt-0.5">แปลไทย: ${line.thai || ''}</p></div>`;
                }
            });
        }
    } catch (e) {
        lyricsLayout = `<p class="text-xs text-slate-500 dark:text-slate-400 italic whitespace-pre-wrap">${s.translatedOutput}</p>`;
    }

    const safeUserName = (s.userName || 'User').replace(/"/g, '&quot;');
    const safeTitle = (s.songTitle || '').replace(/"/g, '&quot;');
    const safeArtist = (s.artist || '').replace(/"/g, '&quot;');

    return `
    <article class="${cardStyleClass}" itemscope itemtype="https://schema.org/MusicRecording">
        <meta itemprop="inLanguage" content="${s.language || 'unknown'}">
        <div class="flex justify-between items-start gap-2 mb-2">
            <div class="truncate">
                <div class="flex items-center gap-2 mb-0.5 flex-wrap">
                    <h3 itemprop="name" class="font-bold text-base md:text-lg text-slate-800 dark:text-slate-100 font-heading leading-tight truncate" title="${safeTitle}">${s.songTitle}</h3>
                    ${hiddenBadge}
                </div>
                <p itemprop="byArtist" class="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-medium truncate" title="${safeArtist}">${s.artist}</p>
            </div>
            <button type="button" onclick="toggleFavorite(event, '${s.id}')" aria-label="เพิ่มลงรายการโปรด" class="text-xl p-1 transition shrink-0 hover:scale-110 active:scale-95" title="รายการโปรด"><i id="fav-icon-${s.id}" class="${favIconClass}"></i></button>
        </div>
        
        <div class="bg-slate-50 dark:bg-slate-900/70 rounded-xl p-3 my-2 max-h-48 md:max-h-56 overflow-y-auto border border-slate-100 dark:border-slate-700/60" itemprop="recordingOf">${lyricsLayout}</div>
        ${mediaLayout}

        <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between gap-2">
            <div class="flex items-center gap-1.5 cursor-pointer shrink-0" onclick="viewPublicProfile('${s.translatedBy}')" title="ดูโปรไฟล์ของผู้แปล">
                <img src="${s.userPhoto || 'https://via.placeholder.com/150'}" alt="${safeUserName} รูปโปรไฟล์" loading="lazy" width="28" height="28" class="w-6 h-6 md:w-7 md:h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700">
                <span class="text-[10px] md:text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 truncate max-w-[80px] md:max-w-[120px]">${s.userName || 'Unknown'}</span>
            </div>
            <div class="flex items-center gap-1.5 md:gap-2 flex-wrap">
                ${isOwner || isAdmin ? `
                    <button type="button" onclick="openEditor('${s.id}')" aria-label="แก้ไขเนื้อเพลง" class="text-[10px] md:text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 px-2 md:px-3 py-1.5 rounded-lg"><i class="fa-solid fa-signature"></i> แก้ไข</button>
                ` : ''}
                ${isOwner ? `
                    <button type="button" onclick="deleteSong('${s.id}')" aria-label="ลบเนื้อเพลง" class="text-[10px] md:text-xs font-bold text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 bg-red-50 dark:bg-red-950/60 hover:bg-red-100 dark:hover:bg-red-900/60 px-2 md:px-3 py-1.5 rounded-lg"><i class="fa-solid fa-trash-can"></i> ลบ</button>
                ` : ''}
                ${isAdmin ? `
                    <button type="button" onclick="toggleHideSong('${s.id}', ${isSongHidden})" aria-label="${isSongHidden ? 'แสดงเนื้อเพลง' : 'ซ่อนเนื้อเพลง'}" class="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-300 hover:text-indigo-800 dark:hover:text-indigo-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 px-2 md:px-3 py-1.5 rounded-lg">
                        <i class="fa-solid ${isSongHidden ? 'fa-eye' : 'fa-eye-slash'}"></i> ${isSongHidden ? 'แสดง' : 'ซ่อน'}
                    </button>
                    <button type="button" onclick="openAdminAction('${s.translatedBy}', 'ban_user', '${(s.userName || '').replace(/'/g, "\\'")}')" aria-label="ระงับผู้ใช้" class="text-[10px] md:text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/60 bg-slate-100 dark:bg-slate-700 px-2 md:px-3 py-1.5 rounded-lg">
                        <i class="fa-solid fa-ban"></i> ระงับผู้ใช้
                    </button>
                ` : ''}
            </div>
        </div>
    </article>`;
}
