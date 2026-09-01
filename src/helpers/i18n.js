/**
 * Internationalization (i18n) Module
 * Supports: TH (Thai), EN (English), JP (Japanese), CN (Chinese)
 * Big Update v5.0: AI Lyrics Analysis, Vocab Context, My Deck, 3D Flashcards
 */

export const SUPPORTED_LANGUAGES = [
    { code: 'th', label: 'TH', flag: '🇹🇭', fullName: 'ภาษาไทย' },
    { code: 'en', label: 'EN', flag: '🇬🇧', fullName: 'English' },
    { code: 'ja', label: 'JP', flag: '🇯🇵', fullName: '日本語' },
    { code: 'zh', label: 'CN', flag: '🇨🇳', fullName: '简体中文' }
];

export const translations = {
    th: {
        appName: "Song Translate App",
        appSubtitle: "Song Translator & AI Vocab Studio by hxvapp.com v5.0",
        nav: {
            themeToggle: "สลับโหมดมืด / สว่าง",
            changelog: "Changelog v5.0",
            login: "เข้าสู่ระบบ",
            logout: "ออกจากระบบ",
            notifications: "การแจ้งเตือน",
            settings: "ตั้งค่าโปรไฟล์และ BYOK",
            admin: "Admin",
            langSelect: "เปลี่ยนภาษา / Change Language",
            myDeck: "คลังศัพท์ส่วนตัว",
            analysisTab: "วิเคราะห์คำศัพท์ด้วย AI",
            translateTab: "แปลเนื้อเพลงทั่วไป"
        },
        bannedBanner: {
            prefix: "บัญชีของคุณถูกระงับการใช้งานชั่วคราวเนื่องจาก: ",
            defaultReason: "ละเมิดกฎการใช้งาน"
        },
        translateForm: {
            heading: "แปลเนื้อเพลงใหม่ด้วย AI",
            sourceLang: "ภาษาต้นฉบับ",
            optJapanese: "JP ภาษาญี่ปุ่น (มี Romaji EN/TH)",
            optChinese: "CN ภาษาจีน (มี Pinyin EN/TH)",
            optEnglish: "EN ภาษาอังกฤษ / อื่นๆ",
            songTitle: "ชื่อเพลง",
            songTitlePlaceholder: "Title",
            artist: "ศิลปิน",
            artistPlaceholder: "Artist",
            mediaLink: "ลิงก์สื่อ (YouTube, Spotify)",
            mediaLinkPlaceholder: "https://...",
            lyrics: "เนื้อเพลงต้นฉบับ",
            lyricsPlaceholder: "วางเนื้อเพลงที่นี่...",
            btnTranslate: "เริ่มแปลด้วยคีย์ของฉัน",
            btnTranslating: "กำลังประมวลผล...",
            step1: "กำลังเชื่อมต่อระบบ AI...",
            step2: "วิเคราะห์และลดการใช้ Token...",
            step3: "เรียบเรียงและบันทึกลงระบบ..."
        },
        vocabAnalysis: {
            heading: "วิเคราะห์คำศัพท์จากเนื้อเพลงด้วย AI",
            sourceLangLabel: "ภาษาต้นฉบับ (Source)",
            targetLangLabel: "ภาษาผลลัพธ์ (Target)",
            optThai: "🇹🇭 ภาษาไทย (Thai)",
            optJapanese: "🇯🇵 ภาษาญี่ปุ่น (Japanese)",
            optEnglish: "🇬🇧 ภาษาอังกฤษ (English)",
            wordCountLabel: "จำนวนคำศัพท์ที่ต้องการสกัด",
            opt5words: "5 คำ (ฉบับย่อ/กระชับ)",
            opt10words: "10 คำ (มาตรฐาน)",
            opt15words: "15 คำ (ระดับปานกลาง)",
            opt25words: "25 คำ (เจาะลึก)",
            opt30words: "30 คำ (ครอบคลุมทั้งเพลง)",
            btnAnalyze: "วิเคราะห์คำศัพท์ด้วย AI",
            btnAnalyzing: "AI กำลังวิเคราะห์และแยกคำศัพท์...",
            step1: "กำลังอ่านและแยกคำศัพท์สำคัญจากเนื้อเพลง...",
            step2: "สร้างบทสนทนาจำลองและโครงสร้างประโยค...",
            step3: "วิเคราะห์คำต่อคำ (Tokenization) และไวยากรณ์...",
            highlighterHeading: "เนื้อเพลงพร้อมเน้นคำศัพท์ (Lyrics Highlighter)",
            highlighterHint: "คลิกคำที่ไฮไลท์เพื่อเลื่อนไปยังรายละเอียด",
            vocabListHeading: "คลังคำศัพท์เชิงลึก (Vocabulary Context)",
            items: "รายการ",
            wordsExtracted: "คำศัพท์ที่สกัดได้",
            practiceNow: "เริ่มฝึก Flashcards",
            emptyOrInvalid: "ไม่สามารถประมวลผลข้อมูลคำศัพท์ได้ กรุณาลองใหม่อีกครั้ง"
        },
        vocabCard: {
            meaningLabel: "ความหมาย",
            inSongContext: "บริบทในเนื้อเพลง",
            conversationTitle: "ตัวอย่างบทสนทนาจริง",
            tokenizationTitle: "วิเคราะห์แยกคำต่อคำ (Word-by-Word Analysis)",
            listenPronunciation: "ฟังเสียงออกเสียง",
            saved: "บันทึกแล้ว",
            saveToDeck: "บันทึกลงคลัง"
        },
        myDeck: {
            title: "คลังศัพท์ส่วนตัวของฉัน (My Deck)",
            searchPlaceholder: "ค้นหาคำศัพท์, คำอ่าน, ความหมาย หรือชื่อเพลง...",
            filterAll: "ทุกภาษา",
            filterJapanese: "🇯🇵 ญี่ปุ่น",
            filterEnglish: "🇬🇧 อังกฤษ",
            filterChinese: "🇨🇳 จีน",
            emptyTitle: "ยังไม่มีคำศัพท์ในคลังส่วนตัว",
            emptyDesc: "กดปุ่ม ⭐️ บนการ์ดคำศัพท์ที่วิเคราะห์ด้วย AI เพื่อบันทึกคำที่สนใจไว้ทบทวนได้ทุกที่ทุกเวลา",
            searchNoResult: "ไม่พบคำศัพท์ที่ตรงกับการค้นหา",
            deleteTooltip: "ลบออกจากคลังศัพท์",
            startFlashcards: "เริ่มฝึกทบทวน (Flashcards)",
            cloudSynced: "ข้อมูลซิงค์กับคลาวด์แล้ว",
            guestMode: "โหมดผู้เยี่ยมชม (บันทึกในเครื่อง)"
        },
        flashcard: {
            title: "ฝึกทบทวนคำศัพท์ (Flashcard Studio)",
            cardProgress: "การ์ดที่",
            showHint: "ดูคำอ่าน / Romaji",
            clickToFlip: "คลิกที่การ์ดเพื่อพลิกดูเฉลย",
            solutionTitle: "เฉลยความหมาย & ไวยากรณ์",
            rateMemoryHint: "ประเมินระดับความจำของคุณสำหรับคำนี้:",
            forgotBtn: "ลืม (Forgot)",
            gotItBtn: "จำได้แม่น (Got it)",
            finalScore: "คะแนนสรุปผลการฝึก",
            accuracy: "ความแม่นยำ",
            summaryGreatTitle: "สุดยอดมาก! ความจำดีเยี่ยม 🎉",
            summaryGreatDesc: "คุณจำคำศัพท์ส่วนใหญ่ได้อย่างแม่นยำ หมั่นทบทวนเป็นประจำเพื่อความจำระยะยาวครับ",
            summaryGoodTitle: "เก่งมาก! พัฒนาได้อีก 👍",
            summaryGoodDesc: "ทำได้ดีมาก ลองทบทวนคำศัพท์ที่ยังจำไม่ได้อีกรอบเพื่อความแม่นยำยิ่งขึ้น",
            summaryKeepTryingTitle: "สู้ๆ นะครับ! มาฝึกฝนกันต่อ 💪",
            summaryKeepTryingDesc: "การเรียนภาษาต้องอาศัยการฝึกซ้ำ ลองทบทวนคำศัพท์ที่ลืมอีกสักรอบนะครับ",
            forgottenListTitle: "คำศัพท์ที่ควรทบทวนเพิ่มเติม",
            reviewForgottenBtn: "ฝึกซ้ำเฉพาะคำที่ลืม",
            restartAllBtn: "เริ่มฝึกใหม่ทั้งหมด",
            backToDeckBtn: "กลับสู่คลังคำศัพท์"
        },
        library: {
            heading: "คลังเพลงแปลสาธารณะ",
            searchPlaceholder: "ค้นหาเพลง/ศิลปิน...",
            filterAll: "ทุกภาษา",
            filterJapanese: "🇯🇵 ญี่ปุ่น",
            filterChinese: "🇨🇳 จีน",
            filterEnglish: "🇬🇧 อื่นๆ",
            sortNewest: "ใหม่สุด",
            sortOldest: "เก่าสุด",
            favorites: "รายการโปรด",
            empty: "ไม่พบเพลงที่ตรงตามเงื่อนไข"
        },
        card: {
            original: "ต้นฉบับ:",
            romajiEn: "Romaji (EN):",
            romajiTh: "Romaji (TH):",
            pinyinEn: "Pinyin (EN):",
            pinyinTh: "Pinyin (TH):",
            translation: "แปลไทย:",
            hidden: "ซ่อนอยู่",
            openMedia: "เปิดสื่อต้นฉบับบนเว็บ",
            profileTooltip: "ดูโปรไฟล์ของผู้แปล",
            btnEdit: "แก้ไข",
            btnDelete: "ลบ",
            btnHide: "ซ่อน",
            btnShow: "แสดง",
            btnBan: "ระงับผู้ใช้",
            btnExport: "ส่งออก",
            favTooltip: "รายการโปรด",
            favAria: "เพิ่มลงรายการโปรด",
            btnAnalyzeVocab: "วิเคราะห์ศัพท์ AI"
        },
        disclaimer: {
            title: "ข้อจำกัดความรับผิดชอบ (Disclaimer):",
            text: "ลิขสิทธิ์เนื้อเพลง คำแปล และผลงานต้นฉบับทั้งหมดบนเว็บไซต์ lyric.hxvapp.com เป็นทรัพย์สินทางปัญญาของศิลปิน ผู้แต่ง และค่ายเพลงต้นสังกัด ทางเว็บไซต์เป็นเพียงเครื่องมือที่จัดทำขึ้นเพื่อวัตถุประสงค์ในการศึกษา การฝึกภาษา และการออกเสียงเท่านั้น ทางเราไม่ได้อ้างสิทธิ์ความเป็นเจ้าของในเนื้อหาต้นฉบับใดๆ ทั้งสิ้น",
            support: "โปรดสนับสนุนศิลปินต้นฉบับโดยการรับฟังผลงานผ่านช่องทางสตรีมมิ่งอย่างเป็นทางการ"
        },
        export: {
            title: "ส่งออกคำร้อง",
            csv: "CSV (.csv)",
            pdf: "PDF (.pdf)",
            html: "HTML (.html)",
            json: "JSON (.json)"
        },
        settingsModal: {
            title: "โปรไฟล์ & ระบบคีย์",
            yourUid: "UID ของคุณ:",
            accountStatus: "สถานะบัญชี:",
            adminRole: "ผู้ดูแลระบบ (Admin)",
            displayName: "ชื่อผู้ใช้ (Display Name)",
            profilePhoto: "รูปโปรไฟล์ (อัปโหลดไม่เกิน 1MB หรือใส่ URL)",
            photoPlaceholder: "https://... หรืออัปโหลดไฟล์ด้านบน",
            apiKey: "Gemini API Key (BYOK)",
            keyPlaceholder: "AI Studio Key...",
            saveKey: "เข้ารหัสและบันทึกคีย์ไว้ใช้ในระบบ",
            btnSave: "บันทึกการตั้งค่า"
        },
        editorModal: {
            title: "แก้ไขคำร้อง (Smart Editor)",
            line: "บรรทัดที่",
            lineSuffix: "",
            origLabel: "ต้นฉบับ",
            thaiLabel: "คำแปลไทย",
            btnCancel: "ยกเลิก",
            btnUpdate: "อัปเดตข้อมูล",
            corrupted: "ไม่สามารถดึงโครงสร้างมาแก้ไขได้ (รูปแบบเดิมผิดเพี้ยน)"
        },
        profileModal: {
            title: "ข้อมูลผู้ร่วมแปล",
            works: "ผลงานแปล",
            noWorks: "ผู้ใช้นี้ยังไม่มีผลงานแปลเพลงในขณะนี้"
        },
        changelogModal: {
            title: "อัปเดตและประวัติการพัฒนา (Patch Notes)"
        },
        tosModal: {
            title: "ข้อกำหนดและเงื่อนไข (Terms of Service)",
            introTitle: "1. บทนำ:",
            introText: "เว็บไซต์ lyric.Hxvapp.com ดำเนินการโดย hxvapp.com มีวัตถุประสงค์เพื่อเป็นเครื่องมือช่วยแปลเนื้อเพลงและเรียนรู้ภาษาผ่านระบบ AI",
            byokTitle: "2. ข้อมูลและการเข้ารหัส (BYOK):",
            byokText: "ระบบไม่ได้จัดเก็บ API Key ของท่านในรูปแบบข้อความปกติ แต่จะทำการเข้ารหัส (Encryption) ผูกกับบัญชีผู้ใช้ เพื่อความปลอดภัยสูงสุด",
            contentTitle: "3. สิทธิ์การจัดการเนื้อหา:",
            contentText: "ผู้ใช้งานเป็นเจ้าของและรับผิดชอบต่อเนื้อเพลงที่นำเข้าสู่ระบบ ระบบสงวนสิทธิ์ในการแก้ไขหรือลบโดยไม่แจ้งล่วงหน้า",
            disclaimerTitle: "4. ข้อจำกัดความรับผิดชอบ (Disclaimer):",
            disclaimerText: "ลิขสิทธิ์เนื้อเพลง คำแปล และผลงานต้นฉบับทั้งหมดบนเว็บไซต์ lyric.hxvapp.com เป็นทรัพย์สินทางปัญญาของศิลปิน ผู้แต่ง และค่ายเพลงต้นสังกัด ทางเว็บไซต์เป็นเพียงเครื่องมือที่จัดทำขึ้นเพื่อวัตถุประสงค์ในการศึกษา การฝึกภาษา และการออกเสียงเท่านั้น ทางเราไม่ได้อ้างสิทธิ์ความเป็นเจ้าของในเนื้อหาต้นฉบับใดๆ ทั้งสิ้น โปรดสนับสนุนศิลปินต้นฉบับโดยการรับฟังผลงานผ่านช่องทางสตรีมมิ่งอย่างเป็นทางการ",
            contactTitle: "5. การติดต่อ:",
            contactText: "หากมีข้อสงสัยหรือพบปัญหาการใช้งาน สามารถติดต่อผู้พัฒนาได้ที่อีเมล teerapat_kh@hxvapp.com หรือ Discord: selenite_rx"
        },
        adminModal: {
            title: "จัดการข้อมูล (Admin Only)",
            hideTitle: "ซ่อนเพลง:",
            banTitle: "ระงับการใช้งาน:",
            reasonLabel: "ระบุเหตุผลการดำเนินการ (จะแสดงให้ผู้รับทราบ)",
            reasonPlaceholder: "เช่น ละเมิดกฎการใช้งาน, เนื้อหาไม่เหมาะสม...",
            btnConfirm: "ยืนยันดำเนินการ",
            btnProcessing: "กำลังดำเนินการ..."
        },
        inboxModal: {
            title: "กล่องข้อความแจ้งเตือน",
            markAllRead: "ทำเครื่องหมายว่าอ่านแล้วทั้งหมด",
            empty: "ไม่มีการแจ้งเตือนในขณะนี้",
            justNow: "เมื่อสักครู่"
        },
        turnstile: {
            securityCheck: "ระบบตรวจสอบความปลอดภัย (Security Check)",
            waiting: "กำลังรอการยืนยันความปลอดภัย...",
            verified: "ยืนยันความปลอดภัยเรียบร้อยแล้ว",
            expired: "การยืนยันหมดอายุ กรุณายืนยันใหม่",
            error: "เกิดข้อผิดพลาดในการตรวจสอบความปลอดภัย"
        },
        toasts: {
            loginRequired: "กรุณาเข้าสู่ระบบก่อนใช้งานครับ",
            loginFavRequired: "กรุณาเข้าสู่ระบบก่อนบันทึกรายการโปรด",
            loginViewFavRequired: "กรุณาเข้าสู่ระบบเพื่อดูรายการโปรด",
            loginSettingsRequired: "กรุณาเข้าสู่ระบบก่อนตั้งค่า",
            keyIssue: "คีย์ของคุณมีปัญหา กรุณาตั้งค่าใหม่ในระบบครับ",
            keyMissing: "ไม่พบ API Key โปรดตั้งค่าที่เมนูฟันเฟือง (1 คีย์ใช้ได้หลายบัญชี)",
            fillRequired: "กรุณาระบุชื่อเพลงและเนื้อเพลงให้ครบถ้วน",
            securityRequired: "กรุณายืนยันความปลอดภัย (Security Check) ก่อนดำเนินการครับ",
            aiError: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์ AI",
            keyInvalid: "API Key ถูกปฏิเสธ หรือไม่ถูกต้อง โปรดตรวจสอบใหม่ครับ",
            translateSuccess: "แปลเพลงและบันทึกข้อมูลเรียบร้อยแล้ว!",
            vocabAnalysisSuccess: "วิเคราะห์คำศัพท์และสร้างบทเรียนเรียบร้อยแล้ว!",
            vocabCacheHit: "โหลดผลวิเคราะห์คำศัพท์จากคลังข้อมูลทันที (Instant Cache ⚡)",
            vocabSaved: "บันทึกคำศัพท์ลงในคลังเรียบร้อยแล้ว!",
            vocabRemoved: "นำคำศัพท์ออกจากคลังแล้ว",
            deckEmptyWarning: "ยังไม่มีคำศัพท์ในคลังสำหรับฝึก กรุณาวิเคราะห์และบันทึกคำศัพท์ก่อนครับ",
            favRemoved: "นำออกจากรายการโปรดแล้ว",
            favAdded: "บันทึกเป็นรายการโปรดแล้ว",
            favError: "เกิดข้อผิดพลาดในการบันทึกรายการโปรด",
            updateSuccess: "อัปเดตคำร้องเสร็จสิ้น!",
            deleteConfirm: "ยืนยันการลบเพลงนี้อย่างถาวร?",
            deleteSuccess: "ลบเพลงเรียบร้อยแล้ว",
            fileTooLarge: "ขนาดรูปภาพใหญ่เกินไป (จำกัด 1MB) โปรดเลือกภาพใหม่",
            saveProfileSuccess: "บันทึกข้อมูลโปรไฟล์และระบบคีย์เรียบร้อยแล้ว",
            noUnread: "ไม่มีการแจ้งเตือนที่ยังไม่ได้อ่านครับ",
            markAllReadSuccess: "ทำเครื่องหมายว่าอ่านแล้วทั้งหมดแล้วครับ",
            unauthorized: "คุณไม่มีสิทธิ์ดำเนินการนี้",
            unhideConfirm: "ต้องการยกเลิกการซ่อนเพลงนี้ใช่หรือไม่?",
            showSuccess: "แสดงเพลงเรียบร้อยแล้ว",
            reasonRequired: "กรุณาระบุเหตุผลการดำเนินการด้วยครับ",
            songNotFound: "ไม่พบเพลงนี้ในระบบ",
            hideSuccess: "ซ่อนเพลงและแจ้งเตือนผู้ใช้แล้ว",
            banSuccess: "ระงับผู้ใช้งานและบันทึกข้อมูลเรียบร้อยแล้ว",
            exportSuccess: "ส่งออกไฟล์เรียบร้อยแล้ว!",
            exportEmpty: "ไม่มีข้อมูลคำร้องที่จะส่งออก"
        }
    },
    en: {
        appName: "Song Translate App",
        appSubtitle: "Song Translator & AI Vocab Studio by hxvapp.com v5.0",
        nav: {
            themeToggle: "Toggle Dark / Light Mode",
            changelog: "Changelog v5.0",
            login: "Sign In",
            logout: "Sign Out",
            notifications: "Notifications",
            settings: "Profile & BYOK Settings",
            admin: "Admin",
            langSelect: "Change Language",
            myDeck: "My Deck",
            analysisTab: "AI Lyrics Analysis",
            translateTab: "Song Translation"
        },
        bannedBanner: {
            prefix: "Your account has been temporarily suspended due to: ",
            defaultReason: "Violation of terms of service"
        },
        translateForm: {
            heading: "Translate New Lyrics with AI",
            sourceLang: "Source Language",
            optJapanese: "JP Japanese (with Romaji EN/TH)",
            optChinese: "CN Chinese (with Pinyin EN/TH)",
            optEnglish: "EN English / Others",
            songTitle: "Song Title",
            songTitlePlaceholder: "Title",
            artist: "Artist",
            artistPlaceholder: "Artist",
            mediaLink: "Media Link (YouTube, Spotify)",
            mediaLinkPlaceholder: "https://...",
            lyrics: "Original Lyrics",
            lyricsPlaceholder: "Paste original lyrics here...",
            btnTranslate: "Translate with My Key",
            btnTranslating: "Processing...",
            step1: "Connecting to AI system...",
            step2: "Analyzing & optimizing token usage...",
            step3: "Formatting & saving to database..."
        },
        vocabAnalysis: {
            heading: "AI Lyrics Vocabulary Analysis",
            sourceLangLabel: "Source Language",
            targetLangLabel: "Target Translation Language",
            optThai: "🇹🇭 Thai",
            optJapanese: "🇯🇵 Japanese",
            optEnglish: "🇬🇧 English",
            wordCountLabel: "Vocabulary Count to Extract",
            opt5words: "5 Words (Compact)",
            opt10words: "10 Words (Standard)",
            opt15words: "15 Words (Intermediate)",
            opt25words: "25 Words (In-Depth)",
            opt30words: "30 Words (Full Coverage)",
            btnAnalyze: "Analyze Lyrics with AI",
            btnAnalyzing: "AI is analyzing vocabulary...",
            step1: "Extracting key vocabulary and morphemes...",
            step2: "Generating natural conversations & contexts...",
            step3: "Performing tokenization & syntactic breakdown...",
            highlighterHeading: "Lyrics Highlighter",
            highlighterHint: "Click highlighted words to jump to details",
            vocabListHeading: "Vocabulary Context & Analysis",
            items: "items",
            wordsExtracted: "Words Extracted",
            practiceNow: "Start Flashcards",
            emptyOrInvalid: "Unable to parse vocabulary data. Please try again."
        },
        vocabCard: {
            meaningLabel: "Meaning",
            inSongContext: "Context in Song",
            conversationTitle: "Simulated Conversation",
            tokenizationTitle: "Word-by-Word Breakdown (Tokenization)",
            listenPronunciation: "Listen to pronunciation",
            saved: "Saved",
            saveToDeck: "Save to Deck"
        },
        myDeck: {
            title: "My Personal Vocabulary Deck",
            searchPlaceholder: "Search vocabulary, readings, meanings, or songs...",
            filterAll: "All Languages",
            filterJapanese: "🇯🇵 Japanese",
            filterEnglish: "🇬🇧 English",
            filterChinese: "🇨🇳 Chinese",
            emptyTitle: "Your Deck is Empty",
            emptyDesc: "Click the ⭐️ button on any AI-analyzed vocabulary card to save words for spaced repetition practice.",
            searchNoResult: "No vocabulary items matched your search.",
            deleteTooltip: "Remove from My Deck",
            startFlashcards: "Start Flashcard Practice",
            cloudSynced: "Cloud Synced",
            guestMode: "Guest Mode (Saved Locally)"
        },
        flashcard: {
            title: "Flashcard Review Studio",
            cardProgress: "Card",
            showHint: "Show Reading / Romaji Hint",
            clickToFlip: "Click card to flip for solution",
            solutionTitle: "Solution & Grammar Breakdown",
            rateMemoryHint: "Rate your memory for this card:",
            forgotBtn: "Forgot",
            gotItBtn: "Got it!",
            finalScore: "Final Review Score",
            accuracy: "Accuracy",
            summaryGreatTitle: "Outstanding! Perfect Memory 🎉",
            summaryGreatDesc: "You remembered almost all vocabulary accurately. Keep up the regular practice!",
            summaryGoodTitle: "Great Job! Well Done 👍",
            summaryGoodDesc: "Solid performance. Review the forgotten cards once more to solidify your memory.",
            summaryKeepTryingTitle: "Keep Going! Practice Makes Perfect 💪",
            summaryKeepTryingDesc: "Language learning is a journey. Try reviewing the forgotten words once more!",
            forgottenListTitle: "Words Needing Review",
            reviewForgottenBtn: "Review Forgotten Words",
            restartAllBtn: "Restart All Cards",
            backToDeckBtn: "Back to My Deck"
        },
        library: {
            heading: "Public Translated Song Library",
            searchPlaceholder: "Search song/artist...",
            filterAll: "All Languages",
            filterJapanese: "🇯🇵 Japanese",
            filterChinese: "🇨🇳 Chinese",
            filterEnglish: "🇬🇧 Others",
            sortNewest: "Newest",
            sortOldest: "Oldest",
            favorites: "Favorites",
            empty: "No songs found matching the criteria"
        },
        card: {
            original: "Original:",
            romajiEn: "Romaji (EN):",
            romajiTh: "Romaji (TH):",
            pinyinEn: "Pinyin (EN):",
            pinyinTh: "Pinyin (TH):",
            translation: "Thai Translation:",
            hidden: "Hidden",
            openMedia: "Open original media on web",
            profileTooltip: "View translator profile",
            btnEdit: "Edit",
            btnDelete: "Delete",
            btnHide: "Hide",
            btnShow: "Show",
            btnBan: "Ban User",
            btnExport: "Export",
            favTooltip: "Favorites",
            favAria: "Add to favorites",
            btnAnalyzeVocab: "Analyze Vocab"
        },
        disclaimer: {
            title: "Disclaimer:",
            text: "The lyrics, translations, and original musical compositions provided on lyric.hxvapp.com remain the intellectual property of their respective artists, writers, and record labels. This website is an educational tool designed strictly for language learning and pronunciation practice. We do not claim ownership of any copyrighted original materials.",
            support: "Please support the original artists by streaming their music on official platforms."
        },
        export: {
            title: "Export Lyrics",
            csv: "CSV (.csv)",
            pdf: "PDF (.pdf)",
            html: "HTML (.html)",
            json: "JSON (.json)"
        },
        settingsModal: {
            title: "Profile & Key Settings",
            yourUid: "Your UID:",
            accountStatus: "Account Status:",
            adminRole: "Administrator (Admin)",
            displayName: "Display Name",
            profilePhoto: "Profile Photo (Upload up to 1MB or URL)",
            photoPlaceholder: "https://... or upload file above",
            apiKey: "Gemini API Key (BYOK)",
            keyPlaceholder: "AI Studio Key...",
            saveKey: "Encrypt and save key in system",
            btnSave: "Save Settings"
        },
        editorModal: {
            title: "Edit Lyrics (Smart Editor)",
            line: "Line",
            lineSuffix: "",
            origLabel: "Original",
            thaiLabel: "Thai Translation",
            btnCancel: "Cancel",
            btnUpdate: "Update Data",
            corrupted: "Cannot load structure for editing (corrupted format)"
        },
        profileModal: {
            title: "Translator Profile",
            works: "Translated Works",
            noWorks: "This user has no translations yet"
        },
        changelogModal: {
            title: "Updates & Changelog (Patch Notes)"
        },
        tosModal: {
            title: "Terms of Service",
            introTitle: "1. Introduction:",
            introText: "lyric.Hxvapp.com is operated by hxvapp.com as an AI-powered personal song translation & language learning tool.",
            byokTitle: "2. Data & Encryption (BYOK):",
            byokText: "The system does not store API Keys in plain text; keys are AES-encrypted with your user account for maximum security.",
            contentTitle: "3. Content Management:",
            contentText: "Users own and are responsible for submitted lyrics. The platform reserves the right to moderate or delete content without prior notice.",
            disclaimerTitle: "4. Disclaimer:",
            disclaimerText: "The lyrics, translations, and original musical compositions provided on lyric.hxvapp.com remain the intellectual property of their respective artists, writers, and record labels. This website is an educational tool designed strictly for language learning and pronunciation practice. We do not claim ownership of any copyrighted original materials. Please support the original artists by streaming their music on official platforms.",
            contactTitle: "5. Contact:",
            contactText: "If you have questions or issues, please contact teerapat_kh@hxvapp.com or Discord: selenite_rx"
        },
        adminModal: {
            title: "Manage Data (Admin Only)",
            hideTitle: "Hide Song:",
            banTitle: "Suspend User:",
            reasonLabel: "Reason for action (will be shown to user)",
            reasonPlaceholder: "e.g., violation of terms, inappropriate content...",
            btnConfirm: "Confirm Action",
            btnProcessing: "Processing..."
        },
        inboxModal: {
            title: "Notification Inbox",
            markAllRead: "Mark all as read",
            empty: "No notifications at this time",
            justNow: "Just now"
        },
        turnstile: {
            securityCheck: "Security Check (Cloudflare Turnstile)",
            waiting: "Waiting for security verification...",
            verified: "Security verified successfully",
            expired: "Verification expired, please verify again",
            error: "Security verification failed"
        },
        toasts: {
            loginRequired: "Please sign in before using this feature.",
            loginFavRequired: "Please sign in before saving favorites.",
            loginViewFavRequired: "Please sign in to view favorites.",
            loginSettingsRequired: "Please sign in to configure settings.",
            keyIssue: "There is an issue with your API key. Please reconfigure it in settings.",
            keyMissing: "API Key not found. Please configure it in the settings menu.",
            fillRequired: "Please provide both song title and lyrics.",
            securityRequired: "Please complete the security check before proceeding.",
            aiError: "AI server error occurred.",
            keyInvalid: "API Key rejected or invalid. Please check again.",
            translateSuccess: "Song translated and saved successfully!",
            vocabAnalysisSuccess: "Vocabulary analyzed and study cards generated!",
            vocabCacheHit: "Loaded vocabulary analysis from database cache (Instant ⚡)!",
            vocabSaved: "Saved vocabulary to My Deck!",
            vocabRemoved: "Removed vocabulary from My Deck.",
            deckEmptyWarning: "Your deck has no vocabulary cards yet. Please analyze lyrics and bookmark words first.",
            favRemoved: "Removed from favorites.",
            favAdded: "Saved to favorites.",
            favError: "Error saving favorite.",
            updateSuccess: "Lyrics updated successfully!",
            deleteConfirm: "Confirm permanent deletion of this song?",
            deleteSuccess: "Song deleted successfully.",
            fileTooLarge: "Image file too large (max 1MB). Please choose another.",
            saveProfileSuccess: "Profile and key settings saved successfully.",
            noUnread: "No unread notifications.",
            markAllReadSuccess: "All notifications marked as read.",
            unauthorized: "You do not have permission for this action.",
            unhideConfirm: "Unhide this song?",
            showSuccess: "Song is now visible.",
            reasonRequired: "Please specify a reason.",
            songNotFound: "Song not found in system.",
            hideSuccess: "Song hidden and user notified.",
            banSuccess: "User suspended and saved.",
            exportSuccess: "Exported file successfully!",
            exportEmpty: "No lyric content to export."
        }
    },
    ja: {
        appName: "Song Translate App",
        appSubtitle: "Song Translator & AI Vocab Studio by hxvapp.com v5.0",
        nav: {
            themeToggle: "ダーク/ライトモード切替",
            changelog: "更新履歴 v5.0",
            login: "ログイン",
            logout: "ログアウト",
            notifications: "通知",
            settings: "プロフィール・BYOK設定",
            admin: "Admin",
            langSelect: "言語を変更 / Language",
            myDeck: "マイ単語帳",
            analysisTab: "AI単語分析",
            translateTab: "歌詞翻訳"
        },
        bannedBanner: {
            prefix: "アカウントが一時的に利用停止されています。理由: ",
            defaultReason: "利用規約違反"
        },
        translateForm: {
            heading: "AIで新しい歌詞を翻訳",
            sourceLang: "原文の言語",
            optJapanese: "JP 日本語 (Romaji EN/TH付き)",
            optChinese: "CN 中国語 (Pinyin EN/TH付き)",
            optEnglish: "EN 英語 / その他",
            songTitle: "曲名",
            songTitlePlaceholder: "Title",
            artist: "アーティスト",
            artistPlaceholder: "Artist",
            mediaLink: "メディアリンク (YouTube, Spotify)",
            mediaLinkPlaceholder: "https://...",
            lyrics: "原文の歌詞",
            lyricsPlaceholder: "ここに歌詞を貼り付け...",
            btnTranslate: "マイキーで翻訳を開始",
            btnTranslating: "処理中...",
            step1: "AIシステムに接続中...",
            step2: "トークン使用量を分析・最適化中...",
            step3: "整理してデータベースに保存中..."
        },
        vocabAnalysis: {
            heading: "AIによる歌詞の重要単語分析",
            sourceLangLabel: "原文の言語 (Source)",
            targetLangLabel: "翻訳先言語 (Target)",
            optThai: "🇹🇭 タイ語",
            optJapanese: "🇯🇵 日本語",
            optEnglish: "🇬🇧 英語",
            wordCountLabel: "抽出する単語数",
            opt5words: "5単語 (要約・厳選)",
            opt10words: "10単語 (標準)",
            opt15words: "15単語 (中級)",
            opt25words: "25単語 (詳細分析)",
            opt30words: "30単語 (楽曲全体網羅)",
            btnAnalyze: "AIで単語を分析する",
            btnAnalyzing: "AIが単語を分析中...",
            step1: "歌詞から重要単語と文法構造を抽出中...",
            step2: "自然な対話シミュレーションと文脈を作成中...",
            step3: "品詞分解(Tokenization)と語彙解説を生成中...",
            highlighterHeading: "歌詞ハイライター (Lyrics Highlighter)",
            highlighterHint: "ハイライトされた単語をクリックすると詳細へ移動します",
            vocabListHeading: "詳細語彙解説 (Vocabulary Context)",
            items: "件",
            wordsExtracted: "抽出された単語",
            practiceNow: "フラッシュカード開始",
            emptyOrInvalid: "単語データの解析に失敗しました。もう一度お試しください。"
        },
        vocabCard: {
            meaningLabel: "意味・定義",
            inSongContext: "歌詞中の文脈",
            conversationTitle: "会話例文シミュレーション",
            tokenizationTitle: "品詞分解・形態素解析 (Word-by-Word Analysis)",
            listenPronunciation: "発音を聞く",
            saved: "保存済み",
            saveToDeck: "単語帳に保存"
        },
        myDeck: {
            title: "マイ単語帳 (My Deck)",
            searchPlaceholder: "単語、読み方、意味、曲名で検索...",
            filterAll: "すべての言語",
            filterJapanese: "🇯🇵 日本語",
            filterEnglish: "🇬🇧 英語",
            filterChinese: "🇨🇳 中国語",
            emptyTitle: "単語帳はまだ空です",
            emptyDesc: "AI分析結果の⭐️ボタンを押すと、お気に入りの単語をいつでも復習できるように保存できます。",
            searchNoResult: "該当する単語が見つかりませんでした",
            deleteTooltip: "単語帳から削除",
            startFlashcards: "フラッシュカードで復習する",
            cloudSynced: "クラウド同期完了",
            guestMode: "ゲストモード (ローカル保存)"
        },
        flashcard: {
            title: "フラッシュカード学習スタジオ",
            cardProgress: "カード",
            showHint: "読み方 / 発音ヒントを表示",
            clickToFlip: "カードをクリックして正解を確認",
            solutionTitle: "正解・語彙解説",
            rateMemoryHint: "この単語の記憶定着度を選択してください:",
            forgotBtn: "忘れた (Forgot)",
            gotItBtn: "覚えている (Got it)",
            finalScore: "学習結果スコア",
            accuracy: "正解率",
            summaryGreatTitle: "素晴らしい！完璧な記憶力です 🎉",
            summaryGreatDesc: "ほとんどの単語を正確に覚えています。定期的に復習を続けましょう！",
            summaryGoodTitle: "よくできました！順調です 👍",
            summaryGoodDesc: "良い成果です。忘れた単語をもう一度復習して定着させましょう。",
            summaryKeepTryingTitle: "その調子！継続は力なり 💪",
            summaryKeepTryingDesc: "語学学習には反復が大切です。忘れた単語をもう一度確認してみましょう！",
            forgottenListTitle: "復習が必要な単語",
            reviewForgottenBtn: "忘れた単語のみ再練習",
            restartAllBtn: "最初からすべて再練習",
            backToDeckBtn: "単語帳に戻る"
        },
        library: {
            heading: "公開翻訳歌詞ライブラリ",
            searchPlaceholder: "曲名/アーティストで検索...",
            filterAll: "すべての言語",
            filterJapanese: "🇯🇵 日本語",
            filterChinese: "🇨🇳 中国語",
            filterEnglish: "🇬🇧 その他",
            sortNewest: "最新順",
            sortOldest: "古い順",
            favorites: "お気に入り",
            empty: "該当する曲が見つかりませんでした"
        },
        card: {
            original: "原文:",
            romajiEn: "Romaji (EN):",
            romajiTh: "Romaji (TH):",
            pinyinEn: "Pinyin (EN):",
            pinyinTh: "Pinyin (TH):",
            translation: "タイ語翻訳:",
            hidden: "非表示",
            openMedia: "ウェブで元メディアを開く",
            profileTooltip: "翻訳者のプロフィールを見る",
            btnEdit: "編集",
            btnDelete: "削除",
            btnHide: "非表示",
            btnShow: "表示",
            btnBan: "ユーザー停止",
            btnExport: "エクスポート",
            favTooltip: "お気に入り",
            favAria: "お気に入りに追加",
            btnAnalyzeVocab: "AI単語分析"
        },
        disclaimer: {
            title: "免責事項 (Disclaimer):",
            text: "lyric.hxvapp.com 上のすべての歌詞、翻訳、および原曲の著作権は、各アーティスト、作詞・作曲者、および所属レコード会社に帰属します。当サイトは語学学習および発音練習のみを目的とした教育用ツールであり、著作権を有するいかなる原著作物の権利も主張いたしません。",
            support: "公式ストリーミング配信等の正規プラットフォームを通じて、原作者・アーティストの楽曲をお聴きいただき応援をお願いいたします。"
        },
        export: {
            title: "歌詞をエクスポート",
            csv: "CSV (.csv)",
            pdf: "PDF (.pdf)",
            html: "HTML (.html)",
            json: "JSON (.json)"
        },
        settingsModal: {
            title: "プロフィール＆キー設定",
            yourUid: "あなたのUID:",
            accountStatus: "アカウント状態:",
            adminRole: "管理者 (Admin)",
            displayName: "ユーザー名 (表示名)",
            profilePhoto: "プロフィール画像 (1MB以内またはURL)",
            photoPlaceholder: "https://... または上記でアップロード",
            apiKey: "Gemini APIキー (BYOK)",
            keyPlaceholder: "AI Studio Key...",
            saveKey: "キーを暗号化してシステムに保存",
            btnSave: "設定を保存"
        },
        editorModal: {
            title: "歌詞編集 (Smart Editor)",
            line: "第",
            lineSuffix: "行",
            origLabel: "原文",
            thaiLabel: "タイ語翻訳",
            btnCancel: "キャンセル",
            btnUpdate: "データを更新",
            corrupted: "構造を読み込めませんでした (フォーマット不正)"
        },
        profileModal: {
            title: "翻訳者プロフィール",
            works: "翻訳作品",
            noWorks: "このユーザーの翻訳作品はまだありません"
        },
        changelogModal: {
            title: "アップデート＆更新履歴 (Patch Notes)"
        },
        tosModal: {
            title: "利用規約 (Terms of Service)",
            introTitle: "1. はじめに:",
            introText: "lyric.Hxvapp.comはhxvapp.comが運営するAI歌詞翻訳・語学学習支援ツールです。",
            byokTitle: "2. データと暗号化 (BYOK):",
            byokText: "システムはAPIキーをプレーンテキストで保存せず、暗号化してアカウントに安全に紐付けます。",
            contentTitle: "3. コンテンツ管理:",
            contentText: "利用者は投稿した歌詞の責任を負います。運営は予告なく修正または削除する権利を留保します。",
            disclaimerTitle: "4. 免責事項 (Disclaimer):",
            disclaimerText: "lyric.hxvapp.com 上のすべての歌詞、翻訳、および原曲の著作権は、各アーティスト、作詞・作曲者、および所属レコード会社に帰属します。当サイトは語学学習および発音練習のみを目的とした教育用ツールであり、著作権を有するいかなる原著作物の権利も主張いたしません。公式配信等でアーティストの応援をお願いいたします。",
            contactTitle: "5. お問い合わせ:",
            contactText: "ご不明な点やお困りの際は teerapat_kh@hxvapp.com または Discord: selenite_rx までご連絡ください。"
        },
        adminModal: {
            title: "データ管理 (Admin Only)",
            hideTitle: "曲を非表示:",
            banTitle: "アカウント停止:",
            reasonLabel: "処置の理由 (対象者に表示されます)",
            reasonPlaceholder: "例: 利用規約違反、不適切なコンテンツ...",
            btnConfirm: "実行する",
            btnProcessing: "処理中..."
        },
        inboxModal: {
            title: "通知ボックス",
            markAllRead: "すべて既読にする",
            empty: "現在通知はありません",
            justNow: "たった今"
        },
        turnstile: {
            securityCheck: "セキュリティ確認 (Security Check)",
            waiting: "セキュリティ確認中...",
            verified: "セキュリティ確認が完了しました",
            expired: "確認の有効期限が切れました。再試行してください",
            error: "セキュリティ確認に失敗しました"
        },
        toasts: {
            loginRequired: "ログインしてください。",
            loginFavRequired: "お気に入りを保存するにはログインしてください。",
            loginViewFavRequired: "お気に入りを見るにはログインしてください。",
            loginSettingsRequired: "設定を行うにはログインしてください。",
            keyIssue: "キーに問題があります。設定メニューで再設定してください。",
            keyMissing: "APIキーが見つかりません。設定メニューで設定してください。",
            fillRequired: "曲名と歌詞の両方を入力してください。",
            securityRequired: "続行する前にセキュリティ確認を完了してください。",
            aiError: "AIサーバーでエラーが発生しました。",
            keyInvalid: "APIキーが無効または拒否されました。ご確認ください。",
            translateSuccess: "翻訳と保存が完了しました！",
            vocabAnalysisSuccess: "単語の分析と学習カードの生成が完了しました！",
            vocabCacheHit: "データベースキャッシュから語彙分析を即座に読み込みました (高速 ⚡)！",
            vocabSaved: "単語帳に保存しました！",
            vocabRemoved: "単語帳から削除しました。",
            deckEmptyWarning: "単語帳にカードがありません。先に歌詞を分析して単語を保存してください。",
            favRemoved: "お気に入りから削除しました。",
            favAdded: "お気に入りに追加しました。",
            favError: "お気に入りの保存中にエラーが発生しました。",
            updateSuccess: "歌詞の更新が完了しました！",
            deleteConfirm: "この曲を完全に削除しますか？",
            deleteSuccess: "曲を削除しました。",
            fileTooLarge: "画像サイズが大きすぎます (最大1MB)。別の画像を選択してください。",
            saveProfileSuccess: "プロフィールとキー設定を保存しました。",
            noUnread: "未読の通知はありません。",
            markAllReadSuccess: "すべての通知を既読にしました。",
            unauthorized: "この操作を実行する権限がありません。",
            unhideConfirm: "この曲の非表示を解除しますか？",
            showSuccess: "曲を表示しました。",
            reasonRequired: "理由を入力してください。",
            songNotFound: "システムに曲が見つかりません。",
            hideSuccess: "曲を非表示にし、ユーザーに通知しました。",
            banSuccess: "ユーザーを停止し、データを保存しました。",
            exportSuccess: "ファイルをエクスポートしました！",
            exportEmpty: "エクスポートする歌詞データがありません。"
        }
    },
    zh: {
        appName: "Song Translate App",
        appSubtitle: "Song Translator & AI Vocab Studio by hxvapp.com v5.0",
        nav: {
            themeToggle: "切换深色/浅色模式",
            changelog: "更新日志 v5.0",
            login: "登录",
            logout: "退出登录",
            notifications: "通知",
            settings: "个人资料与BYOK设置",
            admin: "Admin",
            langSelect: "切换语言 / Language",
            myDeck: "我的词库",
            analysisTab: "AI歌词分析",
            translateTab: "歌词翻译"
        },
        bannedBanner: {
            prefix: "您的账户已被暂时封禁，原因：",
            defaultReason: "违反使用条款"
        },
        translateForm: {
            heading: "使用AI翻译新歌词",
            sourceLang: "源语言",
            optJapanese: "JP 日语 (含罗马音 EN/TH)",
            optChinese: "CN 中文 (含拼音 EN/TH)",
            optEnglish: "EN 英语 / 其他",
            songTitle: "歌曲名称",
            songTitlePlaceholder: "Title",
            artist: "歌手",
            artistPlaceholder: "Artist",
            mediaLink: "媒体链接 (YouTube, Spotify)",
            mediaLinkPlaceholder: "https://...",
            lyrics: "原始歌词",
            lyricsPlaceholder: "在此粘贴歌词...",
            btnTranslate: "使用我的Key开始翻译",
            btnTranslating: "正在处理...",
            step1: "正在连接AI系统...",
            step2: "正在分析并优化Token消耗...",
            step3: "正在整理并保存至数据库..."
        },
        vocabAnalysis: {
            heading: "AI歌词词汇与语法深度分析",
            sourceLangLabel: "源语言 (Source)",
            targetLangLabel: "翻译目标语言 (Target)",
            optThai: "🇹🇭 泰语",
            optJapanese: "🇯🇵 日语",
            optEnglish: "🇬🇧 英语",
            wordCountLabel: "要提取的词汇数量",
            opt5words: "5个词 (精选)",
            opt10words: "10个词 (标准)",
            opt15words: "15个词 (中级)",
            opt25words: "25个词 (深入分析)",
            opt30words: "30个词 (全曲覆盖)",
            btnAnalyze: "使用AI开始分析词汇",
            btnAnalyzing: "AI正在深度分析词汇...",
            step1: "正在提取歌词核心词汇与读音...",
            step2: "正在生成生动对话情境与句型...",
            step3: "正在进行词对词分词(Tokenization)与语法解析...",
            highlighterHeading: "歌词高亮器 (Lyrics Highlighter)",
            highlighterHint: "点击高亮词汇可直接跳转至详细解析",
            vocabListHeading: "深度词汇解析 (Vocabulary Context)",
            items: "项",
            wordsExtracted: "提取的词汇",
            practiceNow: "开始抽认卡练习",
            emptyOrInvalid: "无法解析词汇数据，请重试。"
        },
        vocabCard: {
            meaningLabel: "释义",
            inSongContext: "歌词语境",
            conversationTitle: "情境对话示例",
            tokenizationTitle: "逐词分词与语法分析 (Tokenization)",
            listenPronunciation: "播放发音",
            saved: "已保存",
            saveToDeck: "保存至词库"
        },
        myDeck: {
            title: "我的专属生词库 (My Deck)",
            searchPlaceholder: "搜索词汇、读音、释义或歌名...",
            filterAll: "所有语言",
            filterJapanese: "🇯🇵 日语",
            filterEnglish: "🇬🇧 英语",
            filterChinese: "🇨🇳 中文",
            emptyTitle: "生词库空空如也",
            emptyDesc: "在AI词汇分析卡片上点击⭐️按钮，即可将感兴趣的单词保存至个人词库中，随时复习。",
            searchNoResult: "未找到符合条件的词汇",
            deleteTooltip: "从词库中删除",
            startFlashcards: "开始抽认卡复习 (Flashcards)",
            cloudSynced: "云端已同步",
            guestMode: "访客模式 (本地保存)"
        },
        flashcard: {
            title: "3D抽认卡复习工坊 (Flashcard Studio)",
            cardProgress: "卡片",
            showHint: "查看读音/拼音提示",
            clickToFlip: "点击卡片翻转查看释义",
            solutionTitle: "答案与语法解析",
            rateMemoryHint: "请评估您对此词汇的记忆程度：",
            forgotBtn: "忘记 (Forgot)",
            gotItBtn: "记住了 (Got it)",
            finalScore: "复习成绩总结",
            accuracy: "准确率",
            summaryGreatTitle: "太棒了！记忆力超群 🎉",
            summaryGreatDesc: "您准确记住了绝大部分单词，请保持定期复习以巩固长期记忆！",
            summaryGoodTitle: "做得好！继续加油 👍",
            summaryGoodDesc: "表现非常出色，建议再复习一遍遗忘的单词以加深印象。",
            summaryKeepTryingTitle: "加油！熟能生巧 💪",
            summaryKeepTryingDesc: "语言学习需要反复练习，再复习一遍记不清的生词吧！",
            forgottenListTitle: "需要重点复习的单词",
            reviewForgottenBtn: "仅复习遗忘的单词",
            restartAllBtn: "重新练习全部",
            backToDeckBtn: "返回生词库"
        },
        library: {
            heading: "公开翻译歌词库",
            searchPlaceholder: "搜索歌曲/歌手...",
            filterAll: "全部语言",
            filterJapanese: "🇯🇵 日语",
            filterChinese: "🇨🇳 中文",
            filterEnglish: "🇬🇧 其他",
            sortNewest: "最新",
            sortOldest: "最早",
            favorites: "收藏夹",
            empty: "未找到符合条件的歌曲"
        },
        card: {
            original: "原文:",
            romajiEn: "Romaji (EN):",
            romajiTh: "Romaji (TH):",
            pinyinEn: "Pinyin (EN):",
            pinyinTh: "Pinyin (TH):",
            translation: "泰语翻译:",
            hidden: "已隐藏",
            openMedia: "在网页中打开原媒体",
            profileTooltip: "查看翻译者个人资料",
            btnEdit: "编辑",
            btnDelete: "删除",
            btnHide: "隐藏",
            btnShow: "显示",
            btnBan: "封禁用户",
            btnExport: "导出",
            favTooltip: "收藏",
            favAria: "添加至收藏",
            btnAnalyzeVocab: "AI词汇分析"
        },
        disclaimer: {
            title: "免责声明 (Disclaimer):",
            text: "lyric.hxvapp.com 上的所有歌词、翻译及原版音乐作品的知识产权均归属于相应艺术家、词曲创作者及唱片公司。本网站仅为用于语言学习与发音练习的教育工具，我们不对任何受版权保护的原始内容主张所有权。",
            support: "请通过官方流媒体平台收听音乐，支持原版艺术家。"
        },
        export: {
            title: "导出歌词",
            csv: "CSV (.csv)",
            pdf: "PDF (.pdf)",
            html: "HTML (.html)",
            json: "JSON (.json)"
        },
        settingsModal: {
            title: "个人资料与Key设置",
            yourUid: "您的UID:",
            accountStatus: "账户状态:",
            adminRole: "管理员 (Admin)",
            displayName: "用户名 (显示名称)",
            profilePhoto: "头像 (上传不超过1MB或输入URL)",
            photoPlaceholder: "https://... 或在上方上传文件",
            apiKey: "Gemini API Key (BYOK)",
            keyPlaceholder: "AI Studio Key...",
            saveKey: "加密并保存Key以供使用",
            btnSave: "保存设置"
        },
        editorModal: {
            title: "编辑歌词 (智能编辑器)",
            line: "第",
            lineSuffix: "行",
            origLabel: "原文",
            thaiLabel: "泰语翻译",
            btnCancel: "取消",
            btnUpdate: "更新数据",
            corrupted: "无法解析歌词结构 (格式异常)"
        },
        profileModal: {
            title: "翻译者资料",
            works: "翻译作品",
            noWorks: "该用户暂无翻译作品"
        },
        changelogModal: {
            title: "更新日志 (Patch Notes)"
        },
        tosModal: {
            title: "服务条款 (Terms of Service)",
            introTitle: "1. 简介:",
            introText: "lyric.Hxvapp.com 由 hxvapp.com 运营，旨在作为基于AI的个人歌词翻译与语言学习工具。",
            byokTitle: "2. 数据与加密 (BYOK):",
            byokText: "系统不会以明文存储您的API Key，所有Key均进行加密并与账户绑定，确保最高安全性。",
            contentTitle: "3. 内容管理:",
            contentText: "用户对其导入的歌词拥有所有权并承担责任。平台保留随时修改或删除违规内容的权利。",
            disclaimerTitle: "4. 免责声明 (Disclaimer):",
            disclaimerText: "lyric.hxvapp.com 上的所有歌词、翻译及原版音乐作品的知识产权均归属于相应艺术家、词曲创作者及唱片公司。本网站仅为用于语言学习与发音练习的教育工具，我们不对任何受版权保护的原始内容主张所有权。请通过官方渠道支持原版艺术家。",
            contactTitle: "5. 联系我们:",
            contactText: "如有任何疑问或问题，请联系 teerapat_kh@hxvapp.com 或 Discord: selenite_rx。"
        },
        adminModal: {
            title: "数据管理 (仅管理员)",
            hideTitle: "隐藏歌曲:",
            banTitle: "封禁用户:",
            reasonLabel: "执行理由 (将向用户展示)",
            reasonPlaceholder: "例如：违反使用规定、不适当内容...",
            btnConfirm: "确认执行",
            btnProcessing: "正在执行..."
        },
        inboxModal: {
            title: "通知收件箱",
            markAllRead: "全部标记为已读",
            empty: "暂无通知",
            justNow: "刚刚"
        },
        turnstile: {
            securityCheck: "安全验证 (Security Check)",
            waiting: "正在等待安全验证...",
            verified: "安全验证已通过",
            expired: "验证已过期，请重新验证",
            error: "安全验证失败"
        },
        toasts: {
            loginRequired: "请先登录后再使用此功能。",
            loginFavRequired: "请先登录后再添加收藏。",
            loginViewFavRequired: "请先登录以查看收藏夹。",
            loginSettingsRequired: "请先登录后再进行设置。",
            keyIssue: "您的API Key存在问题，请在设置中重新配置。",
            keyMissing: "未找到API Key，请在设置菜单中进行配置。",
            fillRequired: "请完整填写歌曲名称和歌词。",
            securityRequired: "请在继续之前完成安全验证。",
            aiError: "AI服务器发生错误。",
            keyInvalid: "API Key被拒绝或无效，请重新检查。",
            translateSuccess: "歌词翻译并保存成功！",
            vocabAnalysisSuccess: "词汇分析与学习卡片生成成功！",
            vocabCacheHit: "已从数据库秒级载入分析缓存 (极速 ⚡)！",
            vocabSaved: "已成功保存词汇至生词库！",
            vocabRemoved: "已从生词库中移除词汇。",
            deckEmptyWarning: "生词库暂无卡片，请先分析歌词并收藏单词。",
            favRemoved: "已从收藏夹中移除。",
            favAdded: "已保存至收藏夹。",
            favError: "保存收藏夹时出错。",
            updateSuccess: "歌词更新完成！",
            deleteConfirm: "确认永久删除这首歌曲？",
            deleteSuccess: "歌曲已成功删除。",
            fileTooLarge: "图片文件过大 (限制1MB)，请选择其他图片。",
            saveProfileSuccess: "个人资料与Key设置已成功保存。",
            noUnread: "没有未读通知。",
            markAllReadSuccess: "所有通知已标记为已读。",
            unauthorized: "您没有权限执行此操作。",
            unhideConfirm: "确认取消隐藏这首歌曲？",
            showSuccess: "已成功显示歌曲。",
            reasonRequired: "请填写操作原因。",
            songNotFound: "系统中未找到该歌曲。",
            hideSuccess: "已隐藏歌曲并通知用户。",
            banSuccess: "已封禁用户并保存记录。",
            exportSuccess: "文件导出成功！",
            exportEmpty: "没有可导出的歌词数据。"
        }
    }
};

let currentLanguage = localStorage.getItem('app_language') || 'th';
if (!translations[currentLanguage]) {
    currentLanguage = 'th';
}

/**
 * Gets the current active language code.
 * @returns {string} 'th' | 'en' | 'ja' | 'zh'
 */
export function getLanguage() {
    return currentLanguage;
}

/**
 * Retrieves translation value by nested key string, e.g. "translateForm.songTitle".
 * @param {string} keyPath 
 * @param {string} [lang] 
 * @returns {any}
 */
export function t(keyPath, lang = currentLanguage) {
    const dict = translations[lang] || translations.th;
    const parts = keyPath.split('.');
    let cur = dict;
    for (const part of parts) {
        if (cur && cur[part] !== undefined) {
            cur = cur[part];
        } else {
            // fallback to th
            let fallbackCur = translations.th;
            for (const fPart of parts) {
                if (fallbackCur && fallbackCur[fPart] !== undefined) {
                    fallbackCur = fallbackCur[fPart];
                } else {
                    return keyPath;
                }
            }
            return fallbackCur;
        }
    }
    return cur;
}

/**
 * Sets the application language, updates DOM, and triggers re-render callback.
 * @param {string} langCode 
 * @param {Function} [onLanguageChanged] 
 */
export function setLanguage(langCode, onLanguageChanged) {
    if (!translations[langCode]) return;
    currentLanguage = langCode;
    localStorage.setItem('app_language', langCode);

    const htmlLangMap = { th: 'th', en: 'en', ja: 'ja', zh: 'zh-CN' };
    document.documentElement.lang = htmlLangMap[langCode] || 'th';

    applyTranslations();

    if (typeof onLanguageChanged === 'function') {
        onLanguageChanged(langCode);
    }
}

/**
 * Traverses DOM and updates elements with data-i18n attributes.
 */
export function applyTranslations() {
    // 1. Text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) {
            const val = t(key);
            if (typeof val === 'string') {
                el.textContent = val;
            }
        }
    });

    // 2. HTML content
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (key) {
            const val = t(key);
            if (typeof val === 'string') {
                el.innerHTML = val;
            }
        }
    });

    // 3. Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (key) {
            const val = t(key);
            if (typeof val === 'string') {
                el.placeholder = val;
            }
        }
    });

    // 4. Titles & Tooltips
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (key) {
            const val = t(key);
            if (typeof val === 'string') {
                el.title = val;
            }
        }
    });

    // 5. Aria Labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const key = el.getAttribute('data-i18n-aria');
        if (key) {
            const val = t(key);
            if (typeof val === 'string') {
                el.setAttribute('aria-label', val);
            }
        }
    });

    // Update active flag / language indicator in selector
    const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];
    const currentLangLabel = document.getElementById('currentLangLabel');
    const currentLangFlag = document.getElementById('currentLangFlag');
    if (currentLangLabel) currentLangLabel.textContent = currentLangObj.label;
    if (currentLangFlag) currentLangFlag.textContent = currentLangObj.flag;

    // Update active class in dropdown items
    document.querySelectorAll('.lang-option-btn').forEach(btn => {
        const lang = btn.getAttribute('data-lang');
        if (lang === currentLanguage) {
            btn.classList.add('bg-indigo-50', 'dark:bg-indigo-950/60', 'text-indigo-600', 'dark:text-indigo-400', 'font-bold');
            btn.classList.remove('text-slate-700', 'dark:text-slate-200');
        } else {
            btn.classList.remove('bg-indigo-50', 'dark:bg-indigo-950/60', 'text-indigo-600', 'dark:text-indigo-400', 'font-bold');
            btn.classList.add('text-slate-700', 'dark:text-slate-200');
        }
    });
}
