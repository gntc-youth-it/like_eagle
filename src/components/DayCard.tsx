interface DayCardProps {
  day: number;
  isUnlocked: boolean;
  isToday: boolean;
  isOpened: boolean;
  isAnimating: boolean;
  onClick: () => void;
}

const pillColors = [
  { top: '#FCD34D', bottom: '#F59E0B' }, // amber
  { top: '#FCA5A5', bottom: '#EF4444' }, // red
  { top: '#93C5FD', bottom: '#3B82F6' }, // blue
  { top: '#86EFAC', bottom: '#22C55E' }, // green
  { top: '#C4B5FD', bottom: '#8B5CF6' }, // purple
  { top: '#FDBA74', bottom: '#F97316' }, // orange
  { top: '#F9A8D4', bottom: '#EC4899' }, // pink
];

export function DayCard({ day, isUnlocked, isToday, isOpened, isAnimating, onClick }: DayCardProps) {
  const colorIndex = (day - 1) % pillColors.length;
  const colors = pillColors[colorIndex];

  // 잠긴 알약
  if (!isUnlocked) {
    return (
      <div className="flex flex-col items-center">
        <div
          className="relative cursor-not-allowed opacity-50"
          style={{ width: '36px', height: '52px' }}
        >
          <div
            style={{
              width: '36px',
              height: '26px',
              backgroundColor: '#D1D5DB',
              borderRadius: '18px 18px 4px 4px',
            }}
          />
          <div
            style={{
              width: '36px',
              height: '26px',
              backgroundColor: '#9CA3AF',
              borderRadius: '4px 4px 18px 18px',
              marginTop: '2px',
            }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ fontSize: '12px' }}
          >
            🔒
          </div>
        </div>
        <span className="text-gray-400 text-xs mt-1 font-bold">{day}</span>
      </div>
    );
  }

  // 열린 알약 (이미 본 말씀)
  if (isOpened && !isAnimating) {
    return (
      <button onClick={onClick} className="flex flex-col items-center">
        <div
          className="relative"
          style={{ width: '44px', height: '52px' }}
        >
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: '32px',
              height: '24px',
              backgroundColor: colors.top,
              borderRadius: '16px 16px 4px 4px',
              transform: 'rotate(-20deg)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: '0px',
              bottom: '0px',
              width: '32px',
              height: '24px',
              backgroundColor: colors.bottom,
              borderRadius: '4px 4px 16px 16px',
              transform: 'rotate(10deg)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          />
        </div>
        <span
          className="text-xs mt-1 font-bold"
          style={{ color: colors.bottom }}
        >
          {day}
        </span>
      </button>
    );
  }

  // 애니메이션 중인 알약
  if (isAnimating) {
    return (
      <div className="flex flex-col items-center">
        <div
          className="relative"
          style={{ width: '44px', height: '52px' }}
        >
          {/* 위쪽 알약 - 열리는 애니메이션 */}
          <div
            style={{
              position: 'absolute',
              left: '2px',
              top: '0px',
              width: '32px',
              height: '24px',
              backgroundColor: colors.top,
              borderRadius: '16px 16px 4px 4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transformOrigin: 'bottom center',
              animation: 'pillOpenTop 0.6s ease-out forwards',
            }}
          />
          {/* 아래쪽 알약 - 열리는 애니메이션 */}
          <div
            style={{
              position: 'absolute',
              right: '2px',
              bottom: '0px',
              width: '32px',
              height: '24px',
              backgroundColor: colors.bottom,
              borderRadius: '4px 4px 16px 16px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transformOrigin: 'top center',
              animation: 'pillOpenBottom 0.6s ease-out forwards',
            }}
          />
        </div>
        <span
          className="text-xs mt-1 font-bold"
          style={{ color: colors.bottom }}
        >
          {day}
        </span>
        <style>{`
          @keyframes pillOpenTop {
            0% {
              transform: rotate(0deg) translateY(0);
            }
            50% {
              transform: rotate(-15deg) translateY(-8px);
            }
            100% {
              transform: rotate(-20deg) translateY(-4px) translateX(-4px);
            }
          }
          @keyframes pillOpenBottom {
            0% {
              transform: rotate(0deg) translateY(0);
            }
            50% {
              transform: rotate(8deg) translateY(8px);
            }
            100% {
              transform: rotate(10deg) translateY(4px) translateX(4px);
            }
          }
        `}</style>
      </div>
    );
  }

  // 닫힌 알약 (아직 안 본 말씀)
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center transition-transform hover:scale-110"
    >
      <div
        className={`relative ${isToday ? 'animate-bounce' : ''}`}
        style={{ width: '36px', height: '52px' }}
      >
        <div
          style={{
            width: '36px',
            height: '26px',
            backgroundColor: colors.top,
            borderRadius: '18px 18px 4px 4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        />
        <div
          style={{
            width: '36px',
            height: '26px',
            backgroundColor: colors.bottom,
            borderRadius: '4px 4px 18px 18px',
            marginTop: '2px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        />
        {isToday && (
          <div
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full"
            style={{ width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ✨
          </div>
        )}
      </div>
      <span
        className="text-xs mt-1 font-bold"
        style={{ color: colors.bottom }}
      >
        {day}
      </span>
    </button>
  );
}
