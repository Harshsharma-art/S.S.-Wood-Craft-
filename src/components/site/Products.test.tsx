/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as fc from 'fast-check';
import { Products } from './Products';
import * as content from '@/lib/content';
import type { Product } from '@/lib/content';

/**
 * Bug Condition Exploration Test for Products Component
 * 
 * **Validates: Requirements 1.1, 2.1**
 * 
 * This test explores the bug condition: when data.length === 0 and isLoading === false,
 * the Products component should display fallback product cards with images from src/assets/
 * instead of empty white space.
 * 
 * CRITICAL: This test is EXPECTED TO FAIL on unfixed code - failure confirms the bug exists.
 * DO NOT fix the test or code when it fails during initial run.
 * 
 * The bug condition is: (data !== undefined) AND (data.length === 0) AND (isLoading === false)
 */

describe('Products Component - Bug Condition Exploration', () => {
  it('Property 1: Empty data arrays should display fallback product cards with images', () => {
    /**
     * Property-based test using fast-check to generate test cases for the bug condition.
     * 
     * For this deterministic bug, we scope the property to the concrete failing case:
     * empty products array with isLoading = false
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
          queryClient.setQueryData(content.productsQuery.queryKey, emptyData);

          // Render component with empty data
          const { container } = render(
            <QueryClientProvider client={queryClient}>
              <Products />
            </QueryClientProvider>
          );

          // Bug Condition Check: isLoading should be false (data has loaded)
          // and data should be empty array
          const isLoading = queryClient.getQueryState(content.productsQuery.queryKey)?.status === 'pending';
          expect(isLoading).toBe(false);
          expect(emptyData.length).toBe(0);

          // Expected Behavior: Component should display fallback product cards with images
          // The fallback images should be from src/assets/ using the fallbackImage() function
          
          // Check that images are present in the rendered output
          const images = container.querySelectorAll('img');
          
          // EXPECTED TO FAIL ON UNFIXED CODE:
          // Currently, when data is empty, the component displays only a text message
          // with no images. This assertion will fail, confirming the bug exists.
          expect(images.length).toBeGreaterThan(0);
          
          // Verify that the images use fallback image sources
          images.forEach((img) => {
            const src = img.getAttribute('src');
            expect(src).toBeTruthy();
            // Fallback images should be from the FALLBACK_IMAGES array
            expect(src).toMatch(/\.(jpg|jpeg|png|webp)$/i);
          });

          // Verify product card structure exists (article elements)
          const productCards = container.querySelectorAll('article');
          
          // EXPECTED TO FAIL ON UNFIXED CODE:
          // Currently shows only text message, no product cards
          expect(productCards.length).toBeGreaterThan(0);

          // Verify that the empty state message is NOT displayed
          // (since we're showing fallback content instead)
          const emptyMessage = screen.queryByText(/Products will appear here once they are added/i);
          
          // EXPECTED TO FAIL ON UNFIXED CODE:
          // Currently the empty message IS displayed
          expect(emptyMessage).not.toBeInTheDocument();
        }
      ),
      {
        numRuns: 10, // Run multiple times to ensure consistency
      }
    );
  });
});

/**
 * Preservation Property Tests for Products Component
 * 
 * **Validates: Requirements 3.1, 3.3, 3.5, 3.6**
 * 
 * These tests observe and document the current behavior on UNFIXED code for non-buggy inputs.
 * They capture the baseline behavior that must be preserved when implementing the fix.
 * 
 * EXPECTED OUTCOME: These tests should PASS on unfixed code (confirms baseline behavior to preserve).
 */

describe('Products Component - Preservation Properties (BEFORE fix)', () => {
  /**
   * Property 2: Preservation - Non-Empty Data with Database Image URLs
   * 
   * When data.length > 0 with valid image URLs, component displays database data correctly.
   */
  it('Property 2a: Products with valid image URLs render correctly', () => {
    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'Modern Kitchen',
        description: 'A beautiful modern kitchen with sleek design',
        category: 'Kitchen',
        image_url: 'https://example.com/kitchen.jpg',
        display_order: 1,
        is_active: true,
      },
      {
        id: '2',
        name: 'Custom Wardrobe',
        description: 'Custom built wardrobe with optimal storage',
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

    queryClient.setQueryData(content.productsQuery.queryKey, sampleProducts);

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Products />
      </QueryClientProvider>
    );

    // Verify product cards are rendered
    const productCards = container.querySelectorAll('article');
    expect(productCards.length).toBe(2);

    // Verify images are rendered with correct src
    const images = container.querySelectorAll('article img');
    expect(images.length).toBe(2);
    expect((images[0] as HTMLImageElement).src).toBe('https://example.com/kitchen.jpg');
    expect((images[1] as HTMLImageElement).src).toBe('https://example.com/wardrobe.jpg');

    // Verify empty message is NOT displayed
    const emptyMessage = screen.queryByText(/Products will appear here once they are added/i);
    expect(emptyMessage).not.toBeInTheDocument();
  });

  /**
   * Property 2b: Preservation - Non-Empty Data with Null Image URLs
   * 
   * When data.length > 0 with null image URLs, component uses fallbackImage function.
   */
  it('Property 2b: Products with null image URLs use fallback images', () => {
    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'Modern Kitchen',
        description: 'A beautiful modern kitchen',
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

    queryClient.setQueryData(content.productsQuery.queryKey, sampleProducts);

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Products />
      </QueryClientProvider>
    );

    // Verify product card is rendered
    const productCards = container.querySelectorAll('article');
    expect(productCards.length).toBe(1);

    // Verify image is rendered with fallback (not null)
    const images = container.querySelectorAll('article img');
    expect(images.length).toBe(1);
    expect((images[0] as HTMLImageElement).src).toBeTruthy();
    // Fallback images are from the assets folder
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

    // Don't set query data - this simulates loading state

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Products />
      </QueryClientProvider>
    );

    // Verify loading skeletons are displayed
    const loadingSkeletons = container.querySelectorAll('.animate-pulse');
    expect(loadingSkeletons.length).toBe(8);

    // Verify no product cards during loading
    const productCards = container.querySelectorAll('article');
    expect(productCards.length).toBe(0);
  });

  /**
   * Property 4: Preservation - Product Card Structure
   * 
   * Verifies that product cards maintain correct structure and styling.
   */
  it('Property 4: Product cards maintain correct structure and styling', () => {
    const sampleProduct: Product = {
      id: '123',
      name: 'Modern Kitchen',
      description: 'A beautiful modern kitchen with sleek design',
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

    queryClient.setQueryData(content.productsQuery.queryKey, [sampleProduct]);

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Products />
      </QueryClientProvider>
    );

    // Verify article element with correct classes
    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
    expect(article?.className).toContain('surface-card');
    expect(article?.className).toContain('group');

    // Verify image with correct classes
    const img = article?.querySelector('img');
    expect(img?.className).toContain('transition-transform');
    expect(img?.className).toContain('group-hover:scale-105');

    // Verify content structure
    expect(article?.querySelector('.text-gold')).toBeInTheDocument();
    expect(article?.querySelector('h3')).toBeInTheDocument();
  });
});
