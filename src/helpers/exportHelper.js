/**
 * Lyrics & Translation Exporter Helper
 * Supports exporting song lyrics and translations to CSV, PDF, HTML, and JSON.
 */

/**
 * Parses the translated output string into a clean array of line objects.
 * @param {object} song 
 * @returns {Array<{original: string, romaji_en?: string, romaji_th?: string, pinyin_en?: string, pinyin_th?: string, thai: string}>}
 */
export function parseLyrics(song) {
    if (!song || !song.translatedOutput) return [];
    try {
        let output = song.translatedOutput;
        if (typeof output === 'string') {
            output = output.trim();
            if (output.startsWith('"') && output.endsWith('"')) {
                try { output = JSON.parse(output); } catch (e) {}
            }
            const firstBracket = output.indexOf('[');
            const lastBracket = output.lastIndexOf(']');
            if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
                output = output.substring(firstBracket, lastBracket + 1);
            }
        }
        const parsed = typeof output === 'string' ? JSON.parse(output) : output;
        if (Array.isArray(parsed)) {
            return parsed.map(item => {
                if (typeof item === 'string') return { original: item, thai: '' };
                return {
                    original: item.original || item.text || item.source || item.japanese || item.chinese || item.english || '',
                    romaji_en: item.romaji_en || item.pinyin_en || item.romaji || item.pinyin || '',
                    romaji_th: item.romaji_th || item.pinyin_th || item.thai_phonetic || '',
                    pinyin_en: item.pinyin_en || item.pinyin || item.romaji_en || '',
                    pinyin_th: item.pinyin_th || item.thai_phonetic || item.romaji_th || '',
                    thai: item.thai || item.translation || item.meaning || item.thai_translation || ''
                };
            });
        }
    } catch (e) {
        // Fallback for plain text format
        const lines = String(song.translatedOutput).split('\n').filter(l => l.trim().length > 0);
        return lines.map(line => ({ original: line, thai: '' }));
    }
    return [];
}

/**
 * Cleans a filename to be safe across operating systems (Windows, Mac, Linux).
 * @param {object} song 
 * @param {string} extension 
 * @returns {string}
 */
export function getSafeFilename(song, extension) {
    const artist = (song.artist || 'Unknown Artist').trim();
    const title = (song.songTitle || 'Untitled Song').trim();
    const baseName = `${artist} - ${title} (Lyrics)`;
    const safeName = baseName.replace(/[\/\\:*?"<>|]/g, '_').replace(/\s+/g, ' ');
    return `${safeName}.${extension}`;
}

/**
 * Triggers a browser file download using Blob URL.
 * @param {Blob} blob 
 * @param {string} filename 
 */
export function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/**
 * Helper to escape CSV cell value.
 * @param {any} val 
 * @returns {string}
 */
function escapeCSV(val) {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
}

/**
 * Exports song lyrics to CSV format with UTF-8 BOM.
 * @param {object} song 
 */
export function exportSongCSV(song) {
    const lyrics = parseLyrics(song);
    const isJP = song.language === 'japanese';
    const isCN = song.language === 'chinese';

    let headers = [];
    if (isJP) {
        headers = ['Line', 'Original (Japanese)', 'Romaji (English)', 'Romaji (Thai Pronunciation)', 'Thai Translation'];
    } else if (isCN) {
        headers = ['Line', 'Original (Chinese)', 'Pinyin (English)', 'Pinyin (Thai Pronunciation)', 'Thai Translation'];
    } else {
        headers = ['Line', 'Original Lyrics', 'Thai Translation'];
    }

    const rows = [];
    // Metadata comments
    rows.push(`# Title: ${song.songTitle || ''}`);
    rows.push(`# Artist: ${song.artist || ''}`);
    rows.push(`# Language: ${song.language || ''}`);
    if (song.mediaLink) rows.push(`# Media Link: ${song.mediaLink}`);
    rows.push(`# Translated By: ${song.userName || 'Unknown'}`);
    rows.push(`# Exported At: ${new Date().toISOString()}`);
    rows.push(`# Disclaimer: ลิขสิทธิ์เนื้อเพลง คำแปล และผลงานต้นฉบับทั้งหมดบนเว็บไซต์ lyric.hxvapp.com เป็นทรัพย์สินทางปัญญาของศิลปิน ผู้แต่ง และค่ายเพลงต้นสังกัด ทางเว็บไซต์เป็นเพียงเครื่องมือที่จัดทำขึ้นเพื่อวัตถุประสงค์ในการศึกษา การฝึกภาษา และการออกเสียงเท่านั้น ทางเราไม่ได้อ้างสิทธิ์ความเป็นเจ้าของในเนื้อหาต้นฉบับใดๆ ทั้งสิ้น โปรดสนับสนุนศิลปินต้นฉบับโดยการรับฟังผลงานผ่านช่องทางสตรีมมิ่งอย่างเป็นทางการ`);
    rows.push('');
    rows.push(headers.map(escapeCSV).join(','));

    lyrics.forEach((item, idx) => {
        const lineNum = idx + 1;
        const orig = item.original || '';
        const thai = item.thai || '';
        if (isJP) {
            rows.push([
                escapeCSV(lineNum),
                escapeCSV(orig),
                escapeCSV(item.romaji_en || ''),
                escapeCSV(item.romaji_th || ''),
                escapeCSV(thai)
            ].join(','));
        } else if (isCN) {
            rows.push([
                escapeCSV(lineNum),
                escapeCSV(orig),
                escapeCSV(item.pinyin_en || ''),
                escapeCSV(item.pinyin_th || ''),
                escapeCSV(thai)
            ].join(','));
        } else {
            rows.push([
                escapeCSV(lineNum),
                escapeCSV(orig),
                escapeCSV(thai)
            ].join(','));
        }
    });

    // Prepend UTF-8 BOM (\uFEFF) for Excel compatibility
    const csvContent = '\uFEFF' + rows.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, getSafeFilename(song, 'csv'));
}

/**
 * Exports song lyrics to structured JSON format.
 * @param {object} song 
 */
export function exportSongJSON(song) {
    const lyrics = parseLyrics(song);
    const exportObject = {
        title: song.songTitle || '',
        artist: song.artist || '',
        language: song.language || '',
        mediaLink: song.mediaLink || '',
        translatedBy: song.userName || '',
        exportedAt: new Date().toISOString(),
        disclaimer: {
            th: "ลิขสิทธิ์เนื้อเพลง คำแปล และผลงานต้นฉบับทั้งหมดบนเว็บไซต์ lyric.hxvapp.com เป็นทรัพย์สินทางปัญญาของศิลปิน ผู้แต่ง และค่ายเพลงต้นสังกัด ทางเว็บไซต์เป็นเพียงเครื่องมือที่จัดทำขึ้นเพื่อวัตถุประสงค์ในการศึกษา การฝึกภาษา และการออกเสียงเท่านั้น ทางเราไม่ได้อ้างสิทธิ์ความเป็นเจ้าของในเนื้อหาต้นฉบับใดๆ ทั้งสิ้น โปรดสนับสนุนศิลปินต้นฉบับโดยการรับฟังผลงานผ่านช่องทางสตรีมมิ่งอย่างเป็นทางการ",
            en: "The lyrics, translations, and original musical compositions provided on lyric.hxvapp.com remain the intellectual property of their respective artists, writers, and record labels. This website is an educational tool designed strictly for language learning and pronunciation practice. We do not claim ownership of any copyrighted original materials. Please support the original artists by streaming their music on official platforms."
        },
        totalLines: lyrics.length,
        lyrics: lyrics.map((item, idx) => {
            const lineObj = { line: idx + 1, original: item.original || '' };
            if (item.romaji_en) lineObj.romaji_en = item.romaji_en;
            if (item.romaji_th) lineObj.romaji_th = item.romaji_th;
            if (item.pinyin_en) lineObj.pinyin_en = item.pinyin_en;
            if (item.pinyin_th) lineObj.pinyin_th = item.pinyin_th;
            lineObj.thai = item.thai || '';
            return lineObj;
        })
    };

    const jsonString = JSON.stringify(exportObject, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
    downloadBlob(blob, getSafeFilename(song, 'json'));
}

/**
 * Exports song lyrics to a standalone, beautifully styled HTML file.
 * @param {object} song 
 */
export function exportSongHTML(song) {
    const lyrics = parseLyrics(song);
    const isJP = song.language === 'japanese';
    const isCN = song.language === 'chinese';
    const title = song.songTitle || 'Untitled Song';
    const artist = song.artist || 'Unknown Artist';
    const mediaLink = song.mediaLink || '';
    const dateStr = new Date().toLocaleDateString();

    let lyricsRowsHTML = '';
    lyrics.forEach((item, idx) => {
        let phoneticHTML = '';
        if (isJP) {
            phoneticHTML = `
                <div class="phonetic">
                    <span class="en-phonetic">Romaji: ${item.romaji_en || ''}</span>
                    <span class="th-phonetic">ไทย: ${item.romaji_th || ''}</span>
                </div>`;
        } else if (isCN) {
            phoneticHTML = `
                <div class="phonetic">
                    <span class="en-phonetic">Pinyin: ${item.pinyin_en || ''}</span>
                    <span class="th-phonetic">ไทย: ${item.pinyin_th || ''}</span>
                </div>`;
        }

        lyricsRowsHTML += `
        <div class="lyric-card">
            <div class="line-number">${idx + 1}</div>
            <div class="line-body">
                <div class="original">${item.original || ''}</div>
                ${phoneticHTML}
                <div class="translation">${item.thai || ''}</div>
            </div>
        </div>`;
    });

    const htmlContent = `<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - ${artist} | Lyrics & Translation</title>
    <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@400;600;700&family=Sarabun:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #f8fafc;
            --card-bg: #ffffff;
            --text-main: #1e293b;
            --text-sub: #64748b;
            --primary: #4f46e5;
            --primary-light: #eef2ff;
            --border: #e2e8f0;
            --thai-color: #312e81;
        }
        @media (prefers-color-scheme: dark) {
            :root {
                --bg-color: #0f172a;
                --card-bg: #1e293b;
                --text-main: #f1f5f9;
                --text-sub: #94a3b8;
                --primary: #818cf8;
                --primary-light: #1e1b4b;
                --border: #334155;
                --thai-color: #c7d2fe;
            }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Sarabun', -apple-system, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-main);
            line-height: 1.6;
            padding: 2rem 1rem;
        }
        .container {
            max-width: 760px;
            margin: 0 auto;
        }
        .header {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 1.25rem;
            padding: 1.75rem;
            margin-bottom: 1.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        .title {
            font-family: 'Prompt', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-main);
            margin-bottom: 0.25rem;
        }
        .artist {
            font-size: 1rem;
            font-weight: 500;
            color: var(--text-sub);
            margin-bottom: 0.75rem;
        }
        .meta-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            font-size: 0.75rem;
            font-weight: 600;
        }
        .tag {
            background: var(--primary-light);
            color: var(--primary);
            padding: 0.25rem 0.6rem;
            border-radius: 0.5rem;
            text-transform: uppercase;
        }
        .media-link {
            color: var(--primary);
            text-decoration: none;
            word-break: break-all;
            display: inline-block;
            margin-top: 0.5rem;
            font-size: 0.8rem;
        }
        .media-link:hover { text-decoration: underline; }
        .lyrics-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        .lyric-card {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 1rem;
            padding: 1rem 1.25rem;
            display: flex;
            gap: 1rem;
            align-items: flex-start;
            box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.02);
        }
        .line-number {
            font-family: monospace;
            font-size: 0.75rem;
            color: var(--text-sub);
            background: var(--bg-color);
            border: 1px solid var(--border);
            border-radius: 0.375rem;
            padding: 0.15rem 0.4rem;
            flex-shrink: 0;
            margin-top: 0.2rem;
        }
        .line-body {
            flex-grow: 1;
        }
        .original {
            font-size: 0.95rem;
            color: var(--text-sub);
            margin-bottom: 0.25rem;
        }
        .phonetic {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            font-size: 0.8rem;
            margin-bottom: 0.25rem;
        }
        .en-phonetic {
            font-family: monospace;
            color: var(--text-sub);
        }
        .th-phonetic {
            color: var(--primary);
            font-weight: 500;
        }
        .translation {
            font-size: 1.05rem;
            font-weight: 700;
            color: var(--thai-color);
        }
        .footer {
            text-align: center;
            margin-top: 2rem;
            font-size: 0.75rem;
            color: var(--text-sub);
        }
        @media print {
            body { background: #fff !important; color: #000 !important; padding: 0 !important; }
            .header, .lyric-card { border-color: #cbd5e1 !important; box-shadow: none !important; break-inside: avoid; }
            .tag { background: #f1f5f9 !important; color: #334155 !important; border: 1px solid #cbd5e1; }
            .translation { color: #000 !important; }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1 class="title">${title}</h1>
            <p class="artist">${artist}</p>
            <div class="meta-tags">
                <span class="tag">${song.language || 'Song'}</span>
                <span class="tag">Exported: ${dateStr}</span>
            </div>
            ${mediaLink ? `<a href="${mediaLink}" target="_blank" class="media-link">🔗 ${mediaLink}</a>` : ''}
        </header>

        <main class="lyrics-list">
            ${lyricsRowsHTML}
        </main>

        <div class="disclaimer-box" style="margin-top: 2rem; padding: 1rem 1.25rem; border-radius: 1rem; background: var(--card-bg); border: 1px solid var(--border); font-size: 0.8rem; line-height: 1.6; color: var(--text-sub);">
            <div style="font-weight: 700; color: var(--text-main); margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
                <span>🛡️</span> <span>ข้อจำกัดความรับผิดชอบ (Disclaimer)</span>
            </div>
            <p style="margin-bottom: 0.5rem;">
                ลิขสิทธิ์เนื้อเพลง คำแปล และผลงานต้นฉบับทั้งหมดบนเว็บไซต์ lyric.hxvapp.com เป็นทรัพย์สินทางปัญญาของศิลปิน ผู้แต่ง และค่ายเพลงต้นสังกัด ทางเว็บไซต์เป็นเพียงเครื่องมือที่จัดทำขึ้นเพื่อวัตถุประสงค์ในการศึกษา การฝึกภาษา และการออกเสียงเท่านั้น ทางเราไม่ได้อ้างสิทธิ์ความเป็นเจ้าของในเนื้อหาต้นฉบับใดๆ ทั้งสิ้น
            </p>
            <p style="color: var(--primary); font-weight: 600;">
                🎵 โปรดสนับสนุนศิลปินต้นฉบับโดยการรับฟังผลงานผ่านช่องทางสตรีมมิ่งอย่างเป็นทางการ
            </p>
        </div>

        <footer class="footer">
            <p>Generated by Song Translator (hxvapp.com)</p>
        </footer>
    </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    downloadBlob(blob, getSafeFilename(song, 'html'));
}

/**
 * Generates an automated high-definition printable preview & trigger browser print/PDF export.
 * @param {object} song 
 */
export function exportSongPDF(song) {
    const lyrics = parseLyrics(song);
    const isJP = song.language === 'japanese';
    const isCN = song.language === 'chinese';
    const title = song.songTitle || 'Untitled Song';
    const artist = song.artist || 'Unknown Artist';
    const dateStr = new Date().toLocaleDateString();

    let tableRows = '';
    lyrics.forEach((item, idx) => {
        let phoneticText = '';
        if (isJP) {
            phoneticText = `<div style="font-size:11px;color:#475569;font-family:monospace;">${item.romaji_en || ''}</div>
                            <div style="font-size:11px;color:#4f46e5;font-weight:500;">${item.romaji_th || ''}</div>`;
        } else if (isCN) {
            phoneticText = `<div style="font-size:11px;color:#475569;font-family:monospace;">${item.pinyin_en || ''}</div>
                            <div style="font-size:11px;color:#4f46e5;font-weight:500;">${item.pinyin_th || ''}</div>`;
        }

        tableRows += `
        <tr style="border-bottom: 1px solid #e2e8f0; page-break-inside: avoid;">
            <td style="padding: 8px 6px; text-align: center; color: #94a3b8; font-size: 11px; width: 32px;">${idx + 1}</td>
            <td style="padding: 8px 10px; font-size: 12px; color: #334155; width: 38%;">
                <div style="font-weight: 500; font-size: 13px; color: #1e293b; margin-bottom: 2px;">${item.original || ''}</div>
                ${phoneticText}
            </td>
            <td style="padding: 8px 10px; font-size: 13px; font-weight: 600; color: #1e1b4b; width: 55%;">${item.thai || ''}</td>
        </tr>`;
    });

    const printWindow = window.open('', '_blank', 'width=850,height=900');
    if (!printWindow) {
        alert('Please allow popups to generate and print PDF.');
        return;
    }

    const printHTML = `<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <title>${title} - ${artist} (PDF Export)</title>
    <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@500;700&family=Sarabun:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        @page { size: A4; margin: 15mm 12mm; }
        body {
            font-family: 'Sarabun', sans-serif;
            color: #0f172a;
            margin: 0;
            padding: 10px;
            background: #fff;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .header {
            border-bottom: 2px solid #4f46e5;
            padding-bottom: 12px;
            margin-bottom: 16px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }
        .title {
            font-family: 'Prompt', sans-serif;
            font-size: 20px;
            font-weight: 700;
            color: #1e293b;
            margin: 0 0 4px 0;
        }
        .artist {
            font-size: 14px;
            color: #475569;
            margin: 0;
        }
        .meta {
            text-align: right;
            font-size: 11px;
            color: #64748b;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th {
            background-color: #f8fafc;
            border-bottom: 1.5px solid #cbd5e1;
            padding: 8px 10px;
            font-size: 11px;
            font-weight: 700;
            color: #475569;
            text-align: left;
        }
        .footer {
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #e2e8f0;
            font-size: 10px;
            color: #94a3b8;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="header">
        <div>
            <h1 class="title">${title}</h1>
            <p class="artist">${artist} ${song.language ? `• (${song.language.toUpperCase()})` : ''}</p>
        </div>
        <div class="meta">
            <div>Song Translator (hxvapp.com)</div>
            <div>Date: ${dateStr}</div>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 32px; text-align: center;">#</th>
                <th>Original / Phonetic</th>
                <th>Thai Translation (คำแปลไทย)</th>
            </tr>
        </thead>
        <tbody>
            ${tableRows}
        </tbody>
    </table>

    <div class="disclaimer-box" style="margin-top: 18px; padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 9px; color: #64748b; background-color: #f8fafc; line-height: 1.45; page-break-inside: avoid;">
        <div style="font-weight: 700; color: #1e293b; margin-bottom: 2px;">ข้อจำกัดความรับผิดชอบ (Disclaimer):</div>
        <div style="margin-bottom: 3px;">ลิขสิทธิ์เนื้อเพลง คำแปล และผลงานต้นฉบับทั้งหมดบนเว็บไซต์ lyric.hxvapp.com เป็นทรัพย์สินทางปัญญาของศิลปิน ผู้แต่ง และค่ายเพลงต้นสังกัด ทางเว็บไซต์เป็นเพียงเครื่องมือที่จัดทำขึ้นเพื่อวัตถุประสงค์ในการศึกษา การฝึกภาษา และการออกเสียงเท่านั้น ทางเราไม่ได้อ้างสิทธิ์ความเป็นเจ้าของในเนื้อหาต้นฉบับใดๆ ทั้งสิ้น</div>
        <div style="font-weight: 600; color: #4f46e5;">โปรดสนับสนุนศิลปินต้นฉบับโดยการรับฟังผลงานผ่านช่องทางสตรีมมิ่งอย่างเป็นทางการ</div>
    </div>

    <div class="footer">
        Generated by Song Translator by hxvapp.com
    </div>

    <script>
        window.onload = function() {
            setTimeout(function() {
                window.print();
            }, 300);
        };
    <\/script>
</body>
</html>`;

    printWindow.document.open();
    printWindow.document.write(printHTML);
    printWindow.document.close();
}
