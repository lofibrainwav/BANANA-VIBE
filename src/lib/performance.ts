import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

export function reportWebVitals(metric: any) {
  const { name, value, id } = metric;
  
  // Google Analytics에 전송
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      non_interaction: true,
    });
  }
  
  // 콘솔에 로깅
  console.log(`Web Vitals: ${name} (${id}) = ${value}`);
}

export function initWebVitals() {
  getCLS(reportWebVitals);
  getFID(reportWebVitals);
  getLCP(reportWebVitals);
  getFCP(reportWebVitals);
  getTTFB(reportWebVitals);
}

export function measurePerformance(name: string, fn: () => void) {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`Performance: ${name} took ${end - start}ms`);
}

export function measureAsyncPerformance(name: string, fn: () => Promise<any>) {
  const start = performance.now();
  return fn().finally(() => {
    const end = performance.now();
    console.log(`Performance: ${name} took ${end - start}ms`);
  });
} 