window.addEventListener('wheel', (e) => {
  const box = document.querySelector('#scroll-container');
  const boxNav = document.querySelector('#scroll-container-nav');

  const isInsideBox = box?.contains(e.target);
  const isInsideNav = boxNav?.contains(e.target);

  // If the user scrolls inside either target, let normal scrolling happen
  if (isInsideBox || isInsideNav) return;

  // Otherwise, manually scroll them and prevent default browser scroll
  e.preventDefault();

  if (box) box.scrollTop += e.deltaY;
  if (boxNav) boxNav.scrollTop += e.deltaY;
}, { passive: false });

// let touchStartY = 0;

// window.addEventListener('touchstart', (e) => {
//   touchStartY = e.touches[0].clientY;
// }, { passive: true });

// window.addEventListener('touchmove', (e) => {
//   const box = document.querySelector('#scroll-container');
//   const boxNav = document.querySelector('#scroll-container-nav');
//   if(box) {
//     const currentY = e.touches[0].clientY;
//     const deltaY = touchStartY - currentY;
//     touchStartY = currentY;
//     box.scrollTop += deltaY;
//   }
//   if(boxNav) {
//     const currentY = e.touches[0].clientY;
//     const deltaY = touchStartY - currentY;
//     touchStartY = currentY;
//     boxNav.scrollTop += deltaY;
//   }
// }, { passive: false });