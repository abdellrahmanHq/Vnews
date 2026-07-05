import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import SignInPage from './sign';
import axios from 'axios';
import './styles.css'; 

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function MenuBar({ onToggleSidebar }) {
  return(
    <div className='menu-icon' onClick={onToggleSidebar}>
      <i className="fas fa-bars"></i>
    </div>
  );
}

function Sidebar({ isOpen, onClose, currentUser, onLogout }) {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Navigation</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <nav className="sidebar-links">
          <Link to="/" onClick={onClose}>Home</Link>
          <Link to="/#trends" onClick={onClose}>Trends</Link>
          <Link to="/#About" onClick={onClose}>About Us</Link>
          <Link to="/#footer" onClick={onClose}>Contact Us</Link>
          
          <div className="sidebar-auth-zone" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--card-border)' }}>
            {currentUser ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '0 16px' }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  <i className="far fa-user-circle" style={{ marginRight: '8px', color: 'var(--accent-color)' }}></i>
                  {currentUser.first_name}
                </span>
                <button 
                  onClick={() => { onLogout(); onClose(); }} 
                  className="sidebar-logout-btn"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/sign" onClick={onClose} style={{ padding: '0' }}>
                <button className="sidebar-login-btn">Sign In</button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="searchbar">
      <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      <i className="fas fa-search searchicon"></i>
    </div>
  );
}

let $T = 24;

function Theme({ isDarkMode, toggleTheme }) {
  return (
    <div className='theme' onClick={toggleTheme}>
      <i className={isDarkMode ? "fas fa-sun" : "fas fa-moon"}></i> 
    </div>
  );
}

function NavBar({ isDarkMode, toggleTheme, searchQuery, setSearchQuery, onToggleSidebar, currentUser, onLogout }) {
  return (
    <nav className="navbar">
      <MenuBar onToggleSidebar={onToggleSidebar} />
      <h1>Vnews Around The World</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Theme isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>
      <div className='signin'>
        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>
              <i className="far fa-user-circle" style={{ marginRight: '6px', color: 'var(--accent-color)' }}></i>
              Hi, {currentUser.first_name}
            </span>
            <button 
              onClick={onLogout} 
              style={{ 
                background: 'rgba(239, 68, 68, 0.1)', 
                color: '#f87171', 
                border: '1px solid rgba(239, 68, 68, 0.2)',
                padding: '8px 16px',
                boxShadow: 'none'
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/sign" style={{ textDecoration: 'none' }}>
            <button style={{ cursor: 'pointer' }}>Sign In</button>
          </Link>
        )}
      </div>
      <Link to="/#trends">Trends</Link>
      <Link to="/#About">AboutUs</Link>
      <Link to="/#footer">ContactUs</Link>
    </nav>
  );
}

function Dashboard() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [activeUsers, setActiveUsers] = useState(172);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    const trafficTimer = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 7) - 3);
    }, 2500);
    return () => clearInterval(trafficTimer);
  }, []);

  return (
    <div className='dashboard-container'>
      <div className='dashboard-grid'>
        <div className='dash-card'>
          <h3><i className="fas fa-users"></i> Live Visitors</h3>
          <p className='dash-stat'>{activeUsers}</p>
        </div>
        <div className='dash-card'>
          <h3><i className="fas fa-clock"></i> Local Time</h3>
          <p className='dash-stat'>{time}</p>
        </div>
        <div className='dash-card'>
          <h3><i className="fas fa-cloud-sun"></i> Amman Weather</h3>
          <p className='dash-stat'>{ $T } ℃ </p>
        </div>
      </div>
    </div>
  );
}

function NewsSlider() {
  const breakingNews = useMemo(() => [
    { id: 0, title: "Global Assembly Addresses Climatic Strategy", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80" },
    { id: 1, title: "Next-Generation Neural Frameworks Unveiled", url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80" },
    { id: 2, title: "Offshore Wind Power Matrix Expands Generation", url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80" },
    { id: 3, title: "Orbital Vector Establishes Deep Space Array", url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80" },
    { id: 4, title: "Contemporary Heritage Museum Launches Exhibition", url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80" },
  ], []);
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentIndex((previousIndex) =>
        previousIndex === breakingNews.length - 1 ? 0 : previousIndex + 1 
      );
    }, 4000);
    return () => clearInterval(slideTimer);
  }, [breakingNews.length]);
  
  const nextslide = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex === breakingNews.length - 1 ? 0 : previousIndex + 1 
    );
  };

  const prevslid = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0 ? breakingNews.length - 1 : previousIndex - 1
    );
  };
  
  return (
    <div className='slide-container'> 
      <button className='left-btn' onClick={prevslid} aria-label='Prev'>
        <i className="fas fa-chevron-left"></i>
      </button>
      <div className="slider-wrapper">
        <div className="slider-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {breakingNews.map((news) => (
            <div className='slide' key={news.id}>               
              <img src={news.url} alt="" />
              <div className='caption'>
                <h2>{news.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className='right-btn' onClick={nextslide} aria-label='next'>
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
}

function Card({ article, currentUser, isBookmarked, onToggleBookmark, index, isSmall }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { title, content, author, image_url, url } = article;
  
  let category = "News";
  let readTime = "3 min read";
  let displayContent = content || "";

  if (content && content.includes('|')) {
    const parts = content.split('|');
    category = parts[0]?.trim() || "News";
    readTime = parts[1]?.trim() || "3 min read";
    displayContent = parts.slice(2).join('|').trim();
  }

  const cardImage = image_url || url || "https://images.unsplash.com/photo-1495020689067-958852a6565d?auto=format&fit=crop&w=800&q=80";

  useEffect(() => {
    document.body.style.overflow = isExpanded ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isExpanded]);

  return (
    <>
      <div className='card' style={{ '--delay': index, ...(isSmall && { display: 'flex', flexDirection: 'column', height: '100%' }) }}>
        <div className="card-thumb" style={isSmall ? { height: '160px', minHeight: '160px' } : {}}>
          <img src={cardImage} alt="" />
          <div className="card-thumb-overlay" />
        </div>
        <div className="card-body" style={isSmall ? { padding: '16px', display: 'flex', flexDirection: 'column', flex: '1', gap: '8px' } : {}}>
          <div className="card-meta-row" style={isSmall ? { marginBottom: '0' } : {}}>
            <span className="card-category-tag" data-cat={category.toLowerCase()} style={isSmall ? { fontSize: '11px', padding: '3px 8px' } : {}}>{category}</span>
            <span className="card-read-time" style={isSmall ? { fontSize: '11px' } : {}}><i className="far fa-clock"></i> {readTime}</span>
          </div>
          <h2 style={isSmall ? { fontSize: '1.2rem', lineHeight: '1.3', margin: '4px 0', WebkitLineClamp: '2', display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' } : {}}>{title}</h2>
          {author && <span className="card-author-tag" style={isSmall ? { fontSize: '11px', marginBottom: '4px' } : {}}>By {author}</span>}
          <p style={isSmall ? { fontSize: '0.92rem', lineHeight: '1.5', WebkitLineClamp: '2', display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: '0' } : {}}>{displayContent}</p>
          <div className="card-footer" style={isSmall ? { marginTop: 'auto', paddingTop: '8px' } : {}}>
            <button className="card-btn" onClick={() => setIsExpanded(true)} style={isSmall ? { padding: '8px 14px', fontSize: '13px' } : {}}>
              <span>Read More</span>
            </button>
            {currentUser && (
              <button 
                onClick={() => onToggleBookmark(article)}
                className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
                aria-label="Bookmark article"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-md)',
                  padding: isSmall ? '8px 12px' : '10px 14px',
                  cursor: 'pointer',
                  color: isBookmarked ? 'var(--accent)' : 'var(--text-muted)',
                  transition: 'all 0.24s ease'
                }}
              >
                <i className={`${isBookmarked ? 'fas' : 'far'} fa-bookmark`}></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="article-modal-overlay" onClick={() => setIsExpanded(false)}>
          <div className="article-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={() => setIsExpanded(false)}>
              <i className="fas fa-times"></i>
            </button>
            <div className="modal-body-scroller">
              <div className="modal-header-meta">
                <span className="card-category-tag" data-cat={category.toLowerCase()}>{category}</span>
                <span className="card-read-time"><i className="far fa-clock"></i> {readTime}</span>
              </div>
              <h2 className="modal-article-title">{title}</h2>
              {author && <div className="modal-article-author">By {author}</div>}
              <div className="modal-article-content">
                <img src={cardImage} alt="" className="modal-float-image" />
                <p>{displayContent}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function BookmarksSection({ currentUser, bookmarks, onToggleBookmark }) {
  if (!currentUser) return null;

  return (
    <div className="bookmarks-section" style={{ padding: '0 40px', marginTop: '40px' }}>
      <div className="bookmarks-header" style={{ marginBottom: '24px' }}>
        <h2><i className="fas fa-bookmark" style={{ color: 'var(--accent-color)', marginRight: '10px' }}></i> Your Saved Stories ({bookmarks.length})</h2>
      </div>
      {bookmarks.length === 0 ? (
        <div className="bookmarks-empty" style={{ padding: '30px', textAlign: 'center', background: 'var(--card-bg)', borderRadius: '16px', border: '1px dashed var(--card-border)' }}>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Click the bookmark icon on any article card below to save it here.</p>
        </div>
      ) : (
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
          {bookmarks.map((article, index) => (
            <Card 
              key={`bookmark-${article.id}`} 
              article={article}
              currentUser={currentUser}
              isBookmarked={true}
              onToggleBookmark={onToggleBookmark}
              index={index} 
              isSmall={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CardsGrid({ searchQuery, currentUser, bookmarks, onToggleBookmark, onLoadingChange }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true);
    onLoadingChange(true);
    axios.get(`http://localhost:3001/articles?search=${searchQuery}&page=${currentPage}`)
      .then(response => {
        setArticles(response.data.data || []);
        setTotalPages(response.data.meta?.total_pages || 1);
        setLoading(false);
        onLoadingChange(false);
      })
      .catch(error => {
        console.error("Error fetching articles:", error);
        setLoading(false);
        onLoadingChange(false);
      });
  }, [searchQuery, currentPage, onLoadingChange]);

  useEffect(() => {
    if (!loading && articles.length > 0 && currentPage > 1) {
      const anchor = document.querySelector('.card-container');
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [currentPage, loading, articles]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#888' }}>Loading live stories...</div>;
  }

  return (
    <div className='card-container'>
      <div className="grid">
        {articles.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#888' }}>No articles match your search.</p>
        ) : (
          articles.map((article, index) => {
            const isBookmarked = bookmarks.some(b => b.id === article.id);
            return (
              <Card 
                key={article.id} 
                article={article}
                currentUser={currentUser}
                isBookmarked={isBookmarked}
                onToggleBookmark={onToggleBookmark}
                index={index} 
              />
            );
          })
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-wrapper">
          <button 
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
            aria-label="First page"
          >
            <i className="fas fa-angle-double-left"></i>
          </button>

          <button 
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            aria-label="Previous page"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>

          <button 
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            aria-label="Next page"
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          <button 
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
            aria-label="Last page"
          >
            <i className="fas fa-angle-double-right"></i>
          </button>
        </div>
      )}
    </div>
  );
}

function About() {
  return (
    <div className='aboutus' id='About'> 
      <h2>What We Do</h2> 
      <p className="about-subtitle">Delivering real-time breaking news, global insights, and verified stories.</p> 
      <div className='about-grid'> 
        <div className='about-card'> 
          <div className="about-icon"><i className="fas fa-bolt"></i></div>
          <h3>Breaking Coverage</h3>
          <p>Deploying immediate live feeds, automated traffic alerts, and flash updates as critical events unfold globally.</p>
        </div> 
        <div className='about-card'> 
          <div className="about-icon"><i className="fas fa-chart-line"></i></div>
          <h3>Market Analytics</h3>
          <p>Tracking tech stocks, market trends, and clean energy breakthroughs with data-driven daily visual summaries.</p>
        </div> 
        <div className='about-card'> 
          <div className="about-icon"><i className="fas fa-globe-americas"></i></div>
          <h3>Global Dispatch</h3>
          <p>Connecting regional weather alerts, scientific discoveries, and sports achievements under a unified network.</p>
        </div> 
        <div className='about-card'> 
          <div className="about-icon"><i className="fas fa-user-shield"></i></div>
          <h3>Verified Journalism</h3>
          <p>Filtering out digital noise to prioritize deep investigative reports, source vetting, and objective analysis.</p>
        </div> 
      </div> 
    </div>
  );
}

function Trend() {
  const trends = [
    { id: 1, tag: "#NextGenSolar", category: "Energy", volume: "142.5K shares", velocity: "+88%", icon: "fa-solar-panel" },
    { id: 2, tag: "#AIStockSurge", category: "Finance", volume: "98.1K shares", velocity: "+64%", icon: "fa-chart-line" },
    { id: 3, tag: "#MarsTouchdown", category: "Space", volume: "244.0K shares", velocity: "+120%", icon: "fa-rocket" },
    { id: 4, tag: "#AmmanSummit", category: "Politics", volume: "56.3K shares", velocity: "+35%", icon: "fa-landmark" }
  ];
  return (
    <div className='trends' id='trends'>
      <div className='trends-header'>
        <h2>Trends</h2>
      </div>
      <div className='trends-grid'>
        {trends.map((trend) => (
          <div className='trend-card' key={trend.id}>
            <div className='trend-top'>
              <span className='trend-category'>{trend.category}</span>
              <span className='trend-velocity'><i className="fas fa-arrow-up"></i> {trend.velocity}</span>
            </div>
            <h3 className="trend-tag">
              <i className={`fas ${trend.icon} trend-icon`}></i> {trend.tag}
            </h3>
            <div className="trend-bottom">
              <span className="trend-volume">{trend.volume}</span>
              <button className="trend-join-btn" aria-label="Explore topic">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer({ currentUser }) {
  return (
    <div className='footer' id='footer'>
      <div className='company-description'>
        <div className='logo'><img src="images/logo.png" alt="" /></div>
        <div className='description'><p>delivering real-time breaking news, global headlines, and in-depth stories as they unfold.</p></div>
      </div>
      <div className='quick_links'>
        <h3>Links</h3>
        <ul>
          <li><Link to="/">Home</Link></li>
          {!currentUser && <li><Link to="/sign">Sign In</Link></li>}
          <li><Link to="/#trends">Trends</Link></li>
          <li><Link to="/#About">About Us</Link></li>
        </ul>
      </div>
      <div className='Contact'>
        <h3>Contact Us</h3>
        <ul>
          <li>
            <i className="fas fa-phone-alt"></i>
            <span>0772647298</span>
          </li>
          <li>
            <i className="fas fa-envelope"></i>
            <span>hanaqtahabdellrahman@gmail.com</span>
          </li>
          <li>
            <i className="fas fa-map-marker-alt"></i>
            <span>Location</span>
          </li>
        </ul>
      </div>
      <div className='bottom-footer'>
        <div className='copyright' >
          <h4>© 2026 Vertex Solutions. All rights reserved.</h4>
        </div>
        <div className='social-media'>
          <a href=""><i className="fab fa-linkedin-in"></i></a>
          <a href=""><i className="fab fa-facebook-f"></i></a>
          <a href=""><i className="fab fa-instagram"></i></a>
          <a href=""><i className="fab fa-whatsapp"></i></a>
        </div>
      </div>
    </div>
  );
}

function MainContent({ searchQuery, currentUser, bookmarks, onToggleBookmark }) {
  const [isGridLoading, setIsGridLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (!isGridLoading && location.hash) {
      const targetId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isGridLoading, location.hash, location.pathname]);

  return (
    <>
      <Dashboard />
      <NewsSlider />
      <BookmarksSection 
        currentUser={currentUser} 
        bookmarks={bookmarks} 
        onToggleBookmark={onToggleBookmark} 
      />
      <CardsGrid 
        searchQuery={searchQuery}
        currentUser={currentUser}
        bookmarks={bookmarks}
        onToggleBookmark={onToggleBookmark}
        onLoadingChange={setIsGridLoading}
      />
      <Trend />
      <About />
    </>
  );
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    document.title = "Vnews";
  }, []);

  const syncUserSession = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      setCurrentUser(userObj);
      const savedBookmarks = localStorage.getItem(`bookmarks_${userObj.id}`);
      setBookmarks(savedBookmarks ? JSON.parse(savedBookmarks) : []);
    } else {
      setCurrentUser(null);
      setBookmarks([]);
    }
  };

  useEffect(() => {
    syncUserSession();
    window.addEventListener("storage_sync", syncUserSession);
    return () => window.removeEventListener("storage_sync", syncUserSession);
  }, []);

  const handleToggleBookmark = (article) => {
    if (!currentUser) return;
    
    let updatedBookmarks;
    const exists = bookmarks.some(b => b.id === article.id);
    
    if (exists) {
      updatedBookmarks = bookmarks.filter(b => b.id !== article.id);
    } else {
      updatedBookmarks = [...bookmarks, article];
    }
    
    setBookmarks(updatedBookmarks);
    localStorage.setItem(`bookmarks_${currentUser.id}`, JSON.stringify(updatedBookmarks));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setBookmarks([]);
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className={`app-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        <NavBar 
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          onToggleSidebar={() => setIsSidebarOpen(true)} 
          currentUser={currentUser}
          onLogout={handleLogout}
        />
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          currentUser={currentUser}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path='/' element={
            <MainContent 
              searchQuery={searchQuery} 
              currentUser={currentUser}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
            />
          } />
          <Route path='/sign' element={<SignInPage />} />
        </Routes>
        <Footer currentUser={currentUser} />
      </div>
    </BrowserRouter>
  );
}