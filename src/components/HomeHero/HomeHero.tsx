import "./home-hero.scss";
import { useTranslation } from "react-i18next";
export const HomeHero = () => {
  const { t } = useTranslation(["general"]);

  return (
    <div className="home-hero">
      <div className="home-hero__content">
        <img src="/src/assets/img/halal-logo.svg" alt="Home Hero Background" />
        <h2 className="home-hero__content__text">
          {t("homeHero", { ns: "general" })}
        </h2>
      </div>
    </div>
  );
};
