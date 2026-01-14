import type { Verse } from '../data/verses';

interface VerseModalProps {
  verse: Verse | null;
  onClose: () => void;
}

export function VerseModal({ verse, onClose }: VerseModalProps) {
  if (!verse) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-8 z-50"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-b from-white to-amber-50 rounded-3xl w-4/5 shadow-2xl border-4 border-amber-200"
        style={{ padding: '24px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with day badge */}
        <div className="flex justify-center" style={{ marginBottom: '24px' }}>
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-5 py-2 rounded-full text-sm font-bold shadow-md">
            🦅 {verse.day}일 🦅
          </div>
        </div>

        {/* Verse content */}
        <div className="text-center" style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '24px', marginBottom: '16px' }}>📖</div>
          <p className="text-amber-900 font-medium" style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '20px' }}>
            "{verse.text}"
          </p>
          <p className="text-amber-600 font-bold" style={{ fontSize: '12px' }}>
            ✨ {verse.reference} ✨
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-amber-300 to-orange-300 text-amber-800 font-bold py-3 rounded-2xl hover:from-amber-400 hover:to-orange-400 transition-all"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
