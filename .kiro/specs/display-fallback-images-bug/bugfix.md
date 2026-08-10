# Bugfix Requirements Document

## Introduction

When the Supabase `products` and `gallery` tables are empty (no data has been added through the admin panel yet), the Products and Gallery sections on the website display empty white space instead of fallback images. This creates a poor user experience for new deployments or when content has been removed. The application has fallback images available in `src/assets/` that should be displayed as default content until real data is added, but the current implementation only uses these fallback images when there IS data returned from the database (as the `fallbackImage()` function is only called within the `data?.map()` iteration).

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the `products` table returns an empty array (no products in database) THEN the Products section displays only a text message "Products will appear here once they are added in the admin panel" with no visual content or images

1.2 WHEN the `gallery` table returns an empty array (no gallery items in database) THEN the Gallery section displays no images, showing only the section heading and description with empty white space below

1.3 WHEN a user first deploys the website without adding any products or gallery items THEN both sections appear incomplete and unprofessional with missing visual content

### Expected Behavior (Correct)

2.1 WHEN the `products` table returns an empty array THEN the system SHALL display a default set of fallback product cards with images from `src/assets/`, placeholder names, and placeholder descriptions to provide visual content

2.2 WHEN the `gallery` table returns an empty array THEN the system SHALL display a default set of fallback gallery images from `src/assets/` to provide visual content in the gallery grid

2.3 WHEN a user first deploys the website without adding any products or gallery items THEN both sections SHALL display placeholder content with fallback images, maintaining a professional appearance until real content is added

### Unchanged Behavior (Regression Prevention)

3.1 WHEN the `products` table returns data with one or more products THEN the system SHALL CONTINUE TO display those products with their database-provided images (or fallback images if `image_url` is null)

3.2 WHEN the `gallery` table returns data with one or more gallery items THEN the system SHALL CONTINUE TO display those gallery items with their database-provided images (or fallback images if `image_url` is null)

3.3 WHEN products or gallery items have a null `image_url` but exist in the database THEN the system SHALL CONTINUE TO use the `fallbackImage()` function to display fallback images based on the item's index

3.4 WHEN the user interacts with gallery images (clicking to open lightbox, ESC to close) THEN the system SHALL CONTINUE TO function as it currently does

3.5 WHEN products are displayed with category labels, names, and descriptions from the database THEN the system SHALL CONTINUE TO render those fields correctly

3.6 WHEN loading state is active (data is being fetched) THEN the system SHALL CONTINUE TO display skeleton loading placeholders
