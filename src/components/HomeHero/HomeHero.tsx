import "./home-hero.scss";
export const HomeHero = () => {
  return (
    <div className="home-hero">
      <div className="home-hero__content">
        <img src="/src/assets/img/halal-logo.svg" alt="Home Hero Background" />
        <h2 className="home-hero__content__text">
          Halal Market is the new authorized service provider for ISEG HALAL—the
          authorized entity by the Egyptian Government to certify Halal exported
          products into The Arab Republic of Egypt.
        </h2>
      </div>
    </div>
  );
};
