import {useState} from 'react'

const useDetectBrowser = () => {
  const [browser, setBrowser] = useState()
  const [isChrome, setIsChrome] = useState(false)

  const detectBrowser = () => {
  if (
    (navigator.userAgent.indexOf("Opera") ||
      navigator.userAgent.indexOf("OPR")) !== -1
  ) {
    setBrowser("Opera");
  } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
    setBrowser("Chrome");
    setIsChrome(true);
  } else if (navigator.userAgent.indexOf("Safari") !== -1) {
    setBrowser("Safari");
  } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
    setBrowser("Firefox");
  } else if (
    navigator.userAgent.indexOf("MSIE") !== -1 ||
    !!document.documentMode === true
  ) {
    //IF IE > 10
    setBrowser("IE");
  } else {
    setBrowser("unknown");
  }

  }

  return { browser, isChrome, detectBrowser };
}

export default useDetectBrowser
