import { NextWebVitalsMetric } from 'next/app';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

type MetricName = 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB';

interface MetricData {
  name: MetricName;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

const thresholds = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
};

function getRating(name: MetricName, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = thresholds[name];
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

function sendToAnalytics(metric: MetricData) {
  // 여기에 분석 데이터를 전송하는 로직을 구현합니다.
  // 예: Google Analytics, Custom Backend 등
  console.log('Web Vitals:', metric);
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  const data: MetricData = {
    name: metric.name as MetricName,
    value: metric.value,
    rating: getRating(metric.name as MetricName, metric.value),
  };
  sendToAnalytics(data);
}

export function initWebVitals() {
  getCLS(metric => reportWebVitals({ name: 'CLS', value: metric.value }));
  getFID(metric => reportWebVitals({ name: 'FID', value: metric.value }));
  getFCP(metric => reportWebVitals({ name: 'FCP', value: metric.value }));
  getLCP(metric => reportWebVitals({ name: 'LCP', value: metric.value }));
  getTTFB(metric => reportWebVitals({ name: 'TTFB', value: metric.value }));
} 