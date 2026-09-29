import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { OmniSearchModal } from './components/OmniSearchModal';
import { DetailModal } from './components/DetailModal';

// Views
import { HomeView } from './components/views/HomeView';
import { TextbookView } from './components/views/TextbookView';
import { TopicsView } from './components/views/TopicsView';
import { PersonalitiesView } from './components/views/PersonalitiesView';
import { DatesView } from './components/views/DatesView';
import { TermsView } from './components/views/TermsView';
import { TestsView } from './components/views/TestsView';
import { FavoritesView } from './components/views/FavoritesView';
import { SettingsView } from './components/views/SettingsView';

import { useAppStorage } from './hooks/useLocalStorage';
import { ItemType } from './types';
import {
  HISTORICAL_PERSONALITIES,
  HISTORICAL_DATES,
  HISTORICAL_EVENTS,
  TEXTBOOK_TERMS
} from './data';
import { HISTORICAL_IMAGES } from './assets/images';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  const [selectedEntityType, setSelectedEntityType] = useState<ItemType | undefined>(undefined);

  const [selectedParagraphId, setSelectedParagraphId] = useState<string>('p1');

  const {
    theme,
    toggleTheme,
    favorites,
    toggleFavorite,
    isFavorite,
    history,
    addToHistory,
    knownCards,
    markCardKnown,
    readParagraphs,
    toggleReadParagraph,
    isParagraphRead,
    testResults,
    addTestResult,
    appSettings,
    updateAppSettings,
    resetAllData
  } = useAppStorage();

  // Keyboard shortcut listener for search (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handler for opening any item from any view or search
  const handleSelectEntity = (id: string, type: ItemType) => {
    if (type === 'paragraph') {
      setSelectedParagraphId(id);
      setCurrentTab('textbook');
      return;
    }

    setSelectedEntityId(id);
    setSelectedEntityType(type);

    let title = id;
    let subtitle = '';

    if (type === 'personality') {
      const p = HISTORICAL_PERSONALITIES.find(x => x.id === id);
      if (p) {
        title = p.name;
        subtitle = `${p.years} · ${p.role}`;
      }
    } else if (type === 'date') {
      const d = HISTORICAL_DATES.find(x => x.id === id);
      if (d) {
        title = `${d.year} г. — ${d.eventTitle}`;
        subtitle = `${d.century} в. · ${d.region}`;
      }
    } else if (type === 'event') {
      const e = HISTORICAL_EVENTS.find(x => x.id === id);
      if (e) {
        title = e.title;
        subtitle = `${e.dateOrPeriod} · ${e.location}`;
      }
    } else if (type === 'term') {
      const t = TEXTBOOK_TERMS.find(x => x.id === id);
      if (t) {
        title = t.term;
        subtitle = t.category;
      }
    }

    addToHistory({ id, type, title, subtitle });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-950 text-stone-100 relative selection:bg-amber-600 selection:text-white">
      {/* Atmospheric Global Background Artwork with Soft Vignette */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={HISTORICAL_IMAGES.hero}
          alt=""
          className="w-full h-full object-cover object-center opacity-15 filter brightness-75 scale-105"
        />
        {/* Gradients to keep center stage readable and deep */}
        <div className="absolute inset-0 bg-radial from-transparent via-stone-950/80 to-stone-950" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/95 via-stone-950/85 to-stone-950" />
      </div>

      {/* Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Workspace: Sidebar + Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex relative z-10">
        {/* Desktop Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onNavigate={setCurrentTab}
          favoritesCount={favorites.length}
        />

        {/* View Surface */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden min-w-0">
          {currentTab === 'home' && (
            <HomeView
              onNavigate={setCurrentTab}
              onOpenSearch={() => setIsSearchOpen(true)}
              onSelectEntity={handleSelectEntity}
              recentHistory={history}
              readParagraphs={readParagraphs}
            />
          )}

          {currentTab === 'textbook' && (
            <TextbookView
              onSelectEntity={handleSelectEntity}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
              isParagraphRead={isParagraphRead}
              onToggleRead={toggleReadParagraph}
              initialParagraphId={selectedParagraphId}
            />
          )}

          {currentTab === 'topics' && (
            <TopicsView
              onSelectEntity={handleSelectEntity}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'personalities' && (
            <PersonalitiesView
              onSelectEntity={handleSelectEntity}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          )}

          {currentTab === 'dates' && (
            <DatesView
              onSelectEntity={handleSelectEntity}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          )}

          {currentTab === 'terms' && (
            <TermsView
              onSelectEntity={handleSelectEntity}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          )}

          {currentTab === 'tests' && (
            <TestsView
              onAddTestResult={addTestResult}
              knownCards={knownCards}
              onMarkCardKnown={markCardKnown}
            />
          )}

          {currentTab === 'favorites' && (
            <FavoritesView
              favorites={favorites}
              onSelectEntity={handleSelectEntity}
              onToggleFavorite={toggleFavorite}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              appSettings={appSettings}
              onUpdateSettings={updateAppSettings}
              theme={theme}
              onToggleTheme={toggleTheme}
              onResetAllData={resetAllData}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        currentTab={currentTab}
        onNavigate={setCurrentTab}
      />

      {/* Global Modals */}
      <OmniSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectEntity={handleSelectEntity}
      />

      <DetailModal
        itemId={selectedEntityId}
        itemType={selectedEntityType}
        onClose={() => setSelectedEntityId(null)}
        onSelectEntity={handleSelectEntity}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
