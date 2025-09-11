# Theme Toggle Test Instructions

## How to Test the Theme Toggle

### Method 1: Using the Test File

1. **Open the test file**: Double-click `test-theme.html` in your file explorer
2. **Check the console**: Open browser developer tools (F12) and look at the console
3. **Click the toggle**: Click the theme toggle button in the navigation
4. **Verify changes**: The page should switch between light and dark themes

### Method 2: Using the Main Portfolio

1. **Open the main file**: Double-click `index.html` in your file explorer
2. **Wait for loading**: The page will load all components
3. **Click the toggle**: Click the theme toggle button in the navigation
4. **Verify changes**: The entire portfolio should switch themes

## What Should Happen

### Visual Changes:

- **Background colors** should change from dark to light
- **Text colors** should adjust for readability
- **Card backgrounds** should change
- **Border colors** should update
- **Toggle button** should slide and change icon

### Console Output:

- You should see "Theme switched to: light" or "Theme switched to: dark"
- No error messages should appear

## Troubleshooting

### If the toggle doesn't work:

1. **Check console errors**: Look for JavaScript errors in developer tools
2. **Verify elements**: Make sure the toggle button is visible and clickable
3. **Try refreshing**: Refresh the page and try again
4. **Check localStorage**: In console, type `localStorage.getItem('theme')` to see saved theme

### If styles don't change:

1. **Check CSS variables**: Verify that CSS custom properties are being applied
2. **Inspect element**: Right-click the toggle and inspect to see if data-theme attribute changes
3. **Clear cache**: Try hard refresh (Ctrl+F5) to clear cached styles

## Expected Behavior

- **Dark Mode (Default)**: Dark backgrounds, light text, moon icon
- **Light Mode**: Light backgrounds, dark text, sun icon
- **Smooth Transitions**: All changes should animate smoothly
- **Persistence**: Theme choice should be remembered on page reload
