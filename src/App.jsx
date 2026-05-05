import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CategoryBar from './components/CategoryBar';
import VideoGrid from './components/VideoGrid';
import VideoModal from './components/VideoModal';

function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="app-container">
      <Navbar onMenuClick={toggleSidebar} onSearch={handleSearch} />
      <div className="main-content">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="content-area">
          <CategoryBar onSortChange={setSortBy} currentSort={sortBy} />
          <VideoGrid 
            onVideoClick={handleVideoClick} 
            searchQuery={searchQuery}
            sortBy={sortBy}
          />
        </main>
      </div>
      
      {selectedVideo && (
        <VideoModal 
          video={selectedVideo} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

export default App;
