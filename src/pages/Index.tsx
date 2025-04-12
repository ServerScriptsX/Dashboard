
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import WeatherWidget from '@/components/WeatherWidget';
import TodoWidget from '@/components/TodoWidget';
import NotesWidget from '@/components/NotesWidget';
import CalendarWidget from '@/components/CalendarWidget';
import BookmarksWidget from '@/components/BookmarksWidget';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardHeader />
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <NotesWidget />
          </div>
          <div>
            <CalendarWidget />
          </div>
          <div>
            <WeatherWidget />
          </div>
          <div>
            <TodoWidget />
          </div>
          <div className="lg:col-span-1">
            <BookmarksWidget />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
