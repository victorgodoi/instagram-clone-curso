// Setup file para Jest do Storybook test-runner

// Configurações básicas para o ambiente de teste
global.ResizeObserver = global.ResizeObserver || 
  class ResizeObserver {
    constructor(cb) {
      this.cb = cb;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  };

// Mock básico do Firebase se necessário
if (typeof window !== 'undefined') {
  window.firebase = window.firebase || {};
}