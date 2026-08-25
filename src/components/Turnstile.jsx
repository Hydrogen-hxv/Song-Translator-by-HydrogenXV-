import React, { useState, useRef } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

export default function ContactForm({ onSubmitSuccess }) {
    const [formData, setFormData] = useState({ title: '', artist: '', lyrics: '' });
    const [turnstileToken, setTurnstileToken] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const turnstileRef = useRef(null);

    const SITE_KEY = '0x4AAAAAAEbrpELLbmkx87aw'; // Site Key ของคุณ

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. ตรวจสอบว่าผู้ใช้ผ่าน Turnstile หรือยัง
        if (!turnstileToken) {
            alert('กรุณารอให้ระบบยืนยันความปลอดภัยก่อนส่งฟอร์ม');
            return;
        }

        setIsSubmitting(true);

        try {
            // จำลองการทำงานฝั่ง React (หรือนำไปเซฟลง Firebase Client-side ได้เลย)
            console.log('ข้อมูลที่ส่ง:', formData);
            console.log('Turnstile Token ที่ได้:', turnstileToken);

            // รอจำลอง 0.5 วินาที
            await new Promise((resolve) => setTimeout(resolve, 500));

            alert('ส่งข้อมูลสำเร็จเรียบร้อย!');

            // ล้างฟอร์ม
            setFormData({ title: '', artist: '', lyrics: '' });

            // รีเซ็ต Turnstile ให้พร้อมใช้งานในครั้งถัดไป
            turnstileRef.current?.reset();
            setTurnstileToken(null);

            if (onSubmitSuccess) {
                onSubmitSuccess(formData);
            }
        } catch (err) {
            console.error(err);
            alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white dark:bg-slate-800 rounded-2xl shadow border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                ส่งข้อมูลเพลง
            </h2>

            <div className="mb-4">
                <label className="block text-sm font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    ชื่อเพลง
                </label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="เช่น Sparkle"
                    className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    เนื้อเพลง
                </label>
                <textarea
                    value={formData.lyrics}
                    onChange={(e) => setFormData({ ...formData, lyrics: e.target.value })}
                    required
                    placeholder="วางเนื้อเพลงที่นี่..."
                    className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 h-28 outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Cloudflare Turnstile Widget */}
            <div className="mb-4 flex flex-col items-center justify-center">
                <Turnstile
                    ref={turnstileRef}
                    siteKey={SITE_KEY}
                    onSuccess={(token) => {
                        setTurnstileToken(token);
                    }}
                    onExpire={() => {
                        setTurnstileToken(null);
                    }}
                    onError={() => {
                        setTurnstileToken(null);
                    }}
                    options={{
                        theme: 'auto',
                        size: 'normal',
                    }}
                />
                {!turnstileToken && (
                    <span className="text-xs text-amber-500 mt-1">
                        กำลังรอการยืนยันความปลอดภัย...
                    </span>
                )}
            </div>

            <button
                type="submit"
                disabled={!turnstileToken || isSubmitting}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition shadow-md"
            >
                {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
            </button>
        </form>
    );
}
