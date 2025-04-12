
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ExternalLink, Plus, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface Bookmark {
  id: string;
  title: string;
  url: string;
}

const BookmarksWidget = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
    { id: '1', title: 'Google', url: 'https://google.com' },
    { id: '2', title: 'Gmail', url: 'https://mail.google.com' },
    { id: '3', title: 'GitHub', url: 'https://github.com' },
    { id: '4', title: 'YouTube', url: 'https://youtube.com' },
  ]);
  const [newBookmark, setNewBookmark] = useState({ title: '', url: '' });
  const [open, setOpen] = useState(false);

  const addBookmark = () => {
    if (newBookmark.title && newBookmark.url) {
      // Add http if not present
      let url = newBookmark.url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      
      setBookmarks([...bookmarks, { id: Date.now().toString(), title: newBookmark.title, url }]);
      setNewBookmark({ title: '', url: '' });
      setOpen(false);
    }
  };

  const deleteBookmark = (id: string) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
  };

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <span>Bookmarks</span>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="h-7">
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Bookmark</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Google"
                    value={newBookmark.title}
                    onChange={(e) => setNewBookmark({ ...newBookmark, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    placeholder="https://google.com"
                    value={newBookmark.url}
                    onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={addBookmark}>Add Bookmark</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {bookmarks.map(bookmark => (
            <div 
              key={bookmark.id} 
              className="flex items-center justify-between p-2 border rounded-md hover:bg-secondary"
            >
              <a 
                href={bookmark.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center flex-1 truncate"
              >
                <ExternalLink className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                <span className="truncate">{bookmark.title}</span>
              </a>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.preventDefault();
                  deleteBookmark(bookmark.id);
                }}
              >
                <Trash className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookmarksWidget;
