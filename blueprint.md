
# Project Blueprint: Advanced Contact Manager

## 1. Overview

This application is an advanced contact manager built with the latest features of Angular. It provides a modern, interactive, and visually appealing user interface for managing a list of contacts. The application is designed to be responsive, working seamlessly on both mobile and desktop browsers.

## 2. Implemented Features & Design (Current State)

This section documents the project as it currently exists, including all implemented styles, designs, and features.

### Core Architecture
- **Framework:** Angular v20+
- **Architecture:** 100% Standalone Components
- **State Management:** Angular Signals
- **Control Flow:** Native `@` syntax (`@for`, `@if`)
- **Styling:** Bootstrap for layout and component styling.

### Views & Components
- **Card View (`/cards`):** Displays contacts in a grid of cards.
- **Table View (`/list`):** Displays contacts in a traditional table format.
- **Contact Form (`/create`, `/edit/:id`):** A form for creating and editing contact information.

### UI & Design
- **Layout:** A two-view system allowing users to toggle between a card-based layout and a table-based layout.
- **Header:** A consistent header is present on both views, containing:
    - A main title.
    - An "Add Contact" button.
    - View-toggle buttons ("Card View" / "Table View").
- **Styling:**
    - Uses Bootstrap for a clean and responsive grid system.
    - Buttons and tables are styled with standard Bootstrap classes (`btn`, `table`).

---

## 3. Current Task: Stabilize and Refactor UI

The immediate goal is to fix the UI inconsistencies and structural errors that were introduced.

### Plan
1.  **Standardize the Header:** Ensure the `advanced-contact-list.component.html` (Card View) has the exact same header as the `list-contact.html` (Table View) to provide consistent navigation and actions. The active view's button will be styled as disabled.
2.  **Correct Component Definitions:** Systematically go through all component TypeScript files (`.ts`) and ensure they adhere to the project's critical rules:
    - `changeDetection: ChangeDetectionStrategy.OnPush` is present.
    - The forbidden explicit `standalone: true` property is removed.
3.  **Fix File Naming:**
    - Correct any component files with improper names (e.g., `list-contact.ts`). The content will be moved to a correctly named file (e.g., `list-contact.component.ts`), and the original file will be emptied.
4.  **Verify Routes:** Double-check `app.routes.ts` to ensure all routes point to the correctly named component files.
5.  **Final Build:** Run `ng build` to confirm all fixes are in place and the application compiles without errors.
