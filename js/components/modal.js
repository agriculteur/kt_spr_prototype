/**
 * Modal component for SPR application
 */

const SIZE_CLASSES = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-6xl',
};

/**
 * Open a modal with given HTML content
 * @param {string} htmlContent - Inner HTML of the modal body
 * @param {Object} options
 * @param {string} [options.title] - Modal title
 * @param {'sm'|'md'|'lg'|'xl'|'full'} [options.size='md'] - Modal size
 * @param {boolean} [options.showClose=true] - Show close button
 * @param {Function} [options.onClose] - Callback when modal closes
 */
export function openModal(htmlContent, options = {}) {
  const { title = '', size = 'md', showClose = true, onClose = null } = options;

  const container = document.getElementById('modal-container');
  if (!container) return;

  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  container.innerHTML = `
    <div id="modal-backdrop"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
      aria-modal="true" role="dialog">
      <div class="relative bg-white rounded-xl shadow-2xl w-full ${sizeClass} flex flex-col max-h-[90vh] animate-slideUp"
        id="modal-dialog">
        ${title || showClose ? `
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          ${title ? `<h2 class="text-lg font-semibold text-gray-900">${title}</h2>` : '<div></div>'}
          ${showClose ? `
          <button id="modal-close-btn" class="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors" aria-label="Fermer">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>` : ''}
        </div>` : ''}
        <div class="flex-1 overflow-y-auto px-6 py-4" id="modal-body">
          ${htmlContent}
        </div>
      </div>
    </div>
  `;

  container.classList.remove('hidden');

  // Store onClose callback
  container._onClose = onClose;

  // Backdrop click
  const backdrop = container.querySelector('#modal-backdrop');
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  // Close button
  const closeBtn = container.querySelector('#modal-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Keyboard close
  const handleKey = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleKey);
    }
  };
  document.addEventListener('keydown', handleKey);
  container._keyHandler = handleKey;
}

/**
 * Close the modal
 */
export function closeModal() {
  const container = document.getElementById('modal-container');
  if (!container) return;

  const dialog = container.querySelector('#modal-dialog');
  if (dialog) {
    dialog.classList.add('opacity-0', 'scale-95');
    dialog.style.transition = 'opacity 150ms, transform 150ms';
  }

  setTimeout(() => {
    container.classList.add('hidden');
    container.innerHTML = '';
    if (container._keyHandler) {
      document.removeEventListener('keydown', container._keyHandler);
      container._keyHandler = null;
    }
    if (typeof container._onClose === 'function') {
      container._onClose();
      container._onClose = null;
    }
  }, 150);
}

/**
 * Update modal body content
 * @param {string} htmlContent
 */
export function updateModalBody(htmlContent) {
  const body = document.getElementById('modal-body');
  if (body) body.innerHTML = htmlContent;
}
