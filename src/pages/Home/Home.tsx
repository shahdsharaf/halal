import { HomeHero } from "../../components/HomeHero/HomeHero";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setTransparent } from "../../features/nav/navbarSlice";

export const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTransparent(true));
    return () => {
      dispatch(setTransparent(false));
    };
  }, [dispatch]);

  return (
    <div id="homePage">
      <HomeHero />
    </div>
  );
};
