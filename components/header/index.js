export default function Header() {
  return (
    <header className="c-header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-sm-2 col-5 align-items-center d-flex">
            <button type="button" className="c-header__mmenu js-open-mmenu">
              <span></span>
            </button>
            <a href="#" className="c-header__logo">
              <svg width="1em" height="1em" className="icon icon-logo ">
                <use xlinkHref="/images/useful/svg/theme/symbol-defs.svg#icon-logo"></use>
              </svg>
            </a>
          </div>
          <div className="col-sm-5 d-none d-sm-block">
            <div className="c-header__date c-header-date">
              <div className="c-header-date__ico">
                <svg width="1em" height="1em" className="icon icon-calendar ">
                  <use xlinkHref="/images/useful/svg/theme/symbol-defs.svg#icon-calendar"></use>
                </svg>
              </div>
              <span className="c-header-date__text">12.02.2020</span>
              <span className="c-header-date__text">13:00</span>
            </div>
          </div>
          <div className="col-sm-3 col-5">
            <div className="c-header__actions">
              <div className="c-header__notify c-header-notify">
                <a href="#" className="c-header-notify__btn">
                  <svg width="1em" height="1em" className="icon icon-notify ">
                    <use xlinkHref="/images/useful/svg/theme/symbol-defs.svg#icon-notify"></use>
                  </svg>
                  <span className="c-header-notify__count">7</span>
                </a>
              </div>
              <div className="c-header__search c-header-search">
                <form action="/" className="c-header-search__form">
                  <input
                    type="text"
                    placeholder="Глобальный поиск"
                    className="c-header-search__field"
                  />
                  <button type="button" className="c-header-search__btn">
                    <svg width="1em" height="1em" className="icon icon-search ">
                      <use xlinkHref="/images/useful/svg/theme/symbol-defs.svg#icon-search"></use>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
