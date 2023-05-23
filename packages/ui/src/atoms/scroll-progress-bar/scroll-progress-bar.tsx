import { FC, useEffect, useState } from 'react';

export const ScrollProgressBar: FC = () => {
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.pageYOffset;
    const scrollPercent = (scrollPosition / totalHeight) * 100;

    setScroll(scrollPercent);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full h-2 bg-gray-200 fixed bottom-0">
      <div style={{ width: `${scroll}%` }} className="h-2 bg-black" />
    </div>
  );
};
