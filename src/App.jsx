import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import SignInPage from './sign';
import './styles.css';


const WORLD_NEWS = [
  {
    id: 1,
    title: "Iran mourns supreme leader as US nuclear talks set to resume",
    content: `World | 5 min read | Iran has held days of state mourning for supreme leader Ayatollah Ali Khamenei, whose death has reshaped the region and paused delicate negotiations between Tehran and Washington. Talks mediated by Qatar and Pakistan are expected to resume, covering Iran's nuclear program, sanctions relief and the future of the Strait of Hormuz, though officials on both sides caution that major sticking points remain and a fragile truce has repeatedly come under strain.`,
    author: "Vnews World Desk",
    image_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Jordan's historic first World Cup ends with heads held high",
    content: `Sports | 4 min read | Jordan's first-ever appearance at a FIFA World Cup ended in the group stage, but not before the debutants wrote themselves into the record books. Ali Olwan struck the nation's first-ever World Cup goal against Austria, while Mousa Al-Tamari and Nizar Al-Rashdan also found the net across three narrow defeats to Austria, Algeria and eventual group winners Argentina. Drawn into a brutal Group J, Al-Nashama bowed out with pride and a foundation to build on.`,
    author: "Vnews Sports Desk",
    image_url: "https://images.unsplash.com/photo-1656530888466-4fb42a15be2c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Record-shattering heat wave grips the US over the July 4th weekend",
    content: `Climate | 4 min read | A sprawling heat dome has trapped much of the eastern United States under dangerous temperatures over the Independence Day weekend, with forecasters warning it could be the hottest Fourth of July on record for millions. More than 185 million people were under heat alerts as cities from the Midwest to the East Coast braced for hundreds of broken records, and unusually warm overnight lows offered little relief.`,
    author: "Vnews Science Desk",
    image_url: "https://images.unsplash.com/photo-1582236479237-f2360f0814f6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Royal Jordanian opens first direct Amman-Tashkent route",
    content: `Business | 3 min read | Royal Jordanian has launched its first direct service between Amman and Tashkent, opening a new air corridor between the Levant and Central Asia. Flying twice weekly with fuel-efficient Embraer jets from Queen Alia International Airport, the route cuts a previously one-stop journey to under five hours and is designed to draw cultural and business travelers while strengthening Amman's position as a regional transit hub.`,
    author: "Vnews Amman Bureau",
    image_url: "https://images.unsplash.com/photo-1752901441555-e83cbbad97a4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Oceans hit hottest levels ever recorded, alarming scientists",
    content: `Science | 4 min read | Global sea-surface temperatures climbed to their highest level ever recorded for the time of year in late June, according to European climate monitors, surpassing marks set in 2023 and 2024. Scientists link the spike to a developing El Nino layered on top of long-term, human-driven warming, and warn that persistently hot oceans can fuel heavier rainfall, stronger marine heatwaves and accelerating sea-level rise.`,
    author: "Vnews Science Desk",
    image_url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Aqaba's deep-sea microbes could help defeat superbugs",
    content: `Health | 5 min read | Researchers in Jordan say microorganisms drawn from the deep waters of the Gulf of Aqaba can produce natural compounds that kill antibiotic-resistant bacteria, a promising lead in the global fight against drug-resistant superbugs. The findings point to the Red Sea's unique marine ecosystem as a potential source for the next generation of antibiotics, one of medicine's most urgent challenges.`,
    author: "Vnews Health Desk",
    image_url: "https://images.unsplash.com/photo-1708649290066-5f617003b93f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "Mount Etna erupts, lighting up the Sicilian night",
    content: `World | 3 min read | Europe's most active volcano, Mount Etna, has erupted again, sending rivers of bright orange lava down its flanks and drawing crowds of onlookers to Sicily's slopes. Authorities monitored ash plumes for any impact on nearby air travel while volcanologists tracked the flows, a vivid reminder of the restless geology beneath the Mediterranean island.`,
    author: "Vnews World Desk",
    image_url: "https://images.unsplash.com/photo-1720709734276-cd14a216bcad?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    title: "Push to revive the historic Hejaz Railway gathers pace",
    content: `Business | 4 min read | Officials from Turkey and Saudi Arabia have signed agreements aimed at reviving the century-old Hejaz Railway, the line that once carried pilgrims and now anchors ambitions to reconnect Turkey to the Gulf through Syria, Jordan and Saudi Arabia. Backers say a modern rail link could reshape trade and travel across the region, with Jordan sitting at a strategic crossroads of the route.`,
    author: "Vnews Amman Bureau",
    image_url: "https://images.unsplash.com/photo-1681663112883-f6138ca162c1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    title: "Anthropic restores global access to its most powerful AI models",
    content: `Tech | 3 min read | Anthropic has restored worldwide access to its most capable AI systems after the US Department of Commerce lifted export restrictions that had briefly blocked them. The controls, imposed and then rescinded within weeks, had temporarily limited availability of the company's newest frontier models, and the reversal lets developers and organizations resume using the systems for research and product work.`,
    author: "Vnews Tech Desk",
    image_url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    title: "India's Modi visits Amman to deepen economic ties",
    content: `Politics | 3 min read | Indian Prime Minister Narendra Modi wrapped up a two-day visit to Jordan focused on investment and economic cooperation, as Amman courts new partners to accelerate growth. Talks centered on trade, technology and regional stability, underscoring Jordan's push to broaden its diplomatic and commercial relationships beyond its immediate neighborhood.`,
    author: "Vnews Amman Bureau",
    image_url: "https://images.unsplash.com/photo-1548138012-401d2cc42861?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    title: "World Cup battles extreme heat as WHO teams up with FIFA",
    content: `Sports | 3 min read | With the expanded 2026 World Cup unfolding across North America during a punishing summer, football's governing body has partnered with the World Health Organization to protect players, staff and fans from extreme heat. Cooling breaks, hydration measures and adjusted scheduling are among the steps as several host cities endure record-setting temperatures.`,
    author: "Vnews Sports Desk",
    image_url: "https://images.unsplash.com/photo-1656530888466-4fb42a15be2c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    title: "Jordan positions itself as a hub for Syria's reconstruction",
    content: `Region | 4 min read | As its northern neighbor begins the long task of rebuilding, Jordan is positioning itself as a logistics gateway and diplomatic broker for Syria's reconstruction. Officials in Amman see opportunity in cross-border trade, transport and investment, betting that the kingdom's location and relative stability can place it at the center of the region's recovery.`,
    author: "Vnews Amman Bureau",
    image_url: "https://images.unsplash.com/photo-1568235222044-f87c49f85ff2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 13,
    title: "Russia launches massive overnight missile barrage on Kyiv",
    content: `World | 4 min read | Russia unleashed one of its largest aerial assaults on Kyiv in weeks, striking the Ukrainian capital overnight with a mix of ballistic and cruise missiles and drones. Explosions echoed for hours as residents sheltered in subway stations, several people were killed, and emergency crews searched damaged apartment buildings at daybreak.`,
    author: "Vnews World Desk",
    image_url: "https://images.unsplash.com/photo-1495020689067-958852a6565d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 14,
    title: "Amman's water breakthroughs ease a chronic crisis",
    content: `Environment | 5 min read | Jordan, one of the most water-scarce countries on earth, is reporting hard-won progress in easing Amman's chronic shortages after a series of infrastructure and conservation breakthroughs. Officials point to new supply projects and efficiency gains as a turning point, even as a fast-growing population and a warming climate keep water security at the top of the national agenda.`,
    author: "Vnews Amman Bureau",
    image_url: "https://images.unsplash.com/photo-1509390874189-d75fd22f19f7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 15,
    title: "Trump reports more than $1 billion from crypto ventures",
    content: `Finance | 4 min read | A sweeping financial disclosure shows US President Donald Trump reported well over a billion dollars in income last year, much of it tied to cryptocurrency ventures. The filing has intensified scrutiny of the president's expanding business interests and the potential conflicts they pose while he holds office.`,
    author: "Vnews Business Desk",
    image_url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
  },
];

const BREAKING = [
  { id: 0, title: "Iran mourns supreme leader as US and Iran return to nuclear talks", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80" },
  { id: 1, title: "Mount Etna erupts, sending lava down the Sicilian night", url: "https://images.unsplash.com/photo-1720709734276-cd14a216bcad?auto=format&fit=crop&w=1200&q=80" },
  { id: 2, title: "Jordan makes history in its first-ever World Cup", url: "https://images.unsplash.com/photo-1656530888466-4fb42a15be2c?auto=format&fit=crop&w=1200&q=80" },
  { id: 3, title: "Oceans reach the hottest levels ever recorded", url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80" },
  { id: 4, title: "Royal Jordanian links Amman to the Silk Road", url: "https://images.unsplash.com/photo-1752901441555-e83cbbad97a4?auto=format&fit=crop&w=1200&q=80" },
];

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
      <h1>Vnews Around the World</h1>
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
  const breakingNews = BREAKING;

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

function Card({ article, currentUser, isBookmarked, onToggleBookmark, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { title, content, author, image_url, url, id } = article;
  
  let category = "News";
  let readTime = "3 min read";
  let displayContent = content || "";

  if (content && content.includes('|')) {
    const parts = content.split('|');
    category = parts[0]?.trim() || "News";
    readTime = parts[1]?.trim() || "3 min read";
    displayContent = parts.slice(2).join('|').trim();
  }

  const cardImage = useMemo(() => {
    if (image_url) return image_url;
    if (url) return url;

    const lowerTitle = (title || "").toLowerCase();
    const lowerCategory = category.toLowerCase();

    if (lowerTitle.includes("amman") || lowerTitle.includes("conference")) {
      return "https://images.unsplash.com/photo-1548138012-401d2cc42861?auto=format&fit=crop&w=800&q=80";
    }
    if (lowerTitle.includes("jerash") || lowerTitle.includes("festival")) {
      return "https://images.unsplash.com/photo-1626244674751-64bb4b553655?auto=format&fit=crop&w=800&q=80";
    }
    if (lowerTitle.includes("aqaba") || lowerTitle.includes("port")) {
      return "https://images.unsplash.com/photo-1568235222044-f87c49f85ff2?auto=format&fit=crop&w=800&q=80";
    }
    if (lowerTitle.includes("rum") || lowerTitle.includes("wadirum")) {
      return "https://images.unsplash.com/photo-1582236479237-f2360f0814f6?auto=format&fit=crop&w=800&q=80";
    }
    if (lowerTitle.includes("petra") || lowerTitle.includes("night")) {
      return "https://images.unsplash.com/photo-1585551016625-a13740992cfa?auto=format&fit=crop&w=800&q=80";
    }
    if (lowerTitle.includes("wind") || lowerTitle.includes("solar") || lowerCategory.includes("energy")) {
      return "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80";
    }
    if (lowerTitle.includes("neural") || lowerTitle.includes("ai") || lowerCategory.includes("tech")) {
      return "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80";
    }
    if (lowerTitle.includes("space") || lowerTitle.includes("mars") || lowerCategory.includes("space")) {
      return "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80";
    }
    if (lowerTitle.includes("economic") || lowerTitle.includes("stock") || lowerCategory.includes("finance")) {
      return "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80";
    }
    if (lowerTitle.includes("museum") || lowerTitle.includes("art")) {
      return "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80";
    }

    const imagePool = [
      "https://images.unsplash.com/photo-1495020689067-958852a6565d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584515901107-9979657b6873?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1444653389962-8149286c578a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80"
    ];

    const stableId = id ? parseInt(id, 10) : 0;
    const targetIndex = (stableId || index) % imagePool.length;
    return imagePool[targetIndex];
  }, [image_url, url, title, category, index, id]);

  useEffect(() => {
    document.body.style.overflow = isExpanded ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isExpanded]);

  return (
    <>
      <div className='card' style={{ '--delay': index }}>
        <div className="card-thumb">
          <img src={cardImage} alt="" />
          <div className="card-thumb-overlay" />
        </div>
        <div className="card-body">
          <div className="card-meta-row">
            <span className="card-category-tag" data-cat={category.toLowerCase()}>{category}</span>
            <span className="card-read-time"><i className="far fa-clock"></i> {readTime}</span>
          </div>
          <h2>{title}</h2>
          {author && <span className="card-author-tag">By {author}</span>}
          <p>{displayContent}</p>
          <div className="card-footer">
            <button className="card-btn" onClick={() => setIsExpanded(true)}>
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
                  padding: '10px 14px',
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
    <div className="bookmarks-section">
      <div className="bookmarks-header">
        <h2><i className="fas fa-bookmark"></i> Your Saved Stories ({bookmarks.length})</h2>
      </div>
      {bookmarks.length === 0 ? (
        <div className="bookmarks-empty">
          <p>Click the bookmark icon on any article card below to save it here.</p>
        </div>
      ) : (
        <div className="bookmarks-mini-grid">
          {bookmarks.map((article) => {
            let category = "News";
            let displayContent = article.content || "";
            if (article.content && article.content.includes('|')) {
              const parts = article.content.split('|');
              category = parts[0]?.trim() || "News";
              displayContent = parts.slice(2).join('|').trim();
            }
            return (
              <div key={article.id} className="bookmark-mini-card">
                <div>
                  <span className="mini-card-tag">{category}</span>
                  <h3>{article.title}</h3>
                  <p>{displayContent.substring(0, 80)}...</p>
                </div>
                <button onClick={() => onToggleBookmark(article)} className="mini-card-remove">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const ARTICLES_PER_PAGE = 6;

function CardsGrid({ searchQuery, currentUser, bookmarks, onToggleBookmark, onLoadingChange }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Client-side search across the curated news set (title, body, author).
  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return WORLD_NEWS;
    return WORLD_NEWS.filter((a) =>
      (a.title || '').toLowerCase().includes(q) ||
      (a.content || '').toLowerCase().includes(q) ||
      (a.author || '').toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE));

  // Reset to first page whenever the search term changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Keep the current page valid if the result set shrinks.
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  // Data is local, so there's no loading state. Tell the parent so the
  // About/Trends hash-scrolling still fires correctly.
  useEffect(() => {
    onLoadingChange(false);
  }, [onLoadingChange]);

  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const pageArticles = filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  // Smoothly scroll back up to the grid when paging.
  useEffect(() => {
    if (currentPage > 1) {
      const anchor = document.querySelector('.card-container');
      if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  return (
    <div className='card-container'>
      <div className="grid">
        {pageArticles.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#888' }}>No articles match your search.</p>
        ) : (
          pageArticles.map((article, index) => {
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
    { id: 1, tag: "#JordanWorldCup", category: "Sports", volume: "212.4K shares", velocity: "+104%", icon: "fa-futbol" },
    { id: 2, tag: "#HeatDome", category: "Climate", volume: "168.9K shares", velocity: "+77%", icon: "fa-temperature-high" },
    { id: 3, tag: "#EtnaEruption", category: "World", volume: "134.2K shares", velocity: "+61%", icon: "fa-mountain" },
    { id: 4, tag: "#AqabaSuperbugs", category: "Health", volume: "58.7K shares", velocity: "+42%", icon: "fa-flask" }
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

function Footer() {
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
          <li><Link to="/sign">Sign In</Link></li>
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
      <BookmarksSection 
        currentUser={currentUser} 
        bookmarks={bookmarks} 
        onToggleBookmark={onToggleBookmark} 
      />
      <NewsSlider />
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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

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
        <Footer />
      </div>
    </BrowserRouter>
  );
}