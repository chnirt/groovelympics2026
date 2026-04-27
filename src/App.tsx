/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy,
  Grid3X3,
  Music,
  Gamepad2,
  Swords,
  Zap,
  Activity,
  CircleDot,
  Dribbble,
  Menu,
  X,
  ChevronRight,
  Info,
  Users,
  User as UserIcon,
  Search,
  ArrowRight,
  Calendar,
  Medal,
  Play,
} from "lucide-react";
import {
  SPORTS,
  ATHLETES,
  MATCHES,
  MEDALS,
  SPORT_STANDINGS,
} from "./constants";
import { Sport, Athlete, Match, CountryMedal } from "./types";
import { translations } from "./translations";
import { useSports } from "./hooks/useSports";
import { useAthletes } from "./hooks/useAthletes";

const ICON_MAP: Record<string, any> = {
  Trophy,
  Grid3X3,
  Music,
  Gamepad2,
  Swords,
  Zap,
  Activity,
  CircleDot,
  Dribbble,
};

type View = "sports" | "schedule" | "standings" | "athletes" | "venues";
type Lang = "en" | "vi";

export default function App() {
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [athleteSearchQuery, setAthleteSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>("sports");
  const [lang, setLang] = useState<Lang>("vi");
  const { data: sportsData } = useSports();
  const { data: athletesData } = useAthletes();

  const t = translations[lang];

  const filteredSports = useMemo(() => {
    const myData = sportsData.length > 0 ? sportsData : SPORTS;
    return myData.filter((sport: any) => {
      const name = lang === "vi" ? sport.name_vi : sport.name;
      const category = lang === "vi" ? sport.category_vi : sport.category;
      return (
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery, lang, sportsData]);

  // Design-inspired logic for "featured" cards (matching the provided HTML design)
  const isFeatured = (sport: Sport) => {
    return sport.category === "Mini-Field" || sport.category === "Mixed";
  };

  const navItems: { id: View; label: string }[] = [
    { id: "sports", label: t.program },
    { id: "schedule", label: t.events },
    { id: "standings", label: t.standings },
    { id: "athletes", label: t.athletes },
    { id: "venues", label: t.venues },
  ];

  const renderContent = () => {
    switch (currentView) {
      case "sports":
        return (
          <>
            <div className="bento-grid">
              {filteredSports.map((sport, index) => {
                const IconComp = ICON_MAP[sport.icon] || Trophy;
                const featured = isFeatured(sport);
                const sName = lang === "vi" ? sport.name_vi : sport.name;
                const sCat = lang === "vi" ? sport.category_vi : sport.category;
                const sRules = lang === "vi" ? sport.rules_vi : sport.rules;
                const sFormat = lang === "vi" ? sport.format_vi : sport.format;

                return (
                  <motion.div
                    key={sport.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedSport(sport)}
                    className={`card-bento cursor-pointer group hover:-translate-y-1 ${featured ? "lg:col-span-2" : ""} ${featured && sport.name === "Football" ? "card-featured" : FeaturedSpecialStyle(sport)}`}
                    style={
                      featured && sport.name === "Badminton"
                        ? {
                            backgroundColor: "#1a1a1a",
                            color: "white",
                            border: "none",
                          }
                        : {}
                    }
                  >
                    <div className="h-full flex flex-col justify-between min-h-[140px]">
                      <div>
                        <div
                          className={`text-[10px] font-bold uppercase tracking-widest ${(featured && sport.name === "Football") || (featured && sport.name === "Badminton") ? "text-white/70" : "text-black/50"}`}
                        >
                          {sName} • {sFormat}
                        </div>
                        <div
                          className={`text-2xl font-extrabold uppercase tracking-tighter mt-2 leading-none transition-transform group-hover:scale-[1.02] origin-left ${featured ? "text-[32px]" : ""} ${(featured && sport.name === "Football") || (featured && sport.name === "Badminton") ? "text-white" : "text-slate-900"}`}
                        >
                          {sCat}
                        </div>
                      </div>

                      <div className="flex justify-between items-end mt-4">
                        <div className="flex flex-wrap gap-1.5 flex-1 mr-4">
                          {sRules.split("\n").map((rule, i) => (
                            <span
                              key={i}
                              className={`inline-block px-2 py-0.5 rounded-sm text-[8px] font-black uppercase tracking-widest ${(featured && sport.name === "Football") || (featured && sport.name === "Badminton") ? "bg-white/20 text-white" : "bg-black/5 text-slate-500"}`}
                            >
                              {rule}
                            </span>
                          ))}
                        </div>
                        <div
                          className={`p-2.5 transition-all duration-300 rounded-lg shrink-0 ${(featured && sport.name === "Football") || (featured && sport.name === "Badminton") ? "bg-white/20 text-white group-hover:bg-white group-hover:text-black group-hover:scale-110" : "bg-black/5 text-slate-400 group-hover:bg-primary group-hover:text-white group-hover:scale-110"}`}
                        >
                          <IconComp
                            size={18}
                            className="transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        );
      case "schedule":
        return (
          <ScheduleView matches={MATCHES} sports={SPORTS} lang={lang} t={t} />
        );
      case "standings":
        return (
          <StandingsView
            medals={MEDALS}
            sports={SPORTS}
            standings={SPORT_STANDINGS}
            lang={lang}
            t={t}
          />
        );
      case "athletes":
        return (
          <AthletesView
            athletes={athletesData.length > 0 ? athletesData : ATHLETES}
            sports={SPORTS}
            lang={lang}
            t={t}
            searchQuery={athleteSearchQuery}
          />
        );
      case "venues":
        return (
          <div className="p-12 text-center bg-white rounded-lg border border-slate-100 shadow-sm border-t-4 border-primary">
            <h3 className="text-xl font-bold uppercase tracking-tighter mb-4">
              {t.venuesTitle}
            </h3>
            <p className="text-slate-500 font-medium max-w-md mx-auto">
              Hanoi National Stadium • Quan Ngua Gymnasium • Trinh Hoai Duc Hall
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-background-app font-sans selection:bg-primary selection:text-white">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-60 bg-sidebar text-white p-8 flex-col justify-between shrink-0">
        <div>
          <div className="logo-area font-black text-xl leading-none tracking-tighter uppercase">
            GROOVE<span className="text-primary italic">LYMPICS</span>
            <br />
            2026
          </div>
          <nav className="mt-10">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className="relative py-2 cursor-pointer group"
                >
                  <span
                    className={`text-sm uppercase tracking-[0.2em] transition-colors relative z-10 block ${
                      currentView === item.id
                        ? "text-white font-black"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                  {currentView === item.id && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute left-0 -bottom-0.5 h-0.5 bg-primary w-8"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setLang("vi")}
              className={`flex-1 py-1.5 text-[9px] font-black border rounded-sm transition-all ${lang === "vi" ? "bg-white text-black border-white" : "text-white/40 border-white/20 hover:border-white/40"}`}
            >
              TIẾNG VIỆT
            </button>
            <button
              onClick={() => setLang("en")}
              className={`flex-1 py-1.5 text-[9px] font-black border rounded-sm transition-all ${lang === "en" ? "bg-white text-black border-white" : "text-white/40 border-white/20 hover:border-white/40"}`}
            >
              ENGLISH
            </button>
          </div>
          <div className="bg-white/5 p-4 rounded-sm border border-white/10 h-[100px] flex flex-col justify-center shrink-0">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Info size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {lang === "vi" ? "Thông tin" : "About"}
              </span>
            </div>
            <p className="text-[10px] leading-relaxed text-slate-400 font-medium">
              {lang === "vi"
                ? "Cổng thông tin chính thức Groovelympics 2026."
                : "Official Portal for Groovelympics 2026 Sports & Results."}
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Top Nav */}
      <nav className="lg:hidden bg-sidebar text-white px-5 py-4 flex justify-between items-center z-10 shrink-0 border-b border-white/5">
        <div className="flex flex-col">
          <div className="font-black text-[13px] leading-none tracking-tighter uppercase pointer-events-none">
            GROOVE<span className="text-primary italic">LYMPICS</span> 2026
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.15em]">
              Hanoi • 05/2026
            </span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span className="text-[8px] font-black text-primary uppercase tracking-[0.1em] italic">
              {lang === "vi" ? "Sân chơi bản lĩnh" : "Global Spirit"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "vi" : "en")}
            className="text-[10px] font-bold px-2 py-1 border border-white/20 rounded-sm bg-white/5"
          >
            {lang === "en" ? "VI" : "EN"}
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-sm transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed inset-0 z-50 bg-sidebar text-white p-8 lg:hidden flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="font-black text-xl leading-none tracking-tighter uppercase">
                GROOVE<span className="text-primary italic">LYMPICS</span> 2026
              </div>
              <button onClick={() => setIsSidebarOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 mt-12">
              <ul className="space-y-6">
                {navItems.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className="relative flex items-center h-12"
                  >
                    <span
                      className={`text-xl sm:text-2xl uppercase tracking-[0.2em] transition-all ${
                        currentView === item.id
                          ? "text-white font-black"
                          : "text-white/40 font-bold hover:text-white/80"
                      }`}
                    >
                      {item.label}
                    </span>
                    {currentView === item.id && (
                      <motion.div
                        layoutId="nav-underline-mobile"
                        className="absolute left-0 -bottom-1 h-1 bg-primary w-12"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto pt-10">
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-sm border border-white/10">
                <div className="p-2 bg-primary rounded-sm text-white">
                  <Info size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                    {t.info}
                  </p>
                  <p className="text-[9px] font-bold text-white/50 leading-tight">
                    {t.portalDesc}
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 p-3 sm:p-4 lg:px-8 lg:py-6 flex flex-col overflow-y-auto custom-scrollbar">
        <header className="flex flex-col md:flex-row justify-between md:items-end items-start mb-4 lg:mb-6 gap-4 border-b border-black/10 pb-3 lg:pb-5">
          <div className="">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentView}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="text-3xl sm:text-4xl lg:text-[56px] font-extrabold uppercase leading-[0.85] tracking-tighter pb-1"
              >
                {navItems.find((i) => i.id === currentView)?.label}
              </motion.h1>
            </AnimatePresence>
            <p className="mt-2 lg:mt-4 text-[9px] lg:text-[10px] font-black text-black/60 uppercase tracking-[0.3em]">
              Groovelympics 2026 •{" "}
              {lang === "vi" ? "Sân chơi bản lĩnh" : "Global Spirit"}
            </p>
          </div>

          {(currentView === "sports" || currentView === "athletes") && (
            <div className="relative w-full max-w-sm group">
              <Search
                className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-primary transition-colors"
                size={14}
              />
              <input
                type="text"
                placeholder={
                  currentView === "sports"
                    ? t.filterSports
                    : lang === "vi"
                      ? "Tìm kiếm..."
                      : "Search..."
                }
                value={
                  currentView === "sports"
                    ? searchQuery
                    : currentView === "athletes"
                      ? athleteSearchQuery
                      : ""
                }
                onChange={(e) =>
                  currentView === "sports"
                    ? setSearchQuery(e.target.value)
                    : setAthleteSearchQuery(e.target.value)
                }
                className="w-full pl-9 lg:pl-11 pr-4 py-2.5 lg:py-3 bg-white border border-slate-100 rounded-sm shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-[11px] lg:text-xs font-bold uppercase tracking-tight lg:tracking-widest"
              />
            </div>
          )}
        </header>

        {renderContent()}
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedSport && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSport(null)}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-lg bg-white shadow-2xl flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-slate-100 bg-sidebar text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center text-white">
                    {(() => {
                      const Icon = ICON_MAP[selectedSport.icon] || Trophy;
                      return <Icon size={20} />;
                    })()}
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-primary uppercase tracking-[0.3em] leading-none mb-1">
                      {lang === "vi"
                        ? selectedSport.name_vi
                        : selectedSport.name}
                    </p>
                    <h2 className="text-xl font-extrabold uppercase tracking-tighter leading-none">
                      {lang === "vi"
                        ? selectedSport.category_vi
                        : selectedSport.category}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSport(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="space-y-10">
                  <section>
                    <h4 className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] mb-3">
                      {t.description}
                    </h4>
                    <p className="text-lg text-slate-800 font-bold leading-tight whitespace-pre-line">
                      {lang === "vi"
                        ? selectedSport.description_vi
                        : selectedSport.description}
                    </p>
                  </section>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-sm border-t-2 border-slate-200">
                      <p className="text-[9px] font-bold text-black/30 uppercase tracking-widest mb-1">
                        {t.format}
                      </p>
                      <p className="text-xs font-black uppercase text-slate-700">
                        {lang === "vi"
                          ? selectedSport.format_vi
                          : selectedSport.format}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-sm border-t-2 border-slate-200">
                      <p className="text-[9px] font-bold text-black/30 uppercase tracking-widest mb-1">
                        {lang === "vi" ? "Loại" : "Sport Type"}
                      </p>
                      <p className="text-xs font-black uppercase text-slate-700">
                        {lang === "vi"
                          ? selectedSport.name_vi
                          : selectedSport.name}
                      </p>
                    </div>
                  </div>

                  <section>
                    <h4 className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] mb-4">
                      {t.rules}
                    </h4>
                    <div className="space-y-3">
                      {(lang === "vi"
                        ? selectedSport.rules_vi
                        : selectedSport.rules
                      )
                        .split("\n")
                        .map((rule, i) => (
                          <div
                            key={i}
                            className="p-3 bg-white border border-slate-100 shadow-sm flex gap-3 items-center"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <p className="text-sm text-slate-600 font-bold uppercase tracking-tight">
                              {rule}
                            </p>
                          </div>
                        ))}
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #dc0475; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .mask-fade-right {
          mask-image: linear-gradient(to right, black 90%, transparent 100%);
        }
        
        @media (max-width: 1024px) {
          .custom-scrollbar::-webkit-scrollbar { width: 2px; height: 2px; }
        }
      `}</style>
    </div>
  );
}

// Sub-components
function ScheduleView({
  matches,
  sports,
  lang,
  t,
}: {
  matches: Match[];
  sports: Sport[];
  lang: Lang;
  t: any;
}) {
  const [filter, setFilter] = useState<number | "all">("all");

  const filteredMatches = matches.filter(
    (m) => filter === "all" || m.sportId === filter,
  );

  const groupedByDate = useMemo(() => {
    const groups: Record<string, Match[]> = {};
    filteredMatches.forEach((m) => {
      const dateString = new Date(m.timestamp).toLocaleDateString(
        lang === "vi" ? "vi-VN" : "en-US",
        {
          weekday: "long",
          day: "numeric",
          month: "long",
        },
      );
      if (!groups[dateString]) groups[dateString] = [];
      groups[dateString].push(m);
    });
    return groups;
  }, [filteredMatches, lang]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-3 custom-scrollbar">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border
            ${
              filter === "all"
                ? "bg-primary border-primary text-white shadow-md"
                : "bg-white border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-800"
            }
          `}
        >
          {t.allEvents}
        </button>
        {sports.map((s) => (
          <button
            key={s.id}
            onClick={() => setFilter(s.id)}
            className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border
              ${
                filter === s.id
                  ? "bg-primary border-primary text-white shadow-md"
                  : "bg-white border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-800"
              }
            `}
          >
            {lang === "vi" ? s.category_vi : s.category}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-6"
        >
          {Object.keys(groupedByDate).length > 0 ? (
            (Object.entries(groupedByDate) as [string, Match[]][]).map(
              ([date, dayMatches]) => (
                <div key={date} className="relative">
                  {/* Date Header with Timeline Line */}
                  <div className="sticky top-[-12px] sm:top-[-16px] lg:top-[-24px] z-20 py-2 mb-3 flex items-center bg-background-app/95 backdrop-blur-md">
                    <div className="bg-slate-900 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-xl">
                      {date}
                    </div>
                    <div className="flex-1 h-[1px] bg-slate-200 ml-4 opacity-30" />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {dayMatches.map((match) => {
                      const matchSport = sports.find(
                        (s) => s.id === match.sportId,
                      );
                      const isWinningA =
                        match.status === "finished" &&
                        match.scoreA > match.scoreB;
                      const isWinningB =
                        match.status === "finished" &&
                        match.scoreB > match.scoreA;

                      return (
                        <div
                          key={match.id}
                          className={`relative overflow-hidden transition-all duration-300 group
                        ${
                          match.status === "live"
                            ? "bg-white ring-2 ring-primary shadow-xl z-10"
                            : "bg-white border border-slate-200 hover:border-slate-300 shadow-sm"
                        }
                        rounded-none sm:rounded-sm
                      `}
                        >
                          {/* Live Status Accent Line */}
                          {match.status === "live" && (
                            <div className="absolute top-0 left-0 w-1 sm:w-1.5 h-full bg-primary" />
                          )}

                          <div className="flex flex-col sm:grid sm:grid-cols-[112px_1fr] lg:grid-cols-[112px_1fr_200px] h-full">
                            {/* Left: Time & Dynamic Status */}
                            <div
                              className={`p-4 sm:p-6 flex flex-row sm:flex-col justify-between sm:justify-center items-center gap-2 shrink-0 border-b sm:border-b-0 sm:border-r border-dashed
                          ${match.status === "live" ? "border-primary/20 bg-primary/5" : "border-slate-100 bg-slate-50/30"}
                        `}
                            >
                              <div className="text-center">
                                <p
                                  className={`text-xl sm:text-2xl font-black font-mono tracking-tighter leading-none
                              ${match.status === "live" ? "text-primary" : "text-slate-900"}
                            `}
                                >
                                  {new Date(match.timestamp).toLocaleTimeString(
                                    [],
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: false,
                                    },
                                  )}
                                </p>
                                <div className="flex items-center justify-center gap-1 mt-1">
                                  {match.status === "live" && (
                                    <span className="w-1.2 h-1.2 bg-primary rounded-full" />
                                  )}
                                  <p
                                    className={`text-[8px] font-black uppercase tracking-widest
                                 ${match.status === "live" ? "text-primary" : "text-slate-400"}
                               `}
                                  >
                                    {match.status === "live"
                                      ? "ON AIR"
                                      : "GMT +7"}
                                  </p>
                                </div>
                              </div>

                              <div
                                className={`px-2 py-1 rounded-sm text-[8px] font-black uppercase tracking-widest border transition-colors
                            ${
                              match.status === "live"
                                ? "bg-primary text-white border-primary shadow-sm"
                                : match.status === "finished"
                                  ? "bg-slate-900 text-white border-slate-900"
                                  : "bg-white text-slate-400 border-slate-100"
                            }
                          `}
                              >
                                {match.status === "live"
                                  ? "LIVE"
                                  : match.status}
                              </div>
                            </div>

                            {/* Middle: Teams & Score */}
                            <div className="p-5 sm:p-7 grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-8 md:gap-10 relative">
                              <div className="min-w-0 text-right">
                                <h4
                                  className={`text-base sm:text-2xl font-black uppercase tracking-tighter truncate leading-none mb-1
                              text-slate-900
                              ${isWinningA || match.status === "live" ? "text-primary" : ""}
                            `}
                                >
                                  {match.teamA}
                                </h4>
                                <p
                                  className={`text-[8px] font-black uppercase tracking-[0.15em] opacity-40 text-slate-500`}
                                >
                                  {lang === "vi" ? "Sân Nhà" : "HOME"}
                                </p>
                              </div>

                              <div className="flex flex-col items-center gap-1 sm:gap-2 shrink-0 z-10">
                                <div
                                  className={`px-4 sm:px-10 py-3 sm:py-4 rounded-none flex items-center gap-3 sm:gap-6 font-mono font-black italic relative
                              ${
                                match.status === "live"
                                  ? "bg-primary text-white shadow-lg"
                                  : "bg-slate-900 text-white shadow-md"
                              }
                            `}
                                >
                                  <span
                                    className={`text-2xl sm:text-4xl ${isWinningA || match.status === "live" ? "text-white underline decoration-2" : ""}`}
                                  >
                                    {match.scoreA}
                                  </span>
                                  <span className="opacity-20 text-lg sm:text-2xl not-italic">
                                    :
                                  </span>
                                  <span
                                    className={`text-2xl sm:text-4xl ${isWinningB || match.status === "live" ? "text-white underline decoration-2" : ""}`}
                                  >
                                    {match.scoreB}
                                  </span>
                                </div>
                                {match.status === "live" && (
                                  <div className="flex items-center gap-1.5 mt-1">
                                    <span className="text-[7px] sm:text-[9px] font-black text-primary uppercase tracking-[0.3em]">
                                      {lang === "vi"
                                        ? "ĐANG THI ĐẤU"
                                        : "MATCH IN PROGRESS"}
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="min-w-0 text-left">
                                <h4
                                  className={`text-base sm:text-2xl font-black uppercase tracking-tighter truncate leading-none mb-1
                              text-slate-900
                              ${isWinningB || match.status === "live" ? "text-primary" : ""}
                            `}
                                >
                                  {match.teamB}
                                </h4>
                                <p
                                  className={`text-[8px] font-black uppercase tracking-[0.15em] opacity-40 text-slate-500`}
                                >
                                  {lang === "vi" ? "Sân Khách" : "AWAY"}
                                </p>
                              </div>
                            </div>

                            {/* Right: Info/Action (Desktop Only) */}
                            <div
                              className={`hidden lg:flex flex-col justify-center px-8 border-l border-dashed border-slate-100 w-[200px] shrink-0
                          ${match.status === "live" ? "bg-primary/5 border-primary/10" : "bg-slate-50/50 border-slate-100"}
                        `}
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <Zap
                                  size={12}
                                  className={
                                    match.status === "live"
                                      ? "text-primary"
                                      : "text-slate-300"
                                  }
                                />
                                <span
                                  className={`text-[9px] font-black uppercase tracking-[0.15em] ${match.status === "live" ? "text-primary" : "text-slate-400"}`}
                                >
                                  {match.stage}
                                </span>
                              </div>
                              <button
                                className={`text-[8px] font-black uppercase tracking-widest border py-2.5 px-5 transition-all
                             ${
                               match.status === "live"
                                 ? "bg-primary border-primary text-white hover:bg-slate-900 hover:border-slate-900"
                                 : "bg-white border-slate-200 text-slate-400 hover:border-slate-900 hover:text-slate-900"
                             }
                           `}
                              >
                                {lang === "vi" ? "CHI TIẾT" : "DETAILS"}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ),
            )
          ) : (
            <div className="p-20 text-center bg-white rounded border-2 border-dashed border-slate-100">
              <Trophy size={48} className="mx-auto text-slate-200 mb-6" />
              <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs">
                {t.noScheduled}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function StandingsView({
  medals,
  sports,
  standings,
  lang,
  t,
}: {
  medals: CountryMedal[];
  sports: Sport[];
  standings: Record<number, any[]>;
  lang: Lang;
  t: any;
}) {
  const [tab, setTab] = useState<"overall" | "sport">("overall");
  const [selectedSportId, setSelectedSportId] = useState<number>(9); // Default to football

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex border-b border-black/10 relative overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setTab("overall")}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-sm font-black uppercase tracking-widest transition-colors relative z-10 whitespace-nowrap ${tab === "overall" ? "text-primary" : "text-slate-500 hover:text-slate-800"}`}
        >
          {t.overallMedal}
          {tab === "overall" && (
            <motion.div
              layoutId="tabUnderline"
              className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
        </button>
        <button
          onClick={() => setTab("sport")}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-sm font-black uppercase tracking-widest transition-colors relative z-10 whitespace-nowrap ${tab === "sport" ? "text-primary" : "text-slate-500 hover:text-slate-800"}`}
        >
          {t.sportStandings}
          {tab === "sport" && (
            <motion.div
              layoutId="tabUnderline"
              className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "overall" ? (
            <div className="bg-white rounded-sm border-t-4 border-slate-200 overflow-x-auto custom-scrollbar shadow-sm min-h-[400px]">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 w-16">
                      {t.rank}
                    </th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {t.delegation}
                    </th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center w-20 sm:w-24">
                      {t.gold}
                    </th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center w-20 sm:w-24">
                      {t.silver}
                    </th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center w-20 sm:w-24">
                      {t.bronze}
                    </th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center w-20 sm:w-24">
                      {t.total}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {medals
                    .sort((a, b) => b.gold - a.gold)
                    .map((m, i) => (
                      <tr
                        key={m.country}
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors group"
                      >
                        <td className="p-3 sm:p-4 font-black text-slate-300 text-lg font-mono">
                          {(i + 1).toString().padStart(2, "0")}
                        </td>
                        <td className="p-3 sm:p-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-5 bg-slate-100 rounded-sm border border-slate-200 shrink-0" />
                            <span className="font-bold uppercase tracking-tight text-slate-800 text-sm sm:text-base">
                              {m.country}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 sm:p-4 text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400/20 text-yellow-600 font-bold text-xs border border-yellow-400/30 transition-transform shadow-sm">
                            {m.gold}
                          </span>
                        </td>
                        <td className="p-3 sm:p-4 text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-400/20 text-slate-500 font-bold text-xs border border-slate-400/30 transition-transform shadow-sm">
                            {m.silver}
                          </span>
                        </td>
                        <td className="p-3 sm:p-4 text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-400/20 text-orange-600 font-bold text-xs border border-orange-400/30 transition-transform shadow-sm">
                            {m.bronze}
                          </span>
                        </td>
                        <td className="p-3 sm:p-4 text-center font-bold text-slate-900 text-sm sm:text-base font-mono italic">
                          {m.gold + m.silver + m.bronze}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="space-y-4 lg:space-y-6 min-h-[400px]">
              <div className="flex gap-2 overflow-x-auto pb-2 mb-2 custom-scrollbar relative mask-fade-right">
                {sports
                  .filter((s) => standings[s.id])
                  .map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSportId(s.id)}
                      className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-sm text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors duration-200 relative z-10 ${selectedSportId === s.id ? "text-white" : "text-slate-500 hover:text-slate-800"}`}
                    >
                      {lang === "vi" ? s.category_vi : s.category}
                      {selectedSportId === s.id && (
                        <motion.div
                          layoutId="sportStandingsMarker"
                          className="absolute inset-0 bg-primary -z-10 rounded-sm"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 35,
                          }}
                        />
                      )}
                    </button>
                  ))}
              </div>

              <div className="bg-white rounded-sm border-t-4 border-slate-200 overflow-hidden shadow-sm flex flex-col">
                <div className="p-5 bg-slate-50 border-b border-slate-200 flex justify-between items-center h-16 shrink-0">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 truncate mr-4">
                    {lang === "vi"
                      ? sports.find((s) => s.id === selectedSportId)?.name_vi
                      : sports.find((s) => s.id === selectedSportId)?.name}{" "}
                    •{" "}
                    {lang === "vi"
                      ? sports.find((s) => s.id === selectedSportId)
                          ?.category_vi
                      : sports.find((s) => s.id === selectedSportId)?.category}
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                    {lang === "vi" ? "BXH Vòng bảng" : "Group Standings"}
                  </span>
                </div>
                <table className="w-full text-left border-collapse table-fixed">
                  <thead>
                    <tr className="bg-white border-b border-slate-100">
                      <th className="p-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 w-16">
                        {t.rank}
                      </th>
                      <th className="p-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                        {lang === "vi" ? "Đội / VĐV" : "Team / Player"}
                      </th>
                      <th className="p-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 text-center w-24">
                        {t.played}
                      </th>
                      <th className="p-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 text-center w-24">
                        {t.points}
                      </th>
                    </tr>
                  </thead>
                  <AnimatePresence mode="wait">
                    <motion.tbody
                      key={selectedSportId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {standings[selectedSportId]?.map((s, i) => (
                        <tr
                          key={s.team}
                          className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                        >
                          <td className="p-4 font-black text-slate-800 font-mono italic">
                            {(i + 1).toString()}
                          </td>
                          <td className="p-4 font-bold uppercase tracking-tight text-slate-700 text-sm">
                            {s.team}
                          </td>
                          <td className="p-4 text-center font-bold text-slate-500">
                            {s.played}
                          </td>
                          <td className="p-4 text-center">
                            <span className="inline-flex items-center justify-center px-3 py-1 bg-primary text-white font-black text-xs italic tracking-tighter">
                              {s.points} PTS
                            </span>
                          </td>
                        </tr>
                      ))}
                    </motion.tbody>
                  </AnimatePresence>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function AthletesView({
  athletes,
  sports,
  lang,
  t,
  searchQuery,
}: {
  athletes: Athlete[];
  sports: Sport[];
  lang: Lang;
  t: any;
  searchQuery: string;
}) {
  const [filter, setFilter] = useState<number | "all">("all");

  const filteredAthletes = athletes.filter(
    (a) =>
      (filter === "all" || a.sportId === filter) &&
      a.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar relative mask-fade-right">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors relative z-10 ${filter === "all" ? "text-white" : "text-slate-500 hover:text-slate-800"}`}
        >
          {t.allAthletes}
          {filter === "all" && (
            <motion.div
              layoutId="athleteFilterMarker"
              className="absolute inset-0 bg-primary -z-10 rounded-sm"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
        </button>
        {sports.map((s) => (
          <button
            key={s.id}
            onClick={() => setFilter(s.id)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors relative z-10 ${filter === s.id ? "text-white" : "text-slate-500 hover:text-slate-800"}`}
          >
            {lang === "vi" ? s.category_vi : s.category}
            {filter === s.id && (
              <motion.div
                layoutId="athleteFilterMarker"
                className="absolute inset-0 bg-primary -z-10 rounded-sm"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {filteredAthletes.map((athlete) => {
            const sport = sports.find((s) => s.id === athlete.sportId);
            return (
              <motion.div
                layout
                key={athlete.id}
                className="bg-white p-5 sm:p-7 rounded-sm border-t-2 border-slate-200 hover:border-primary transition-all group shadow-sm hover:shadow-xl"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-50 rounded-full mb-4 sm:mb-5 flex items-center justify-center text-slate-300 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all overflow-hidden relative">
                  {athlete.image ? (
                    <img
                      src={athlete.image}
                      alt={athlete.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <UserIcon size={24} />
                  )}
                </div>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">
                  {sport?.name} • {sport?.category}
                </p>
                <h4 className="text-xl font-extrabold uppercase tracking-tighter leading-none mb-4 group-hover:translate-x-1 transition-transform">
                  {athlete.name}
                </h4>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-4 bg-slate-100 rounded-sm border border-slate-200" />
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
                      {athlete.country}
                    </span>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-slate-300 group-hover:text-primary transition-colors"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Internal helper for special design-inspired highlights
function FeaturedSpecialStyle(sport: Sport) {
  if (sport.category === "Mixed") return "bg-[#1a1a1a] text-white border-none";
  return "";
}
