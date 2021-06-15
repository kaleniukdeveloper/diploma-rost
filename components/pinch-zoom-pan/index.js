// import { useCallback, useEffect, useRef, useState } from "react";

// import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";

export default ({ areaRef, productionMode, children }) => {
  //   const pinchZoomRef = useRef(),
  //     [width, setWidth] = useState(0),
  //     onUpdate = useCallback(({ x, y, scale }) => {
  //       const { current: area } = areaRef;

  //       if (area) {
  //         const value = make3dTransformValue({ x, y, scale });

  //         area.style.setProperty("transform", value);
  //       }
  //     }, []);

  //   useEffect(() => {
  //       pinchZoomRef.current?.scaleTo({ x: 0, y: 0, scale: 1 });
  //     }, [productionMode]);

  //   useEffect(() => {}, []);
  return children;
  //   return (
  //     <QuickPinchZoom
  //       ref={pinchZoomRef}
  //       maxZoom={5}
  //       minZoom={0.5}
  //       draggableUnzoomed={true}
  //       onUpdate={onUpdate}
  //       lockDragAxis={false}
  //       inertia={false}
  //     >
  //       {children}
  //     </QuickPinchZoom>
  //   );
};
