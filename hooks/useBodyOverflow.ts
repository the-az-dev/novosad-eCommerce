import { onMounted, onUnmounted } from 'vue';

export function useBodyOverflowFix() {
  const fixOverflow = () => {
    const body = document.body;

    // Перевірка, чи Drawer закрився
    setTimeout(() => {
      if (!document.querySelector('[data-state="open"]')) {
        body.style.overflow = ''; // Повертаємо стандартний скрол
      }
    }, 100);
  };

  onMounted(() => {
    window.addEventListener('transitionend', fixOverflow, true);
  });

  onUnmounted(() => {
    window.removeEventListener('transitionend', fixOverflow, true);
  });
}
