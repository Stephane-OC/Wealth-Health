 /* Functions for managing application's theme.                                         **
 **                                                                                     **
 ** setTheme: Applies specified theme to application.                                   **
 ** - It sets a 'data-theme' attribute on root element to  specified theme.             **
 ** - Chosen theme is also stored in localStorage to persist user's preference.         **
 **                                                                                     **
 ** toggleTheme: Toggles application's theme between light and dark modes.              **
 ** - It retrieves current theme from localStorage.                                     **
 ** - If the current theme is 'dark', it switches to 'light' by calling setTheme.       **
 **                                                                                     **
 ** loadTheme: Loads and applies saved theme from localStorage when application starts. **
 ** - If no theme is saved, it defaults to 'light' theme.                               **
 ** - Calls setTheme with the saved or default theme.                                   **
 **                                                                                     **
 ** These functions facilitate dynamic theme switching and help in maintaining user     **
 ** preference across application restarts.                                             */


const setTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
};

const toggleTheme = () => {
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    setTheme("light");
  } else {
    setTheme("dark");
  }
};

const loadTheme = () => {
  // Default to light theme
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
};

export { toggleTheme, loadTheme };
