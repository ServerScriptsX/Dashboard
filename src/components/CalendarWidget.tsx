
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

const CalendarWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedDate = format(currentTime, 'EEEE, MMMM do, yyyy');
  const formattedTime = format(currentTime, 'h:mm:ss a');

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Date & Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1">
          <span className="text-3xl font-bold">{formattedTime}</span>
          <span className="text-muted-foreground">{formattedDate}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarWidget;
