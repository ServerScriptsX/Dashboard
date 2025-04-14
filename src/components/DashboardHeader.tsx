
import React from 'react';
import { Bell, User, Settings, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";
import { Toggle } from "@/components/ui/toggle";

const DashboardHeader = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  
  const handleNotification = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications",
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-background border-b">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-primary">Personal Dashboard</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Toggle 
          pressed={theme === "dark"}
          onPressedChange={toggleTheme}
          aria-label="Toggle dark mode"
          className="hover:bg-secondary rounded-full p-2.5"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Toggle>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleNotification}
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          aria-label="User profile"
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
