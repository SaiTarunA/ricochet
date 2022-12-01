import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  hasNavBar: false,
  scanResult: [],
  codeText: "",
  isWebCam: false,
  finalCode: "",
});

export { useGlobalState, setGlobalState };
