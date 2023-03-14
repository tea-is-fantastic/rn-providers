import { useEffect, useState } from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await new Promise(r => setTimeout(r, 5000));

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        // await RNBootSplash.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
