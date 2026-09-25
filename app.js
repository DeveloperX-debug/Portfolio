/* ==========================================================================
   Prem Saraf Portfolio - Lightweight Minimalist JS Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCopyButton();
});

function initCopyButton() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = copyBtn.dataset.email || 'prem.saraf@example.com';
    navigator.clipboard.writeText(email).then(() => {
      const origText = copyBtn.innerHTML;
      copyBtn.innerHTML = '<span style="color: #10b981;">Copied!</span>';
      setTimeout(() => {
        copyBtn.innerHTML = origText;
      }, 2000);
    });
  });
}
