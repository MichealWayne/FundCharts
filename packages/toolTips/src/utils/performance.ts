/**
 * @author Wayne
 * @Date 2025-06-21 15:49:50
 * @description Performance monitoring utilities for tooltips
 */

export interface PerformanceMetrics {
  renderTime: number;
  cacheHits: number;
  cacheMisses: number;
}

export interface PerformanceSummary {
  totalOperations: number;
  totalCacheHits: number;
  totalCacheMisses: number;
  cacheHitRate: number;
  averageRenderTime: number;
}

export class PerformanceMonitor {
  private metrics = new Map<string, PerformanceMetrics>();
  private startTimes = new Map<string, number>();
  private globalCacheHits = 0;
  private globalCacheMisses = 0;

  start(operationId: string): void {
    this.startTimes.set(operationId, performance.now());
    if (!this.metrics.has(operationId)) {
      this.metrics.set(operationId, {
        renderTime: 0,
        cacheHits: 0,
        cacheMisses: 0,
      });
    }
  }

  end(operationId: string): void {
    const startTime = this.startTimes.get(operationId);
    if (startTime) {
      const endTime = performance.now();
      const metrics = this.metrics.get(operationId);
      if (metrics) {
        metrics.renderTime = endTime - startTime;
        metrics.cacheHits = this.globalCacheHits;
        metrics.cacheMisses = this.globalCacheMisses;
      }
      this.startTimes.delete(operationId);
    }
  }

  recordCacheHit(): void {
    this.globalCacheHits++;
  }

  recordCacheMiss(): void {
    this.globalCacheMisses++;
  }

  getMetrics(operationId: string): PerformanceMetrics | undefined {
    return this.metrics.get(operationId);
  }

  getSummary(): PerformanceSummary {
    const operations = Array.from(this.metrics.values());
    const totalOperations = operations.length;
    const totalCacheHits = this.globalCacheHits;
    const totalCacheMisses = this.globalCacheMisses;
    const totalRenderTime = operations.reduce((sum, m) => sum + m.renderTime, 0);
    
    return {
      totalOperations,
      totalCacheHits,
      totalCacheMisses,
      cacheHitRate: totalCacheHits + totalCacheMisses > 0 
        ? totalCacheHits / (totalCacheHits + totalCacheMisses) 
        : 0,
      averageRenderTime: totalOperations > 0 ? totalRenderTime / totalOperations : 0,
    };
  }

  clear(): void {
    this.metrics.clear();
    this.startTimes.clear();
    this.globalCacheHits = 0;
    this.globalCacheMisses = 0;
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        func(...args);
        timeoutId = null;
      }, delay - (now - lastCall));
    }
  };
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
}