import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

export const InputEditor = ({
  area,
  classes,
  id,
  type,
  text,
  placeholder,
  properties,
  onSelect,
}) => {
  const inputRef = useRef(null),
    handleStop = (event) => {
      const { x, y } = event;
      if (area) {
        const Left = area.offsetLeft - x,
          Top = y - area.offsetTop;
      }
    };

  return (
    <Draggable
      handle=".dropper"
      defaultPosition={{ x: properties.left, y: properties.top }}
      position={null}
      scale={1}
      onStop={handleStop}
      offsetParent={area}
      bounds="parent"
    >
      <div className="text-input-line">
        <span className="dropper">
          <img src={"/images/useful/svg/move.svg"} />
        </span>
        <div
          className={`c-diplom-page-edit__action ${type} ${classes}`}
          ref={inputRef}
          style={{
            resize: "both",
            overflow: "hidden",
            minHeight: type === "input" ? 50 : "auto",
            maxHeight: type === "input" ? 50 : "auto",
            width: properties.width,
            height: properties.height,
          }}
        >
          {type === "input" && (
            <input
              id={id}
              type="text"
              defaultValue={text}
              placeholder={placeholder}
              onFocus={onSelect}
              style={properties.fontStyles}
            />
          )}
          {type === "textarea" && (
            <textarea
              id={id}
              placeholder={placeholder}
              defaultValue={text}
              onFocus={onSelect}
              style={properties.fontStyles}
            ></textarea>
          )}
        </div>
      </div>
    </Draggable>
  );
};
