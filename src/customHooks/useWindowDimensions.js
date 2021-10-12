import {useEffect, useState} from 'react'

const useWindowDimensions = () => {
  const [currentWidth, setCurrentWidth] = useState(getWindowDimensions());

  //   get the current browser width
  function getWindowDimensions() {
    const { innerWidth: width } = window;
    return { width };
  }

  // recalculates the width on every render
  useEffect(() => {
    function handleResize() {
      setCurrentWidth(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    // should return for avoid memory leak
    return () => window.removeEventListener("resize", handleResize);
  });

  return { currentWidth };
}

export default useWindowDimensions
