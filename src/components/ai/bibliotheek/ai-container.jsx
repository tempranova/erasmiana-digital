'use client';
import { useState, useRef } from 'react';
import Link from 'next/link'

import AIChat from '@/components/ai/bibliotheek/ai-chat';
import { systemPrompt } from '@/lib/utils/ai';

export default function AIContainer({ dict }) {

  return (
    <div className="relative z-10 w-full flex-1 text-left">
      <AIChat dict={dict} />
    </div>
  )

}
