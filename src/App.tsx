import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./components/Header";
import { Linktree } from "./pages/Linktree";
import { ProjectsPage } from "./pages/ProjectsPage";
import { NowPage } from "./pages/NowPage";
import { ContactPage } from "./pages/ContactPage";
import { SnippetsPage } from "./pages/SnippetsPage";
import { AnimeList } from "./pages/animeList";
import { MangaList } from "./pages/mangaList";
import { PortfolioPage } from "./pages/PortfolioPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Footer } from "./components/Footer";
import {
  DogApi,
  LoginSignup,
  FrostedProfile,
  DarkModeToggle,
  ToastNotifications,
  AnimatedBackground,
  SimpleCalculator,
  MemoryMatch,
  SimpleClicker,
  CustomAdvancement,
  CustomBlock,
  CustomItem,
  CustomRecipe,
  CustomTrigger,
  Giveaway,
  PokemonGame,
  VoterOnlyCmd,
  ClickingGame,
  BloxfruitsStock,
  FunctionCallback,
  HomeTour,
  WordleGame,
} from "./pages/snippets";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <div>
      <div className="app-bg" />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Linktree />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/now" element={<NowPage />} />
        <Route path="/snippet" element={<SnippetsPage />} />
        <Route path="/snippet/web/dog" element={<DogApi />} />
        <Route path="/snippet/web/signup" element={<LoginSignup />} />
        <Route
          path="/snippet/web/frosted-profile"
          element={<FrostedProfile />}
        />
        <Route
          path="/snippet/web/darkmode-toggle"
          element={<DarkModeToggle />}
        />
        <Route
          path="/snippet/web/toast-notification"
          element={<ToastNotifications />}
        />
        <Route
          path="/snippet/web/background"
          element={<AnimatedBackground />}
        />
        <Route path="/snippet/web/calculator" element={<SimpleCalculator />} />
        <Route path="/snippet/web/memory" element={<MemoryMatch />} />
        <Route path="/snippet/web/clicker" element={<SimpleClicker />} />
        <Route path="/snippet/mc/advancement" element={<CustomAdvancement />} />
        <Route path="/snippet/mc/block" element={<CustomBlock />} />
        <Route path="/snippet/mc/item" element={<CustomItem />} />
        <Route path="/snippet/mc/recipe" element={<CustomRecipe />} />
        <Route path="/snippet/mc/trigger" element={<CustomTrigger />} />
        <Route path="/snippet/bdfd/giveaway" element={<Giveaway />} />
        <Route path="/snippet/bdfd/pokemon" element={<PokemonGame />} />
        <Route path="/snippet/bdfd/voter-only" element={<VoterOnlyCmd />} />
        <Route path="/snippet/bdfd/clicking" element={<ClickingGame />} />
        <Route path="/snippet/bdfd/bf-stock" element={<BloxfruitsStock />} />
        <Route path="/snippet/bdfd/functions" element={<FunctionCallback />} />
        <Route path="/snippet/bdfd/home" element={<HomeTour />} />
        <Route path="/snippet/bdfd/wordle" element={<WordleGame />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/anime-list" element={<AnimeList />} />
        <Route path="/manga-list" element={<MangaList />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
