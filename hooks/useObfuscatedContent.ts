import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    const updateContent = () => {
      setTimeout(() => {
        const elements = document.querySelectorAll(selector);

        // Check if any elements contain the fake content before processing
        const hasFakeContent = Array.from(elements).some(
          (element) =>
            element.textContent?.includes(fakeContent) ||
            (element instanceof HTMLAnchorElement &&
              element.href.includes(fakeContent)),
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
              element.textContent = element.textContent.replace(
                fakeContent,
                realContent,
              );
            }

            // Replace href if it's a link
            if (element instanceof HTMLAnchorElement) {
              if (element.href.includes(fakeContent)) {
                element.href = element.href.replace(fakeContent, realContent);
              }
            }
          }
        });
      }, delay);
    };

    // Update on initial load
    updateContent();

    // Update on route changes (for Next.js App Router)
    const handleRouteChange = () => {
      updateContent();
    };

    // Listen for route changes
    window.addEventListener("popstate", handleRouteChange);

    // For Next.js App Router, we can also listen to navigation events
    // NOTE: This is a simplified approach - in practice, we might want to use
    // a more sophisticated route change detection method

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [fakeContent, realContent, selector, delay]);
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
