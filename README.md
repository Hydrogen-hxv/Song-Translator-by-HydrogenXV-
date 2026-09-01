# 🎵 Song Translator & AI Vocab Studio (v5.0)

<p align="center">
  <img src="public/favicon.svg" alt="Song Translator Logo" width="80" height="80" />
</p>

<p align="center">
  <strong>เว็บแอปพลิเคชันแปลเนื้อเพลงและสตูดิโอวิเคราะห์คำศัพท์อัจฉริยะด้วย Google Gemini AI</strong><br>
  แปลเนื้อเพลงญี่ปุ่น, จีน, สากล เป็นภาษาไทยอย่างสละสลวย พร้อมคำอ่าน Romaji/Pinyin, คลังศัพท์ส่วนตัว (My Deck), ระบบวิเคราะห์ไวยากรณ์คำต่อคำ (Tokenization) และเกมทบทวน 3D Flashcards
</p>

<p align="center">
  <a href="https://lyric.hxvapp.com/"><img src="https://img.shields.io/badge/Live_Demo-lyric.hxvapp.com-6366f1?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Demo"></a>
  <img src="https://img.shields.io/badge/Version-5.0.0-emerald?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/Firebase-Hosting%20%7C%20Firestore-orange?style=for-the-badge&logo=firebase" alt="Firebase">
  <img src="https://img.shields.io/badge/Gemini_AI-2.5_Flash-4285F4?style=for-the-badge&logo=google" alt="Gemini AI">
  <img src="https://img.shields.io/badge/Cloudflare-Turnstile_Protected-F38020?style=for-the-badge&logo=cloudflare" alt="Cloudflare Turnstile">
</p>

---

## 🌟 ฟีเจอร์หลัก (Key Features)

### 1. 🤖 ระบบวิเคราะห์คำศัพท์จากเนื้อเพลงด้วย AI (AI Lyrics Analysis & Vocab Studio)
- **Multi-Language Matrix**: รองรับภาษาต้นทาง (**ญี่ปุ่น 🇯🇵, จีน 🇨🇳, อังกฤษ 🇬🇧**) และเลือกภาษาผลลัพธ์การแปล (**ไทย 🇹🇭, ญี่ปุ่น 🇯🇵, อังกฤษ 🇬🇧**)
- **Vocabulary Extraction**: ระบุจำนวนคำศัพท์ที่ต้องการสกัดได้อย่างยืดหยุ่น (**5, 10, 15, 25 หรือ 30 คำ**)
- **Lyrics Highlighter**: แสดงเนื้อเพลงต้นฉบับพร้อมไฮไลท์สีเน้นคำศัพท์สำคัญ คลิกคำที่ไฮไลท์เพื่อกระโดดไปยังการ์ดอธิบายคำศัพท์ทันที
- **Simulated Dialogues**: สร้างบทสนทนาจำลองในชีวิตประจำวัน (Speaker A & Speaker B) แสดงวิธีใช้งานคำศัพท์ในสถานการณ์จริง
- **Tokenization & Morpheme Breakdown**: วิเคราะห์โครงสร้างประโยคแยกคำต่อคำ ระบุชนิดคำ (Noun, Verb, Particle, Adjective, Grammar Pattern)
- **Native TTS Speech**: ฟังเสียงอ่านออกเสียงคำศัพท์และประโยคบทสนทนาด้วย Web Speech API สำเนียงเจ้าของภาษา

### 2. ⚡ ระบบเร่งความเร็ว Database Caching 2 ชั้น (Instant 0ms / ~100ms)
- **Layer 1 (Local Storage)**: จดจำผลวิเคราะห์ลงในเครื่อง โหลดขึ้นมาแสดงผลทันทีใน 0 วินาที
- **Layer 2 (Firebase Firestore)**: บันทึกผลวิเคราะห์เพลงลงในคอลเลกชัน `songAnalyses` และแยกคำศัพท์ลง `vocabCache` เมื่อมีผู้ใช้วิเคราะห์เพลงเดิมซ้ำ ระบบจะดึงผลลัพธ์จากคลังข้อมูลทันทีโดยไม่เสียโควต้า AI Token

### 3. 🌐 รองรับเพลงที่มี 2 ภาษาในเพลงเดียว (Bilingual Song Support)
- รองรับเพลงลูกผสม (เช่น J-Pop ผสมท่อนร้องภาษาอังกฤษ หรือ C-Pop ผสมท่อนแร็ปภาษาอังกฤษ) แปลครบถ้วนสมบูรณ์ทุกบรรทัด ไม่ตกหล่นหรือข้ามท่อนภาษาอังกฤษ

### 4. 🗂️ คลังศัพท์ส่วนตัว & เกมทบทวน 3D (My Deck & 3D Flashcards)
- **My Deck**: จัดเก็บคำศัพท์ที่ชื่นชอบลงในคลังส่วนตัว ซิงค์ข้อมูลกับ Firebase Firestore แบบเรียลไทม์
- **3D Flashcards Studio**: เกมทบทวนคำศัพท์แบบพลิกการ์ด 3 มิติ พร้อมปุ่มลัดคีย์บอร์ด (`Space` พลิกการ์ด, `←` หรือ `1` ลืม, `→` หรือ `2` จำได้) และระบบสรุปผลคะแนน

### 5. 🛡️ ความปลอดภัยและการปฏิบัติตามกฎหมาย (Security & Compliance)
- **Cloudflare Turnstile**: ป้องกันสแปมและบอทด้วยระบบตรวจสอบความปลอดภัย Cloudflare Turnstile
- **BYOK (Bring Your Own Key)**: เข้ารหัส API Key ของผู้ใช้ด้วย CryptoJS AES ปลอดภัยสูงสุด
- **Copyright Disclaimer & DMCA Policy**: มีกล่องข้อจำกัดความรับผิดชอบทางกฎหมายบนทุกการ์ดและไฟล์ส่งออก พร้อมหน้าเพจ [DMCA Policy](https://lyric.hxvapp.com/dmca)

### 6. 📤 ส่งออกข้อมูลได้หลากหลายรูปแบบ (Export System)
- ส่งออกเนื้อเพลงและคำแปลเป็น **CSV**, **PDF**, **HTML (Standalone App)** และ **JSON**

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend Core**: HTML5, Vanilla JavaScript (ES Modules), Tailwind CSS
- **Bundler & Build Tool**: Vite 5.x
- **AI Engine**: Google Gemini 2.5 Flash API
- **Backend & Database**: Firebase Authentication, Cloud Firestore, Firebase Hosting
- **Security & Bot Protection**: Cloudflare Turnstile API, CryptoJS (AES Encryption)
- **Internationalization (i18n)**: รองรับ 4 ภาษา (🇹🇭 ไทย, 🇬🇧 English, 🇯🇵 日本語, 🇨🇳 简体中文)

---

## 📦 การติดตั้งและรันโปรเจกต์ (Installation & Development)

```bash
# 1. Clone repository
git clone https://github.com/Hydrogen-hxv/Song-Translator-by-HydrogenXV-.git
cd Song-Translator-by-HydrogenXV-

# 2. ติดตั้ง Dependencies
npm install

# 3. รันเซิร์ฟเวอร์สำหรับพัฒนา (Development Server)
npm run dev

# 4. สร้าง Bundle สำหรับ Production
npm run build

# 5. Deploy ขึ้น Firebase Hosting
firebase deploy
```

---

## 📝 บันทึกการอัปเดต (Changelog & Patch Notes)

### 🚀 Version 5.0.0 (Big Update: AI Lyrics Analysis & Database Cache)
- ✨ **AI Lyrics Analysis Engine**: สกัดคำศัพท์สำคัญจากเนื้อเพลง พร้อมเลือกภาษาต้นทาง (JP/EN/CN) และภาษาผลลัพธ์ (TH/JP/EN)
- ⚡ **Two-Layer Database Caching**: ระบบแคช 2 ชั้น (Local Memory + Cloud Firestore `songAnalyses` & `vocabCache`) ประหยัด Token AI และโหลดผลลัพธ์ซ้ำใน 0ms
- 🌐 **Bilingual Song Engine**: ปรับปรุงระบบแปลให้อ่านและแปลเพลงที่มี 2 ภาษา (เช่น ญี่ปุ่น+อังกฤษ) ได้ครบถ้วนทุกบรรทัด ไม่สูญหาย
- 🛡️ **Cloudflare Turnstile Security Check**: ติดตั้งระบบยืนยันความปลอดภัยบนฟอร์มแปลเพลงและฟอร์มวิเคราะห์คำศัพท์
- 🎨 **UI/UX High-Contrast Refactor**: ปรับระดับสีข้อความต้นฉบับ Romaji/Pinyin และคำแปลให้อ่านง่าย คมชัด ไม่กลืนกับธีม Light/Dark
- 🗂️ **My Deck**: คลังคำศัพท์ส่วนตัว ซิงค์กับ Firestore พร้อมตัวกรองภาษาและแถบค้นหา
- 🃏 **3D Flashcards Studio**: เกมทบทวนคำศัพท์ 3 มิติพร้อมปุ่มลัดคีย์บอร์ดและสรุปคะแนน
- 🗣️ **Native Web Speech TTS**: ระบบอ่านออกเสียงคำศัพท์และบทสนทนา A/B ด้วยสำเนียงเจ้าของภาษา

### 📜 Version 4.4.0 (Copyright Compliance & DMCA)
- ⚖️ เพิ่มกล่องข้อจำกัดความรับผิดชอบ (Copyright Disclaimer) บนการ์ดเนื้อเพลงและไฟล์ส่งออกทั้งหมด
- 📄 เปิดตัวหน้าเพจ [DMCA Policy](https://lyric.hxvapp.com/dmca)

---

## ⚖️ ข้อจำกัดความรับผิดชอบทางกฎหมาย (Legal Disclaimer)

ลิขสิทธิ์เนื้อเพลง คำแปล และผลงานต้นฉบับทั้งหมดบนเว็บไซต์ `lyric.hxvapp.com` เป็นทรัพย์สินทางปัญญาของศิลปิน ผู้แต่ง และค่ายเพลงต้นสังกัด ทางเว็บไซต์เป็นเพียงเครื่องมือที่จัดทำขึ้นเพื่อวัตถุประสงค์ในการศึกษา การฝึกภาษา และการออกเสียงเท่านั้น ทางเราไม่ได้อ้างสิทธิ์ความเป็นเจ้าของในเนื้อหาต้นฉบับใดๆ ทั้งสิ้น โปรดสนับสนุนศิลปินต้นฉบับโดยการรับฟังผลงานผ่านช่องทางสตรีมมิ่งอย่างเป็นทางการ

---

## 👨‍💻 ผู้พัฒนา (Author & Credits)

- **Developer**: [HydrogenXV](https://github.com/Hydrogen-hxv) (hxvapp.com)
- **Email**: `teerapat_kh@hxvapp.com`
- **Discord**: `selenite_rx`
- **Website**: [lyric.hxvapp.com](https://lyric.hxvapp.com)
