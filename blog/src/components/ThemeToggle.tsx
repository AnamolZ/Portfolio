import {useEffect } from "react";

export const ThemeToggle = () => {

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    if (!isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <>
    </>
  );
};
