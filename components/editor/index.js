import {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { InputEditor } from "../edit-input";

export const Editor = forwardRef(
  ({ setSelect, productionMode, inputsDoc }, ref) => {
    const [background, setBackground] = useState(
        "/images/tmp_file/background.jpg"
      ),
      [inputs, setInputs] = useState(null),
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
      },
      parseSizes = (prop, type, raznica) => {
        const propSize = prop[type],
          propPercent = propSize / 100,
          percentSumm = propPercent * raznica;
        return propSize - percentSumm;
      },
      researchSizes = (properties) => {
        const { current } = offsetParent,
          maxWidth = 982,
          currentWidth = current.clientWidth,
          raznica = maxWidth - currentWidth,
          onePercent = maxWidth / 100,
          raznicaPercent = parseInt(raznica / onePercent);

        Object.keys(properties).forEach((prop) => {
          properties[prop].left = parseSizes(
            properties[prop],
            "left",
            raznicaPercent
          );
          properties[prop].top = parseSizes(
            properties[prop],
            "top",
            raznicaPercent
          );

          properties[prop].width = parseSizes(
            properties[prop],
            "width",
            raznicaPercent
          );
          properties[prop].height = parseSizes(
            properties[prop],
            "height",
            raznicaPercent
          );
        });

        setInputs(properties);
      };

    useImperativeHandle(ref, () => ({
      setStyle(type, value) {
        if (type === "fornFamily" || type === "fontSize") {
          return updateStyle(input, type, value);
        }
        return updateStyle(input, type, getCurrentValue(type, value));
      },
      setBackgroundImage(b64) {
        setBackground(b64);
      },
      getObject() {
        return inputs;
      },
      getElement() {
        return offsetParent.current;
      },
    }));

    useEffect(() => {
      const { properties } = inputsDoc;

      researchSizes(properties);
      // window.addEventListener("resize", () => {
      //   console.log("resize");
      //   researchSizes(properties);
      // });
    }, []);

    return (
      <div className="c-diplom-page-edit__place" ref={offsetParent}>
        <img src={background} alt="" />
        <div
          className={`c-diplom-page-edit__actions ${
            productionMode ? "production" : ""
          }`}
        >
          {inputs && (
            <>
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
            </>
          )}
        </div>
      </div>
    );
  }
);
