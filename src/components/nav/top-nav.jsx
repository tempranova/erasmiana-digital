import Logo from '@/components/nav/logo';
import Link from '@/components/nav/link';

export default function TopNav() {

  return (
    <div className="w-full flex">
      <div className="relative bg-black p-8 w-[400px] border-r-2 border-b-2 border-gray-600">
        <Logo header={true} padding={true} />
      </div>
      <div className="w-full bg-black h-[100px] flex-1 text-white text-right flex items-center justify-end gap-8 pr-8 text-2xl">
        <div className="cursor-pointer decoration-from-font underline-offset-5 hover:underline"><Link href="/search">Search</Link></div>
        <div className="cursor-pointer decoration-from-font underline-offset-5 hover:underline"><Link href="/letters">Letters</Link></div>
      </div>
    </div>
  );
}
      