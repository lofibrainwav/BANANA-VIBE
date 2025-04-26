import { SWRConfig } from 'swr';

export const swrConfig = {
  // 기본 fetcher 함수
  fetcher: async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      const error = new Error('API 요청이 실패했습니다.');
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }
    return res.json();
  },
  // 전역 설정
  revalidateOnFocus: false, // 포커스시 자동 재검증 비활성화
  revalidateOnReconnect: true, // 재연결시 자동 재검증
  refreshInterval: 0, // 자동 갱신 비활성화
  shouldRetryOnError: true, // 에러시 재시도
  dedupingInterval: 2000, // 중복 요청 방지 간격
  focusThrottleInterval: 5000, // 포커스 이벤트 쓰로틀링
  loadingTimeout: 3000, // 로딩 타임아웃
  errorRetryInterval: 5000, // 에러 재시도 간격
  errorRetryCount: 3, // 최대 재시도 횟수
  // 캐시 설정
  provider: () => new Map(),
  keepPreviousData: true,
  suspense: false,
};

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={swrConfig}>
      {children}
    </SWRConfig>
  );
} 