// Immediate error suppression - runs before React
(() => {
  // Store original methods
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalLog = console.log;

  // Override console methods immediately
  console.error = function(...args: any[]) {
    const str = args.join(' ');
    if (
      str.includes('IframeMessageAbortError') ||
      str.includes('message port was destroyed') ||
      str.includes('setupMessageChannel') ||
      str.includes('figma_app') ||
      str.includes('webpack-artifacts') ||
      str.includes('figma.com')
    ) {
      return;
    }
    originalError.apply(console, args);
  };

  console.warn = function(...args: any[]) {
    const str = args.join(' ');
    if (
      str.includes('IframeMessageAbortError') ||
      str.includes('message port') ||
      str.includes('figma')
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };

  console.log = function(...args: any[]) {
    const str = args.join(' ');
    if (
      str.includes('IframeMessageAbortError') ||
      str.includes('message port')
    ) {
      return;
    }
    originalLog.apply(console, args);
  };

  // Global error event handler
  window.addEventListener('error', (event: ErrorEvent) => {
    if (
      event.message?.includes('IframeMessageAbortError') ||
      event.message?.includes('message port was destroyed') ||
      event.filename?.includes('figma.com') ||
      event.filename?.includes('webpack-artifacts')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return false;
    }
  }, true);

  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    const reason = String(event.reason || '');
    if (
      reason.includes('IframeMessageAbortError') ||
      reason.includes('message port') ||
      reason.includes('figma')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  // Monkey-patch Error constructor to filter specific errors
  const OriginalError = Error;
  (window as any).Error = function(message?: string) {
    if (
      message?.includes('IframeMessageAbortError') ||
      message?.includes('message port was destroyed')
    ) {
      return new OriginalError('Suppressed platform error');
    }
    return new OriginalError(message);
  };
  (window as any).Error.prototype = OriginalError.prototype;
})();

export {};
