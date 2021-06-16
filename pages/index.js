import Head from "next/head";
import Header from "../components/header";
import Editor from "../components/editor";
import { useState, useRef, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import fs from "fs";

const Diploma = ({ propertiesData }) => {
  const [select, setSelect] = useState(null),
    [fontsList, toggleFontsList] = useState(false),
    [sizesList, toggleSizessList] = useState(false),
    [values, setValues] = useState(null),
    [productionMode, setProductionMode] = useState(false),
    editor = useRef(null),
    toggleFonts = () => {
      toggleSizessList(false);
      toggleFontsList(!fontsList);
    },
    toggleSizes = () => {
      toggleFontsList(false);
      toggleSizessList(!sizesList);
    },
    setState = (type, value) => {
      const { current } = editor;

      toggleSizessList(false);
      toggleFontsList(false);
      setValues(current.setStyle(type, value)[select]);
    },
    getActive = (prop, def) => {
      if (!values) {
        if (prop === "fontFamily") return "Arial";
        if (prop === "fontSize") return "14";
        return false;
      }

      const val = values.fontStyles[prop];

      if (prop === "textAlign") return val !== null && val === def;

      if (prop === "fontFamily") return val ? val : "Arial";

      if (prop === "fontSize") return val ? parseInt(val) : "14";

      return val !== null;
    },
    downloadImage = async () => {
      await setProductionMode(true);
      const { current } = editor;
      if (current) {
        const node = current.getElement();
        htmlToImage
          .toPng(node, { canvasWidth: 2480, canvasHeight: 3508 })
          .then(async (dataUrl) => {
            download(dataUrl, `${Date.now()}-diplom.png`);
            await setProductionMode(false);
          })
          .catch(function (error) {
            console.error("oops, something went wrong!", error);
          });
      }
    },
    selectedImageBack = (event) => {
      event.persist();
      const file = event.target.files[0],
        reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const { current } = editor,
          image = reader.result;

        current.setBackgroundImage(image);
      };
      reader.onerror = function () {
        console.log("there are some problems");
      };
    },
    loadFonts = async () => {
      const style = document.createElement("style"),
        head = document.head || document.getElementsByTagName("head")[0],
        { fonts } = propertiesData;

      let fontLine = "";
      for (let font of fonts) {
        const newFont = new FontFace(
          font.value,
          `url(${window.location.href}fonts_gramota/${font.value}/${font.value}.ttf)`
        );
        // wait for font to be loaded
        newFont.load();
        // add font to document
        document.fonts.add(newFont);

        fontLine += `@font-face {font-family: "${font.value}";src: url("${window.location.href}fonts_gramota/${font.value}/${font.value}.ttf");font-weight: 300;};`;
      }

      style.innerText = fontLine;
      head.appendChild(style);
    };

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    const { current } = editor;
    if (select && current) {
      setValues(current.getObject()[select]);
    }
  }, [select]);

  return (
    <div className="l-wrapper">
      <Head>
        <title>Rost | 3.0 diplom</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {propertiesData && (
        <main>
          <div className="container"></div>
          <div className="mobile-burger mobile-burger--diplom">
            <div className="mobile-burger__head">
              <button
                type="button"
                className="mobile-burger__btn js-close-mmenu"
              >
                <span></span>
              </button>
            </div>
            <div className="mobile-burger__content">
              <div className="c-menu">
                <h3 className="e-title--sm">Меню</h3>
                <div className="c-menu__wrapper">
                  <ul className="h-reset-list c-menu__list">
                    <li className="c-menu__item">
                      <a href="#" className="c-menu__link">
                        <svg
                          width="1em"
                          height="1em"
                          className="icon icon-smile-bad c-menu__ico"
                        >
                          <use xlinkHref="/images/useful/svg/theme/symbol-defs.svg#icon-smile-bad"></use>
                        </svg>
                        <span className="c-menu__txt">Жалобы</span>
                      </a>
                    </li>
                    <li className="c-menu__item">
                      <a href="#" className="c-menu__link">
                        <svg
                          width="1em"
                          height="1em"
                          className="icon icon-lock c-menu__ico"
                        >
                          <use xlinkHref="/images/useful/svg/theme/symbol-defs.svg#icon-lock"></use>
                        </svg>
                        <span className="c-menu__txt">Заблокированное</span>
                      </a>
                    </li>
                    <li className="c-menu__item">
                      <a href="#" className="c-menu__link">
                        <svg
                          width="1em"
                          height="1em"
                          className="icon icon-community c-menu__ico"
                        >
                          <use xlinkHref="/images/useful/svg/theme/symbol-defs.svg#icon-community"></use>
                        </svg>
                        <span className="c-menu__txt">Права доступа</span>
                      </a>
                    </li>
                    <li className="c-menu__item">
                      <a href="#" className="c-menu__link">
                        <svg
                          width="1em"
                          height="1em"
                          className="icon icon-stripe c-menu__ico"
                        >
                          <use xlinkHref="/images/useful/svg/theme/symbol-defs.svg#icon-stripe"></use>
                        </svg>
                        <span className="c-menu__txt">Структура РОСТ</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="c-diplom-page">
            <div className="container">
              <a href="#" className="c-diplom-page__all-back">
                <svg width="1em" height="1em" className="icon icon-arrow">
                  <use xlinkHref="/images/useful/svg/theme/symbol-defs.svg#icon-arrow"></use>
                </svg>
                <span>Итоги события</span>
              </a>
              <div className="c-diplom-page__inner">
                <div className="c-diplom-page__banner c-diplom-page-banner">
                  <div className="c-diplom-page-banner__change-img">
                    <div className="c-diplom-page-banner__empty-img"></div>
                  </div>
                  <div className="c-diplom-page-banner__desc">
                    <b className="c-diplom-page-banner__name">Документ 1</b>
                    <span className="c-diplom-page-banner__date">
                      Дата создания:{" "}
                      <span className="c-diplom-page-banner__date-txt">
                        26.01.2020
                      </span>
                    </span>
                  </div>
                  <div className="c-edit__wrapper">
                    <button type="button" className="c-edit">
                      <svg
                        width="1em"
                        height="1em"
                        className="icon icon-border-down "
                      >
                        <use xlinkHref="/images/useful/svg/theme/symbol-defs.svg#icon-border-down"></use>
                      </svg>
                      <div className="c-edit__options">
                        <div className="c-edit__items">
                          <a href="#" className="c-edit__item">
                            Переименовать
                          </a>
                          <a href="#" className="c-edit__item">
                            Создать копию
                          </a>
                          <a href="#" className="c-edit__item">
                            Удалить
                          </a>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="c-diplom-page__actions c-diplom-actions">
                  <div
                    className={`c-diplom-actions__text ${
                      select ? "enabled" : "disabled"
                    }`}
                  >
                    <div className="c-diplom-actions-option ff">
                      <div className={`c-select ${fontsList ? "open" : ""}`}>
                        <div className="c-select__wrapper">
                          <div
                            className="c-select__trigger"
                            onClick={toggleFonts}
                          >
                            <span>{getActive("fontFamily")}</span>
                            <div className="c-select__arrow">
                              <svg
                                width="1em"
                                height="1em"
                                className="icon icon-down-arrow "
                              >
                                <use xlinkHref="/images/useful/svg/theme/symbol-defs.svg#icon-down-arrow"></use>
                              </svg>
                            </div>
                          </div>
                          <div className="c-select__options">
                            {propertiesData.fonts.map((el, key) => (
                              <span
                                key={key}
                                data-value={el.key}
                                className="c-select__option"
                                onClick={() => setState("fontFamily", el.value)}
                                style={{ fontFamily: el.value }}
                              >
                                {el.title}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="c-diplom-actions-option fz">
                      <div className={`c-select ${sizesList ? "open" : ""}`}>
                        <div className="c-select__wrapper">
                          <div
                            className="c-select__trigger center"
                            onClick={toggleSizes}
                          >
                            <span>{getActive("fontSize")}</span>
                            <div className="c-select__arrow">
                              <svg
                                width="1em"
                                height="1em"
                                className="icon icon-down-arrow "
                              >
                                <use xlinkHref="/images/useful/svg/theme/symbol-defs.svg#icon-down-arrow"></use>
                              </svg>
                            </div>
                          </div>
                          <div className="c-select__options">
                            {propertiesData.sizes.map((el, key) => (
                              <span
                                key={key}
                                data-value={el.key}
                                className="c-select__option"
                                onClick={() =>
                                  setState("fontSize", el.value + "px")
                                }
                              >
                                {el.title}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`c-diplom-actions-option bold ${
                        getActive("fontWeight") ? "active" : ""
                      }`}
                    >
                      <button
                        type="button"
                        className={`c-diplom-actions-option__btn`}
                        onClick={() => setState("fontWeight", "bold")}
                      >
                        ж
                      </button>
                    </div>
                    <div
                      className={`c-diplom-actions-option cursive ${
                        getActive("fontStyle") ? "active" : ""
                      }`}
                    >
                      <button
                        type="button"
                        className={`c-diplom-actions-option__btn `}
                        onClick={() => setState("fontStyle", "italic")}
                      >
                        к
                      </button>
                    </div>
                    <div
                      className={`c-diplom-actions-option underline ${
                        getActive("textDecoration") ? "active" : ""
                      }`}
                    >
                      <button
                        type="button"
                        className={`c-diplom-actions-option__btn`}
                        onClick={() => setState("textDecoration", "underline")}
                      >
                        ч
                      </button>
                    </div>
                    <div
                      className={`c-diplom-actions-option tal ${
                        getActive("textAlign", "left") ? "active" : ""
                      }`}
                    >
                      <button
                        type="button"
                        className={`c-diplom-actions-option__btn`}
                        onClick={() => setState("textAlign", "left")}
                      >
                        <svg
                          width="1em"
                          height="1em"
                          className="icon icon-tal "
                        >
                          <use xlinkHref="/images/useful/svg/theme/symbol-defs.svg#icon-tal"></use>
                        </svg>
                      </button>
                    </div>
                    <div
                      className={`c-diplom-actions-option tac ${
                        getActive("textAlign", "center") ? "active" : ""
                      }`}
                    >
                      <button
                        type="button"
                        className={`c-diplom-actions-option__btn`}
                        onClick={() => setState("textAlign", "center")}
                      >
                        <svg
                          width="1em"
                          height="1em"
                          className="icon icon-tac "
                        >
                          <use xlinkHref="/images/useful/svg/theme/symbol-defs.svg#icon-tac"></use>
                        </svg>
                      </button>
                    </div>
                    <div
                      className={`c-diplom-actions-option tar ${
                        getActive("textAlign", "right") ? "active" : ""
                      }`}
                    >
                      <button
                        type="button"
                        className={`c-diplom-actions-option__btn`}
                        onClick={() => setState("textAlign", "right")}
                      >
                        <svg
                          width="1em"
                          height="1em"
                          className="icon icon-tar "
                        >
                          <use xlinkHref="/images/useful/svg/theme/symbol-defs.svg#icon-tar"></use>
                        </svg>
                      </button>
                    </div>
                    <div
                      className={`c-diplom-actions-option db ${
                        getActive("textAlign", "justify") ? "active" : ""
                      }`}
                    >
                      <button
                        type="button"
                        className={`c-diplom-actions-option__btn`}
                        onClick={() => setState("textAlign", "justify")}
                      >
                        <svg
                          width="1em"
                          height="1em"
                          className="icon icon-block-lines "
                        >
                          <use xlinkHref="/images/useful/svg/theme/symbol-defs.svg#icon-block-lines"></use>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="c-diplom-actions__bg">
                    <div className="c-diplom-actions-option">
                      <input
                        id="selectBackground"
                        type="file"
                        accept="image/jpeg,image/png"
                        style={{ display: "none" }}
                        onChange={selectedImageBack}
                      />
                      <label
                        htmlFor="selectBackground"
                        type="button"
                        className="c-diplom-actions-option__btn"
                      >
                        Фон
                        {/* </button> */}
                      </label>
                    </div>
                  </div>
                  <div className="c-diplom-actions__btns">
                    <button
                      type="button"
                      className="e-btn e-btn--outline c-diplom-actions-btn"
                      onClick={downloadImage}
                    >
                      {productionMode ? (
                        <img
                          src={"/images/useful/svg/loading.svg"}
                          alt="loading"
                        />
                      ) : (
                        "Скачать"
                      )}
                    </button>
                    <button
                      type="button"
                      className="e-btn e-btn--filled button c-diplom-actions-btn"
                    >
                      Сохранить
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="c-diplom-page__edit c-diplom-page-edit"
              onMouseDown={() => {
                toggleSizessList(false);
                toggleFontsList(false);
              }}
            >
              <div className="container">
                <Editor
                  setSelect={(e) => setSelect(e)}
                  ref={editor}
                  productionMode={productionMode}
                />
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export const getStaticProps = async () => {
  // Call an external API endpoint to get posts
  // const res = await fetch("/hello");
  // const posts = await res.json();
  const fontsFolder = "./public/fonts_gramota";
  const fonts = fs.readdirSync(fontsFolder);
  const fontsValues = fonts.map((font) => {
    return {
      title: font.replace(/\_/g, " "),
      value: font,
    };
  });

  const propertiesData = {
    fonts: fontsValues,
    sizes: [
      {
        title: "11",
        value: "11",
      },
      {
        title: "12",
        value: "12",
      },
      {
        title: "14",
        value: "14",
      },
      {
        title: "16",
        value: "16",
      },
      {
        title: "18",
        value: "18",
      },
      {
        title: "20",
        value: "20",
      },
      {
        title: "24",
        value: "24",
      },
      {
        title: "28",
        value: "28",
      },
      {
        title: "30",
        value: "30",
      },
      {
        title: "36",
        value: "36",
      },
      {
        title: "48",
        value: "48",
      },
      {
        title: "64",
        value: "64",
      },
      {
        title: "72",
        value: "72",
      },
    ],
  };

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      propertiesData,
    },
  };
};

export default Diploma;
