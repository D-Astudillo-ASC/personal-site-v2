import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

interface UseObfuscatedContentOptions {
  fakeContent: string;
  realContent: string;
  selector?: string;
  delay?: number;
}

/**
 * Custom hook for replacing fake content with real content after page load
 * This prevents the real content from appearing in the initial JSON rehydration
 */
export function useObfuscatedContent({
  fakeContent,
  realContent,
  selector = "a[href*='mailto:'], a[href*='tel:']",
  delay = 1000,
}: UseObfuscatedContentOptions) {
  const pathname = usePathname();

  const updateContentNow = useCallback(() => {
    const elements = document.querySelectorAll(selector);

    // Check if any elements contain the fake content before processing
    const hasFakeContent = Array.from(elements).some(
      (element) =>
        element.textContent?.includes(fakeContent) ||
        (element instanceof HTMLAnchorElement && element.href.includes(fakeContent)),
    );

    // Only process if fake content is found
    if (!hasFakeContent) {
      return;
    }

    elements.forEach((element) => {
      // Check if element contains fake content
      if (element.textContent?.includes(fakeContent)) {
        // Replace text content
        if (element.textContent) {
          element.textContent = element.textContent.replace(fakeContent, realContent);
        }

        // Replace href if it's a link
        if (element instanceof HTMLAnchorElement) {
          if (element.href.includes(fakeContent)) {
            element.href = element.href.replace(fakeContent, realContent);
          }
        }
      }
    });
  }, [fakeContent, realContent, selector]);

  useEffect(() => {
    // App Router route changes do not reliably trigger `popstate` for Link navigation.
    // Triggering off `pathname` covers client-side navigations.
    if (typeof window === "undefined") return;

    const timeoutId = window.setTimeout(() => {
      updateContentNow();
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [pathname, delay, updateContentNow]);
}

/**
 * Hook specifically for email obfuscation
 */
export function useObfuscatedEmail(fakeEmail: string, realEmail: string) {
  return useObfuscatedContent({
    fakeContent: fakeEmail,
    realContent: realEmail,
    selector: "a[href*='mailto:']",
    delay: 1000,
  });
}

/**
 * Hook specifically for phone obfuscation
 */
export function useObfuscatedPhone(fakePhone: string, realPhone: string) {
  return useObfuscatedContent({
    fakeContent: fakePhone,
    realContent: realPhone,
    selector: "a[href*='tel:']",
    delay: 1000,
  });
}
