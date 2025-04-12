
import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const weatherTypes = [
  { type: 'sunny', icon: Sun, temp: '72°F', description: 'Sunny' },
  { type: 'cloudy', icon: Cloud, temp: '65°F', description: 'Partly Cloudy' },
  { type: 'rainy', icon: CloudRain, temp: '58°F', description: 'Light Rain' },
  { type: 'snowy', icon: CloudSnow, temp: '34°F', description: 'Light Snow' },
  { type: 'windy', icon: Wind, temp: '61°F', description: 'Windy' }
];

const WeatherWidget = () => {
  const [weather, setWeather] = useState(weatherTypes[0]);
  
  // In a real app, we would fetch actual weather data here
  useEffect(() => {
    // Simulating changing weather for demo purposes
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * weatherTypes.length);
      setWeather(weatherTypes[randomIndex]);
    }, 60000); // Change weather every minute
    
    return () => clearInterval(interval);
  }, []);

  const WeatherIcon = weather.icon;

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-3xl font-bold">{weather.temp}</span>
            <span className="text-muted-foreground">{weather.description}</span>
            <span className="text-sm text-muted-foreground">Nilambur, Kerala, India</span>
          </div>
          <WeatherIcon className="h-12 w-12 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
