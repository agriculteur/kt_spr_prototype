/**
 * Toast notification component
 */

const TYPE_CLASSES = {
  success: {
    container: 'bg-green-50 border-green-300 text-green-800',
    icon: `<svg class="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`,
  },
  error: {
    container: 'bg-red-50 border-red-300 text-red-800',
    icon: `<svg class="w-5 h-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`,
  },
  warning: {
    container: 'bg-amber-50 border-amber-300 text-amber-800',
    icon: `<svg class="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>`,
  },
  info: {
    container: 'bg-blue-50 border-blue-300 text-blue-800',
    icon: `<svg class="w-5 h-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  },
};

/**
 * Show a toast notification
 * @param {string} message
 * @param {'success'|'error'|'warning'|'info'} type
 * @param {number} duration - ms before auto-dismiss (default 4000)
 */
export function showToast(message, type = 'info', duration = 4000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const style = TYPE_CLASSES[type] || TYPE_CLASSES.info;

  const toast = document.createElement('div');
  toast.className = `flex items-start gap-3 px-4 py-3 rounded-lg border shadow-lg max-w-sm w-full pointer-events-auto
    transform translate-x-full opacity-0 transition-all duration-300 ease-out
    ${style.container}`;

  toast.innerHTML = `
    ${style.icon}
    <p class="text-sm font-medium flex-1 leading-snug">${message}</p>
    <button class="shrink-0 ml-1 text-current opacity-60 hover:opacity-100 transition-opacity" aria-label="Fermer">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  `;

  container.appendChild(toast);

  // Slide in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.remove('translate-x-full', 'opacity-0');
      toast.classList.add('translate-x-0', 'opacity-100');
    });
  });

  const dismiss = () => {
    toast.classList.remove('translate-x-0', 'opacity-100');
    toast.classList.add('translate-x-full', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  };

  // Close button
  toast.querySelector('button').addEventListener('click', dismiss);

  // Auto dismiss
  let timer = setTimeout(dismiss, duration);
  toast.addEventListener('mouseenter', () => clearTimeout(timer));
  toast.addEventListener('mouseleave', () => {
    clearTimeout(timer);
    timer = setTimeout(dismiss, 1500);
  });
}
