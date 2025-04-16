
import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Loader } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "@/components/ui/use-toast";

// API key for OpenWeatherMap (free tier)
const API_KEY = "1b2f28c6ea1c580bb12fce3d2a6ccf39"; // This is a free API key for demo purposes

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("Nilambur,Kerala,IN");
  
  // Function to determine which weather icon to show
  const getWeatherIcon = (weatherCode) => {
    // Weather condition codes from OpenWeatherMap API
    // https://openweathermap.org/weather-conditions
    if (weatherCode >= 200 && weatherCode < 300) return CloudRain; // Thunderstorm
    if (weatherCode >= 300 && weatherCode < 500) return CloudRain; // Drizzle
    if (weatherCode >= 500 && weatherCode < 600) return CloudRain; // Rain
    if (weatherCode >= 600 && weatherCode < 700) return CloudSnow; // Snow
    if (weatherCode >= 700 && weatherCode < 800) return Wind; // Atmosphere (fog, mist, etc)
    if (weatherCode === 800) return Sun; // Clear sky
    if (weatherCode > 800) return Cloud; // Clouds
    return Sun; // Default
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Weather data:", data);
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        toast({
          title: "Weather Update Failed",
          description: "Could not fetch the latest weather data. Using default values.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchWeatherData();
    
    // Refresh weather data every 30 minutes
    const interval = setInterval(fetchWeatherData, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [location]);

  // If still loading, show a loading indicator
  if (loading) {
    return (
      <Card className="dashboard-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-6">
            <Loader className="h-8 w-8 text-muted-foreground animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // If we have weather data, display it
  if (weatherData) {
    const WeatherIcon = getWeatherIcon(weatherData.weather[0].id);
    const temp = Math.round(weatherData.main.temp);
    const description = weatherData.weather[0].description;
    const cityName = weatherData.name;
    const country = weatherData.sys.country;
    
    return (
      <Card className="dashboard-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-3xl font-bold">{temp}°C</span>
              <span className="text-muted-foreground capitalize">{description}</span>
              <span className="text-sm text-muted-foreground">{cityName}, {country}</span>
            </div>
            <WeatherIcon className="h-12 w-12 text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Fallback with default data if API call failed
  const DefaultWeatherIcon = Sun;
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-3xl font-bold">22°C</span>
            <span className="text-muted-foreground">Sunny (Default)</span>
            <span className="text-sm text-muted-foreground">Nilambur, Kerala, India</span>
          </div>
          <DefaultWeatherIcon className="h-12 w-12 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
