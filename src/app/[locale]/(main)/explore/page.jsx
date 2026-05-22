import Link from 'next/link';

import Image from '@/components/explore/image';
import { getDictionary } from '@/lib/intl/dictionaries'

export default async function Page({ params }) {

  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <Image />
  );
}
