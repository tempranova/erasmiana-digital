window.addEventListener('wheel', (e) => {
  const box = document.querySelector('#scroll-container');
  const boxNav = document.querySelector('#scroll-container-nav');
  if(box) {
    box.scrollTop += e.deltaY;
    e.preventDefault()
  }
  if(boxNav) {
    boxNav.scrollTop += e.deltaY;
    e.preventDefault()
  }
});

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