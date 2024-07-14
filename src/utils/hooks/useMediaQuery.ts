import { useState, useEffect } from 'react';

const useMediaQuery = (width: number): boolean => {
  const [targetReached, setTargetReached] = useState<boolean>(false);

  const updateTarget = (e: MediaQueryListEvent) => {
    setTargetReached(e.matches);
  };

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addListener(updateTarget);
    
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeListener(updateTarget);
  }, [width]);

  return targetReached;
};

export default useMediaQuery;
