'use client';
import { useEffect, useState } from "react";

export default function FakeWaveform() {
  const [ audioOn, setAudioOn ] = useState(false);
  const [ bars, setBars ] = useState(Array(13).fill(5));

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(bars.map(h => (h * 0.8) + (Math.random() * 20 + 5) * 0.2));
    }, 150);
    return () => clearInterval(interval);
  }, [bars]);

  return (
    <div className="flex items-center justify-center">
      {audioOn ? 
        <svg className="cursor-pointer" onClick={() => {
          document.getElementById('erasmusAudio').pause();
          setAudioOn(false)
        }} fill="#FFF" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
            <path d="M1129.432 113v1694.148H903.545l-451.772-451.773V564.773L903.545 113h225.887Zm542.545 248.057C1832.017 521.097 1920 733.882 1920 960.107c0 226.226-87.983 438.898-248.023 598.938l-79.851-79.85c138.694-138.582 214.93-323.018 214.93-519.087 0-196.183-76.236-380.506-214.93-519.2ZM338.83 564.773v790.602H169.415C75.672 1355.375 0 1279.703 0 1185.96V734.187c0-93.742 75.672-169.414 169.415-169.414H338.83Zm1093.922 36.085c95.776 97.018 148.407 224.644 148.407 359.16 0 134.628-52.631 262.253-148.407 359.272l-80.303-79.174c74.656-75.897 115.767-175.4 115.767-280.099 0-104.585-41.111-204.088-115.767-279.986Z" fillRule="evenodd"/>
        </svg>
      : 
        <svg className="cursor-pointer" onClick={() => {
          document.getElementById('erasmusAudio').play();
          setAudioOn(true)
        }} fill="#FFF" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
          <path d="M1129.433 113v1694.15H903.547l-451.774-451.773V564.773L903.547 113h225.886ZM338.83 564.773v790.604H169.415c-92.806 0-167.9-74.166-169.392-166.609L0 1185.962V734.188c0-92.805 74.166-167.9 166.608-169.392l2.807-.023H338.83ZM1789.951 635 1920 764.926 1724.988 959.94 1920 1154.95 1789.951 1285l-194.89-195.012L1400.05 1285 1270 1154.951l195.012-195.012L1270 764.926 1400.049 635l195.012 195.012L1789.951 635Z" fillRule="evenodd"/>
        </svg>
      }
      <div className="ml-4 flex items-end gap-[2px] h-6">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`${audioOn ? 'bg-white' : 'bg-white/50'} rounded-sm w-[3px] transition-all duration-150 ease-in-out`}
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
    </div>
  );
}