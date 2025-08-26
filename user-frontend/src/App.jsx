import React, { memo, useCallback, useEffect } from "react";
import "./assets/css/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import allRoutesMapper from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "@/redux/combineAction";
import { getSessionStorageTheme } from "@/helpers/session-storage";
import { useIsMobile } from "@/hooks/useMobile";

const App = () => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const { setScreenSizeAction, setActiveThemeAction } = themeActions;
  const { screenSize } = useSelector((state) => state.themeState);
  useEffect(() => {
    handleThemeResizeFunction();
  }, []);

  useEffect(() => {
    if (!screenSize) {
      handleResizeFunction();
    }

    window.addEventListener("resize", handleResizeFunction);
    return () => {
      window.removeEventListener("resize", handleResizeFunction);
    };
  }, [isMobile]);

  const handleThemeResizeFunction = useCallback(() => {
    const currentTheme = getSessionStorageTheme();
    if (currentTheme) {
      dispatch(setActiveThemeAction(currentTheme));
    } else {
      dispatch(setActiveThemeAction("dark"));
    }
  }, []);

  const handleResizeFunction = useCallback(() => {
    if (isMobile) {
      dispatch(setScreenSizeAction("mobile"));
    } else {
      dispatch(setScreenSizeAction("desktop"));
    }
  }, [isMobile, screenSize]);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {allRoutesMapper?.map((singleRoute) => (
            <Route
              key={singleRoute?.path}
              path={singleRoute?.path}
              element={singleRoute?.component}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default memo(App);
