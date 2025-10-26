"use client";
import { usePathname, useRouter } from 'next/navigation'

export default function Link({ href, children }) {
  const router = useRouter()
  const pathname = usePathname()

  const goToPage = async () => {
    if(pathname === '/' && href !== "/") {
      const ele = document.getElementById('erasmiana-logo');
      ele.style.marginTop = ((ele.offsetTop - 32) * -1) + 'px';
      await delayTimeout(700);
      document.getElementById('erasmiana-logo-fixed').style.display = 'block';
    }
    document.getElementById('animator').classList.add("fade")
    await delayTimeout(700);
    router.push(href)
    await delayTimeout(200);
    document.getElementById('animator').classList.remove("fade")
    await delayTimeout(700);
    document.getElementById('erasmiana-logo-fixed').style.display = 'none';
  }

  function delayTimeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return (
    <div onClick={() => goToPage()}>{children}</div>
  );
}