import { useState, useEffect } from 'react';
import UAParser from 'ua-parser-js';

interface DeviceInfo {
  name: string;
  os: string;
  type: string;
  browser: string;
}

export function useCurrentDevice(): DeviceInfo | null {
  const [currentDevice, setCurrentDevice] = useState<DeviceInfo | null>(null);

  useEffect(() => {
    // This function will run only on the client side
    if (typeof window !== 'undefined') {
      const uaParser = new UAParser(window.navigator.userAgent);
      const deviceInfo = uaParser.getResult();

      setCurrentDevice({
        name: deviceInfo.device.model || 'Unknown Device',
        os: deviceInfo.os.name || 'Unknown OS',
        type: deviceInfo.device.type || 'desktop',
        browser: deviceInfo.browser.name || 'Unknown Browser',
      });
    }
  }, []);

  return currentDevice;
}