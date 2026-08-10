/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import * as fc from 'fast-check';
import { Gallery } from './Gallery';
import * as content from '@/lib/content';
import type { GalleryItem } from '@/lib/content';

/**
 * Bug Condition Exploration Test for Gallery Component
 * 
 * **Validates: Requirements 1.2, 2.2**
 * 
 * This test explores the bug condition: when data.length === 0 and isLoading === false,
 * the Gallery component should display fallback gallery images in a grid from src/assets/
 * instead of empty white space.
 * 
 * CRITICAL: This test is EXPECTED TO FAIL on unfixed code - failure confirms the bug exists.
 * DO NOT fix the test or code when it fails during initial run.
 * 
 * The bug condition is: (data !== undefined) AND (data.length === 0) AND (isLoading === false)
 */

describe('Gallery Component - Bug Condition Exploration', () => {
  it('Property 1: Empty data arrays should display fallback gallery images in grid', () => {
    /**
     * Property-based test using fast-check to generate test cases for the bug condition.
     * 
     * For this deterministic bug, we scope the property to the concrete failing case:
     * empty gallery array with isLoading = false
     */
    fc.assert(
      fc.property(
        // Generate empty array scenarios
        fc.constant([]),
        (emptyData) => {
          // Mock the useQuery hook to return empty data
          const queryClient = new QueryClient({
            defaultOptions: {
              queries: {
                retry: false,
              },
            },
          });

          // Set up query data to simulate empty database
          queryClient.setQueryData(content.galleryQuery.queryKey, emptyData);

          // Render component with empty data
          const { container } = render(
            <QueryClientProvider client={queryClient}>
              <Gallery />
            </QueryClientProvider>
          );

          // Bug Condition Check: isLoading should be false (data has loaded)
          // and data should be empty array
          const isLoading = queryClient.getQueryState(content.galleryQuery.queryKey)?.status === 'pending';
          expect(isLoading).toBe(false);
          expect(emptyData.length).toBe(0);

          // Expected Behavior: Component should display fallback gallery images in grid
          // The fallback images should be from src/assets/ using the fallbackImage() function
          
          // Check that images are present in the rendered output
          const images = container.querySelectorAll('img');
          
          // EXPECTED TO FAIL ON UNFIXED CODE:
          // Currently, when data is empty, the component displays only the section heading
          // with no images. This assertion will fail, confirming the bug exists.
          expect(images.length).toBeGreaterThan(0);
          
          // Verify that the images use fallback image sources
          images.forEach((img) => {
            const src = img.getAttribute('src');
            expect(src).toBeTruthy();
            // Fallback images should be from the FALLBACK_IMAGES array
            expect(src).toMatch(/\.(jpg|jpeg|png|webp)$/i);
          });

          // Verify gallery item button structure exists
          const galleryButtons = container.querySelectorAll('button[type="button"]');
          
          // EXPECTED TO FAIL ON UNFIXED CODE:
          // Currently shows only heading with white space, no gallery items
          // Note: We filter out the close button in the lightbox (if any)
          const galleryItemButtons = Array.from(galleryButtons).filter(
            (btn) => !btn.getAttribute('aria-label')?.includes('Close')
          );
          expect(galleryItemButtons.length).toBeGreaterThan(0);

          // Verify that gallery grid container exists
          const gridContainer = container.querySelector('.columns-1');
          
          // EXPECTED TO FAIL ON UNFIXED CODE:
          // Grid container exists but has no children
          expect(gridContainer).toBeInTheDocument();
          if (gridContainer) {
            expect(gridContainer.children.length).toBeGreaterThan(0);
          }
        }
      ),
      {
        numRuns: 10, // Run multiple times to ensure consistency
      }
    );
  });
});

/**
 * Preservation Property Tests for Gallery Component
 * 
 * **Validates: Requirements 3.2, 3.3, 3.4, 3.6**
 * 
 * These tests observe and document the current behavior on UNFIXED code for non-buggy inputs.
 * They capture the baseline behavior that must be preserved when implementing the fix.
 * 
 * EXPECTED OUTCOME: These tests should PASS on unfixed code (confirms baseline behavior to preserve).
 */

describe('Gallery Component - Preservation Properties (BEFORE fix)', () => {
  /**
   * Property 2: Preservation - Non-Empty Data with Database Image URLs
   * 
   * When data.length > 0 with valid image URLs, component displays database data correctly.
   */
  it('Property 2a: Gallery with valid image URLs renders correctly', () => {
    const sampleGallery: GalleryItem[] = [
      {
        id: '1',
        title: 'Modern Kitchen Project',
        category: 'Kitchen',
        image_url: 'https://example.com/kitchen.jpg',
        display_order: 1,
        is_active: true,
      },
      {
        id: '2',
        title: 'Custom Wardrobe Installation',
        category: 'Wardrobe',
        image_url: 'https://example.com/wardrobe.jpg',
        display_order: 2,
        is_active: true,
      },
    ];

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    queryClient.setQueryData(content.galleryQuery.queryKey, sampleGallery);

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Gallery />
      </QueryClientProvider>
    );

    // Verify gallery items are rendered
    const galleryButtons = container.querySelectorAll('button[type="button"]');
    const itemButtons = Array.from(galleryButtons).filter(
      (btn) => !btn.getAttribute('aria-label')?.includes('Close')
    );
    expect(itemButtons.length).toBe(2);

    // Verify images with correct src
    const images = container.querySelectorAll('.columns-1 img');
    expect(images.length).toBe(2);
    expect((images[0] as HTMLImageElement).src).toBe('https://example.com/kitchen.jpg');
    expect((images[1] as HTMLImageElement).src).toBe('https://example.com/wardrobe.jpg');
  });

  /**
   * Property 2b: Preservation - Non-Empty Data with Null Image URLs
   * 
   * When data.length > 0 with null image URLs, component uses fallbackImage function.
   */
  it('Property 2b: Gallery with null image URLs uses fallback images', () => {
    const sampleGallery: GalleryItem[] = [
      {
        id: '1',
        title: 'Modern Kitchen Project',
        category: 'Kitchen',
        image_url: null,
        display_order: 1,
        is_active: true,
      },
    ];

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    queryClient.setQueryData(content.galleryQuery.queryKey, sampleGallery);

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Gallery />
      </QueryClientProvider>
    );

    // Verify gallery item is rendered
    const galleryButtons = container.querySelectorAll('button[type="button"]');
    const itemButtons = Array.from(galleryButtons).filter(
      (btn) => !btn.getAttribute('aria-label')?.includes('Close')
    );
    expect(itemButtons.length).toBe(1);

    // Verify image uses fallback
    const images = container.querySelectorAll('.columns-1 img');
    expect(images.length).toBe(1);
    expect((images[0] as HTMLImageElement).src).toBeTruthy();
    expect((images[0] as HTMLImageElement).src).toContain('.jpg');
  });

  /**
   * Property 3: Preservation - Loading State Behavior
   * 
   * When isLoading === true, the component should display skeleton placeholders.
   */
  it('Property 3: Loading state displays skeleton placeholders', () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    // Don't set query data - simulates loading state

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Gallery />
      </QueryClientProvider>
    );

    // Verify loading skeletons
    const loadingSkeletons = container.querySelectorAll('.animate-pulse');
    expect(loadingSkeletons.length).toBe(6);

    // Verify no gallery items during loading
    const galleryButtons = container.querySelectorAll('button[type="button"]');
    const itemButtons = Array.from(galleryButtons).filter(
      (btn) => !btn.getAttribute('aria-label')?.includes('Close')
    );
    expect(itemButtons.length).toBe(0);
  });

  /**
   * Property 4: Preservation - Lightbox Interaction
   * 
   * Verifies clicking gallery items opens lightbox and ESC closes it.
   */
  it('Property 4: Gallery lightbox opens on click and closes with ESC key', async () => {
    const user = userEvent.setup();

    const sampleItem: GalleryItem = {
      id: '123',
      title: 'Modern Kitchen Project',
      category: 'Kitchen',
      image_url: 'https://example.com/kitchen.jpg',
      display_order: 1,
      is_active: true,
    };

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    queryClient.setQueryData(content.galleryQuery.queryKey, [sampleItem]);

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Gallery />
      </QueryClientProvider>
    );

    // Find gallery item button
    const galleryButtons = container.querySelectorAll('button[type="button"]');
    const itemButtons = Array.from(galleryButtons).filter(
      (btn) => !btn.getAttribute('aria-label')?.includes('Close')
    );
    expect(itemButtons.length).toBe(1);

    // Initially no lightbox
    let lightboxDialog = container.querySelector('[role="dialog"]');
    expect(lightboxDialog).not.toBeInTheDocument();

    // Click to open lightbox
    await user.click(itemButtons[0]);

    // Verify lightbox opened
    lightboxDialog = container.querySelector('[role="dialog"]');
    expect(lightboxDialog).toBeInTheDocument();
    expect(lightboxDialog?.getAttribute('aria-label')).toBe('Modern Kitchen Project');

    // Verify image in lightbox
    const lightboxImage = lightboxDialog?.querySelector('img') as HTMLImageElement;
    expect(lightboxImage.src).toBe('https://example.com/kitchen.jpg');

    // Press ESC to close
    await user.keyboard('{Escape}');

    // Verify lightbox closed
    lightboxDialog = container.querySelector('[role="dialog"]');
    expect(lightboxDialog).not.toBeInTheDocument();
  });

  /**
   * Property 5: Preservation - Gallery Item Structure
   * 
   * Verifies gallery items maintain correct structure.
   */
  it('Property 5: Gallery items maintain correct structure with hover overlays', () => {
    const sampleItem: GalleryItem = {
      id: '456',
      title: 'Custom Wardrobe',
      category: 'Wardrobe',
      image_url: 'https://example.com/wardrobe.jpg',
      display_order: 1,
      is_active: true,
    };

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    queryClient.setQueryData(content.galleryQuery.queryKey, [sampleItem]);

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Gallery />
      </QueryClientProvider>
    );

    // Verify button with correct classes
    const button = container.querySelector('button[type="button"]');
    expect(button).toBeInTheDocument();
    expect(button?.className).toContain('group');
    expect(button?.className).toContain('rounded-sm');

    // Verify image with correct classes
    const img = button?.querySelector('img');
    expect(img?.className).toContain('transition-transform');
    expect(img?.className).toContain('group-hover:scale-105');

    // Verify overlay exists
    const overlay = button?.querySelector('.absolute');
    expect(overlay).toBeInTheDocument();
    expect(overlay?.className).toContain('opacity-0');
    expect(overlay?.className).toContain('group-hover:opacity-100');
  });
});
