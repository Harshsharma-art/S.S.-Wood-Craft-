# Implementation Plan

- [x] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Empty Data Arrays Display No Images
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the bug exists
  - **Scoped PBT Approach**: For this deterministic bug, scope the property to concrete failing cases: empty products array and empty gallery array
  - Test that when `data.length === 0` and `isLoading === false` for Products component, fallback product cards with images are displayed
  - Test that when `data.length === 0` and `isLoading === false` for Gallery component, fallback gallery images are displayed in grid
  - The test assertions should match: components display fallback content with images from `src/assets/` instead of empty white space
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists)
  - Document counterexamples found: Products section shows only text message with no images, Gallery section shows only heading with white space
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Non-Empty Data Behavior Unchanged
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code for non-buggy inputs (when data arrays contain items)
  - Write property-based tests capturing observed behavior patterns from Preservation Requirements
  - Test that when `data.length > 0` for Products component, product cards are rendered with database data (or fallbackImage if image_url is null)
  - Test that when `data.length > 0` for Gallery component, gallery items are rendered with database data (or fallbackImage if image_url is null)
  - Test that when `isLoading === true`, loading skeleton placeholders are displayed
  - Test that gallery lightbox interaction works correctly (click to open, ESC to close)
  - Property-based testing generates many test cases for stronger guarantees
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [x] 3. Fix for empty data arrays not displaying fallback images

  - [x] 3.1 Add default placeholder data for Products component
    - Define constant array of 4-8 default product objects with fallback images
    - Use existing `fallbackImage(index)` function to generate image URLs
    - Include generic names, categories, and descriptions for placeholder products
    - _Bug_Condition: isBugCondition(input) where (input.data !== undefined) AND (input.data.length === 0) AND (input.isLoading === false)_
    - _Expected_Behavior: Components display default placeholder items using existing fallback images from `src/assets/`_
    - _Preservation: When data.length > 0 or isLoading === true, existing behavior must remain unchanged_
    - _Requirements: 2.1, 2.3_

  - [x] 3.2 Add default placeholder data for Gallery component
    - Define constant array of 6 default gallery item objects with fallback images
    - Use existing `fallbackImage(index)` function to generate image URLs
    - Include generic titles and categories for placeholder gallery items
    - _Bug_Condition: isBugCondition(input) where (input.data !== undefined) AND (input.data.length === 0) AND (input.isLoading === false)_
    - _Expected_Behavior: Components display default placeholder items using existing fallback images from `src/assets/`_
    - _Preservation: When data.length > 0 or isLoading === true, existing behavior must remain unchanged_
    - _Requirements: 2.2, 2.3_

  - [x] 3.3 Implement conditional data selection in Products component
    - Modify Products.tsx to use default placeholder products when `data && data.length === 0`
    - Use real data when `data && data.length > 0`
    - Remove or conditionally hide the empty state text message
    - Preserve all existing loading state and mapping logic
    - _Bug_Condition: isBugCondition(input) where (input.data !== undefined) AND (input.data.length === 0) AND (input.isLoading === false)_
    - _Expected_Behavior: Components display default placeholder items using existing fallback images from `src/assets/`_
    - _Preservation: When data.length > 0 or isLoading === true, existing behavior must remain unchanged_
    - _Requirements: 2.1, 2.3, 3.1, 3.3, 3.5, 3.6_

  - [x] 3.4 Implement conditional data selection in Gallery component
    - Modify Gallery.tsx to use default placeholder gallery items when `data && data.length === 0`
    - Use real data when `data && data.length > 0`
    - Preserve all existing loading state, mapping logic, and lightbox functionality
    - _Bug_Condition: isBugCondition(input) where (input.data !== undefined) AND (input.data.length === 0) AND (input.isLoading === false)_
    - _Expected_Behavior: Components display default placeholder items using existing fallback images from `src/assets/`_
    - _Preservation: When data.length > 0 or isLoading === true, existing behavior must remain unchanged_
    - _Requirements: 2.2, 2.3, 3.2, 3.3, 3.4_

  - [x] 3.5 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Empty Data Arrays Display Fallback Images
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior
    - When this test passes, it confirms the expected behavior is satisfied
    - Run bug condition exploration test from step 1
    - **EXPECTED OUTCOME**: Test PASSES (confirms bug is fixed)
    - _Requirements: Property 1 from design - Display Fallback Content for Empty Data_

  - [x] 3.6 Verify preservation tests still pass
    - **Property 2: Preservation** - Non-Empty Data Behavior Unchanged
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests from step 2
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Confirm all tests still pass after fix (no regressions to existing behavior)

- [x] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
