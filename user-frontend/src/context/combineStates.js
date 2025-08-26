import { useMemo } from "react";
import { SidebarState } from "./sidebar/state";

const useCombineState = () => {
  const sidebarState = SidebarState();
  return useMemo(() => ({ sidebarState }), [sidebarState]);
};

export default useCombineState;
