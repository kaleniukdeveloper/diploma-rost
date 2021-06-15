import { forwardRef, useRef, useImperativeHandle, useState } from "react";
// import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import InputEditor from "../edit-input";

import dynamic from "next/dynamic";

const PinchZoomPan = dynamic(() => import("../pinch-zoom-pan"), {
  ssr: false,
});

export default forwardRef(({ setSelect, productionMode }, ref) => {
  const [background, setBackground] = useState(
      "/images/tmp_file/diplom-edit.png"
    ),
    [inputs, setInputs] = useState({
      edit_1: {
        width: 730,
        height: 50,
        left: 120,
        top: 500,
        fontStyles: {
          fontFamily: null,
          fontSize: "36px",
          fontWeight: null,
          fontStyle: null,
          textDecoration: null,
          textAlign: null,
        },
      },
      edit_2: {
        width: 730,
        height: 50,
        left: 120,
        top: 570,
        fontStyles: {
          fontFamily: null,
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          textDecoration: null,
          textAlign: null,
        },
      },
      edit_3: {
        width: 730,
        height: 250,
        left: 120,
        top: 640,
        fontStyles: {
          fontFamily: null,
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          textDecoration: null,
          textAlign: null,
        },
      },
      edit_4: {
        width: 730,
        height: 250,
        left: 120,
        top: 710,
        fontStyles: {
          fontFamily: null,
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          textDecoration: null,
          textAlign: null,
        },
      },
      edit_5: {
        width: 730,
        height: 250,
        left: 120,
        top: 980,
        fontStyles: {
          fontFamily: null,
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          textDecoration: null,
          textAlign: null,
        },
      },
      edit_6: {
        width: 200,
        height: 40,
        left: 385,
        top: 1250,
        fontStyles: {
          fontFamily: null,
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          textDecoration: null,
          textAlign: null,
        },
      },
    }),
    [input, setInput] = useState(null),
    offsetParent = useRef(null),
    onSelectInput = (event) => {
      event.preventDefault();
      onUnselectInput();
      event.target.parentElement.classList.add("selected-input");
      const { id } = event.target;

      setInput(id);
      setSelect(id);
    },
    onUnselectInput = () => {
      const classes = document.getElementsByClassName("selected-input");

      for (let el of classes) {
        el.classList.remove("selected-input");
      }
      setInput(null);
      setSelect(null);
    },
    updateStyle = (id, style, value) => {
      const currentElement = Object.assign({}, inputs, {
        ...inputs,
        [id]: {
          ...inputs[id],
          fontStyles: {
            ...inputs[id].fontStyles,
            [style]: value,
          },
        },
      });

      setInputs(currentElement);
      return currentElement;
    },
    getCurrentValue = (style, value) => {
      return inputs[input].fontStyles[style] === value ? null : value;
    };

  useImperativeHandle(ref, () => ({
    setFont(fontFamily) {
      return updateStyle(input, "fontFamily", fontFamily);
    },
    setSize(fontSize) {
      return updateStyle(input, "fontSize", fontSize + "px");
    },
    setBold(fontWeight) {
      return updateStyle(
        input,
        "fontWeight",
        getCurrentValue("fontWeight", fontWeight)
      );
    },
    setItalic(fontStyle) {
      return updateStyle(
        input,
        "fontStyle",
        getCurrentValue("fontStyle", fontStyle)
      );
    },
    setUnderlined(textDecoration) {
      return updateStyle(
        input,
        "textDecoration",
        getCurrentValue("textDecoration", textDecoration)
      );
    },
    setFloat(textAlign) {
      return updateStyle(
        input,
        "textAlign",
        getCurrentValue("textAlign", textAlign)
      );
    },
    getObject() {
      return inputs;
    },
    getElement() {
      return offsetParent.current;
    },
  }));

  return (
    <PinchZoomPan areaRef={offsetParent} productionMode={productionMode}>
      <div className="c-diplom-page-edit__place" ref={offsetParent}>
        <img src={background} alt="" />
        <div
          className={`c-diplom-page-edit__actions ${
            productionMode ? "production" : ""
          }`}
        >
          <InputEditor
            classes={""}
            defaultValue=""
            id="edit_1"
            type={"input"}
            placeholder={"Имя"}
            properties={inputs["edit_1"]}
            onSelect={onSelectInput}
            area={offsetParent.current}
          />

          <InputEditor
            classes={``}
            defaultValue=""
            id="edit_2"
            type={"input"}
            placeholder={"Фамилия"}
            properties={inputs["edit_2"]}
            onSelect={onSelectInput}
            area={offsetParent.current}
          />

          <InputEditor
            classes={``}
            defaultValue=""
            id="edit_3"
            type={"input"}
            placeholder={"Отчество"}
            properties={inputs["edit_3"]}
            onSelect={onSelectInput}
            area={offsetParent.current}
          />

          <InputEditor
            classes={""}
            defaultValue=""
            id="edit_4"
            type={"textarea"}
            placeholder={"Результат"}
            properties={inputs["edit_4"]}
            onSelect={onSelectInput}
            area={offsetParent.current}
          />

          <InputEditor
            classes={""}
            defaultValue=""
            id="edit_5"
            type={"textarea"}
            placeholder={"Состав комиссии"}
            properties={inputs["edit_5"]}
            onSelect={onSelectInput}
            area={offsetParent.current}
          />

          <InputEditor
            classes={""}
            defaultValue=""
            id="edit_6"
            type={"input"}
            placeholder={"Город и дата"}
            properties={inputs["edit_6"]}
            onSelect={onSelectInput}
            area={offsetParent.current}
          />
        </div>
      </div>
    </PinchZoomPan>
  );
});
