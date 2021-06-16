export const Banner = ({ inputsDoc }) => {
  const parseDate = (dateNow) => {
    const d = new Date(dateNow);
    const ye = new Intl.DateTimeFormat("ru", { year: "numeric" }).format(d);
    const mo = new Intl.DateTimeFormat("ru", { month: "short" }).format(d);
    const da = new Intl.DateTimeFormat("ru", { day: "2-digit" }).format(d);

    const timestring =
      ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    return `${da} ${mo} ${ye} ${timestring}`

  };
  return (
    <div className="c-diplom-page__banner c-diplom-page-banner">
      <div className="c-diplom-page-banner__change-img">
        <div className="c-diplom-page-banner__empty-img"></div>
      </div>
      <div className="c-diplom-page-banner__desc">
        <b className="c-diplom-page-banner__name">{inputsDoc.title}</b>
        <span className="c-diplom-page-banner__date">
          Дата создания:{" "}
          <span className="c-diplom-page-banner__date-txt">
            {parseDate(inputsDoc.date)}
          </span>
        </span>
      </div>
      <div className="c-edit__wrapper">
        <button type="button" className="c-edit">
          <svg width="1em" height="1em" className="icon icon-border-down ">
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
  );
};
