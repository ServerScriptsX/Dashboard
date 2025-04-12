
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const NotesWidget = () => {
  const { toast } = useToast();
  const [note, setNote] = useState("Welcome to your personal dashboard! Use this space to jot down quick notes, ideas, or reminders throughout your day.");
  const [savedNote, setSavedNote] = useState(note);

  const handleSave = () => {
    setSavedNote(note);
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully.",
    });
  };

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex justify-between items-center">
          <span>Quick Notes</span>
          <Button 
            size="sm" 
            variant="outline" 
            className="h-7"
            onClick={handleSave}
            disabled={note === savedNote}
          >
            <Save className="h-3.5 w-3.5 mr-1" />
            Save
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="min-h-[120px] resize-none"
          placeholder="Type your notes here..."
        />
      </CardContent>
    </Card>
  );
};

export default NotesWidget;
