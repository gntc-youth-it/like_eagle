import { useState, useEffect } from 'react';
import { DayCard } from './DayCard';
import { VerseModal } from './VerseModal';
import { UserInfoModal } from './UserInfoModal';
import { verses } from '../data/verses';

const STORAGE_KEY = 'eagle-clinic-opened-days';
const USER_INFO_KEY = 'eagle-clinic-user-info';

interface UserInfo {
  temple: string;
  generation: string;
  name: string;
}

export function Calendar() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [openedDays, setOpenedDays] = useState<number[]>([]);
  const [animatingDay, setAnimatingDay] = useState<number | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // localStorage에서 데이터 불러오기
  useEffect(() => {
    const savedUserInfo = localStorage.getItem(USER_INFO_KEY);
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    }

    const savedOpenedDays = localStorage.getItem(STORAGE_KEY);
    if (savedOpenedDays) {
      setOpenedDays(JSON.parse(savedOpenedDays));
    }

    setIsLoading(false);
  }, []);

  // 테스트용: 14일까지 열림
  const unlockedUntil = 14;

  const getDayStatus = (day: number) => {
    return {
      isUnlocked: day <= unlockedUntil,
      isToday: day === unlockedUntil
    };
  };

  const handleDayClick = (day: number) => {
    const { isUnlocked } = getDayStatus(day);
    if (!isUnlocked) return;

    // 이미 본 말씀이면 바로 팝업
    if (openedDays.includes(day)) {
      setSelectedDay(day);
      return;
    }

    // 처음 보는 말씀이면 애니메이션 시작
    setAnimatingDay(day);

    // 열린 날짜 저장
    const newOpenedDays = [...openedDays, day];
    setOpenedDays(newOpenedDays);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newOpenedDays));

    // 애니메이션 끝나면 팝업 표시
    setTimeout(() => {
      setAnimatingDay(null);
      setSelectedDay(day);
    }, 700);
  };

  const handleUserInfoSubmit = (info: UserInfo) => {
    setUserInfo(info);
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(info));
  };

  const selectedVerse = selectedDay ? verses.find(v => v.day === selectedDay) : null;

  // 로딩 중
  if (isLoading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-amber-500">로딩중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col justify-center py-6 gap-16">
      {/* Header */}
      <header className="px-4 text-center">
        <div style={{ fontSize: '48px', marginBottom: '4px' }}>🦅</div>
        <h1 className="font-bold text-amber-700" style={{ fontSize: '28px', marginBottom: '4px' }}>
          독수리 의원
        </h1>
        <p className="text-amber-500" style={{ fontSize: '14px' }}>
          ✨ 하루 한 말씀, 독수리처럼 날아오르기 ✨
        </p>
        {userInfo && (
          <p className="text-amber-600" style={{ fontSize: '14px', marginTop: '8px' }}>
            {userInfo.temple} {userInfo.generation}기 {userInfo.name}
          </p>
        )}
      </header>

      {/* Calendar Grid */}
      <main>
        <div className="grid grid-cols-7 gap-3" style={{ width: '85%', margin: '0 auto' }}>
          {verses.map((verse) => {
            const { isUnlocked, isToday } = getDayStatus(verse.day);
            const isOpened = openedDays.includes(verse.day);
            const isAnimating = animatingDay === verse.day;
            return (
              <DayCard
                key={verse.day}
                day={verse.day}
                isUnlocked={isUnlocked}
                isToday={isToday}
                isOpened={isOpened}
                isAnimating={isAnimating}
                onClick={() => handleDayClick(verse.day)}
              />
            );
          })}
        </div>
      </main>

      {/* User Info Modal */}
      {!userInfo && <UserInfoModal onSubmit={handleUserInfoSubmit} />}

      {/* Verse Modal */}
      <VerseModal
        verse={selectedVerse ?? null}
        onClose={() => setSelectedDay(null)}
      />
    </div>
  );
}
