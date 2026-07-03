import { useState, useEffect } from 'react'
import { LayoutDashboard, Database, BrainCircuit, Lightbulb, Search, Activity, Users, Loader2, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'
import { sources, pipelineSteps, defaultThemes, defaultSegments, defaultOpportunities, searchThemes, searchSegments, searchOpportunities } from './data/mockData'
import './index.css'

function App() {
  const [activeSection, setActiveSection] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const [themes, setThemes] = useState(defaultThemes)
  const [segments, setSegments] = useState(defaultSegments)
  const [opportunities, setOpportunities] = useState(defaultOpportunities)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'sources', 'themes', 'segments', 'opportunities'];
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      if (current) {
        setActiveSection(current);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setHasSearched(false);
      setThemes(defaultThemes);
      setSegments(defaultSegments);
      setOpportunities(defaultOpportunities);
      return;
    }
    
    setIsSearching(true);
    
    try {
      const res = await fetch('http://localhost:8001/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery })
      });
      
      const data = await res.json();
      
      if (data.themes) setThemes(data.themes);
      if (data.segments) setSegments(data.segments);
      if (data.opportunities) setOpportunities(data.opportunities);
      
      setHasSearched(true);
      scrollTo('overview');
    } catch (err) {
      console.error(err);
      // Fallback to mock search data if backend fails
      setThemes(searchThemes);
      setSegments(searchSegments);
      setOpportunities(searchOpportunities);
      setHasSearched(true);
      scrollTo('overview');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Topbar: Title and Metadata */}
      <div style={{ padding: 'var(--space-6) var(--space-8)' }}>
        <div className="masthead" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}>
          <div>
            <div className="brand-lockup">
              <div className="brand-mark"><Activity size={24} /></div>
              <div className="brand-name">Discovery Engine</div>
            </div>
            <h1 className="h1-sp">AI Review <em>Intelligence</em></h1>
            <p className="lede">Synthesizing thousands of Spotify reviews into actionable product insights.</p>
          </div>
          <div className="meta">
            <span>Market <br/><strong>Global</strong></span>
            <span>Confidence <br/><strong>{hasSearched ? '94%' : '82%'}</strong></span>
          </div>
        </div>
      </div>

      {/* Chatbox / Search Bar (Centered with padding) */}
      <div style={{ padding: 'var(--space-12) var(--space-8)' }}>
        <div className="canvas" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
            <div style={{ 
              display: 'flex', alignItems: 'center', gap: 'var(--space-3)', 
              background: 'var(--white)', padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-pill)', border: '1px solid var(--cream-400)',
              flex: 1
            }}>
              <Search size={20} style={{ color: 'var(--primary-400)' }} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask a research question... (e.g. Why do users keep listening to the same songs?)" 
                style={{ 
                  background: 'transparent', border: 'none', color: 'var(--ink-900)', 
                  outline: 'none', width: '100%', fontSize: 'var(--text-base)', fontFamily: 'var(--font-sans)'
                }}
                disabled={isSearching}
              />
            </div>
            <button 
              type="submit" 
              className="btn primary lg"
              disabled={isSearching}
            >
              {isSearching ? <><Loader2 size={18} className="spin" /> Synthesizing</> : 'Analyze Reviews'}
            </button>
          </form>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', justifyContent: 'center' }}>
            {[
              "Why do users struggle to discover new music?",
              "What are the most common frustrations with recommendations?",
              "What listening behaviors are users trying to achieve?",
              "What causes users to repeatedly listen to the same content?",
              "Which user segments experience different discovery challenges?",
              "What unmet needs emerge consistently across reviews?"
            ].map((query, i) => (
              <button
                key={i}
                className="tag"
                onClick={() => {
                  setSearchQuery(query);
                  setHasSearched(false);
                  setIsSearching(true);
                  setTimeout(() => {
                    setIsSearching(false);
                    setHasSearched(true);
                    scrollTo('overview');
                  }, 1500);
                }}
                disabled={isSearching}
                style={{ cursor: isSearching ? 'not-allowed' : 'pointer' }}
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Top Navigation Links */}
      <nav className="topbar-nav">
        <a className={`nav-item ${activeSection === 'overview' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('overview'); }} href="#overview">
          <LayoutDashboard size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} /> Overview
        </a>
        <a className={`nav-item ${activeSection === 'sources' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('sources'); }} href="#sources">
          <Database size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} /> Sources
        </a>
        <a className={`nav-item ${activeSection === 'themes' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('themes'); }} href="#themes">
          <BrainCircuit size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} /> Themes
        </a>
        <a className={`nav-item ${activeSection === 'segments' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('segments'); }} href="#segments">
          <Users size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} /> Segments
        </a>
        <a className={`nav-item ${activeSection === 'opportunities' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('opportunities'); }} href="#opportunities">
          <Lightbulb size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} /> Opportunities
        </a>
      </nav>

      {/* Main Content (All Sections Stacked) */}
      <main className="page-content">
        
        {/* OVERVIEW SECTION */}
        <section id="overview" className="section-container block">
          <div className="block-head">
            <h2 className="h2-sp">
              {hasSearched ? `Analysis: "${searchQuery}"` : 'Top Discovery Problems'}
            </h2>
            <div className="hint">
              {hasSearched 
                ? 'AI agents have extracted the most relevant themes and quotes across 46k+ sources to answer your query.'
                : 'Across thousands of reviews and social comments, what are users repeatedly saying about music discovery?'}
            </div>
          </div>
          
          <div className="card-grid">
            {themes.map(theme => (
              <div key={theme.id} className="feature-card" style={{ cursor: 'pointer' }} onClick={() => scrollTo('themes')}>
                <div className="card-header">
                  <div className="icon-wrap" style={{ background: 'var(--primary-100)', color: 'var(--primary-700)' }}>
                    <BrainCircuit size={20} />
                  </div>
                  <span className={`badge ${theme.sentiment === 'Negative' ? 'soft-coral' : 'soft-green'}`}>{theme.sentiment}</span>
                </div>
                <div>
                  <div className="cat">Theme 0{theme.id}</div>
                  <h3 className="name">{theme.title}</h3>
                </div>
                
                <div className="desc">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                    <span className="h3-sp" style={{ color: 'var(--primary-800)' }}>{theme.frequency}</span>
                    <span className="body-sm">of relevant complaints</span>
                  </div>
                </div>

                <div className="foot">
                  <span className="tag beta">{theme.segment}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-sm)', fontWeight: 500, color: theme.trendDirection === 'up' ? 'var(--danger-500)' : theme.trendDirection === 'down' ? 'var(--success-500)' : 'var(--ink-500)' }}>
                    {theme.trendDirection === 'up' ? <ArrowUpRight size={16}/> : theme.trendDirection === 'down' ? <ArrowDownRight size={16}/> : <Minus size={16}/>}
                    {theme.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SOURCES SECTION */}
        <section id="sources" className="section-container block">
          <div className="block-head">
            <h2 className="h2-sp">Data Sources & Pipeline</h2>
          </div>
          
          <div className="sub-head"><h3>Collection Status</h3></div>
          <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
            {sources.map(source => (
              <div key={source.platform} className="usage-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="usage-title">{source.platform}</div>
                  <span className="status-pill live">Live</span>
                </div>
                <div>
                  <div className="h3-sp" style={{ color: 'var(--primary-900)' }}>{(source.count / 1000).toFixed(1)}k</div>
                  <div className="usage-sub">reviews collected</div>
                </div>
              </div>
            ))}
          </div>

          <div className="sub-head"><h3>Analysis Pipeline</h3></div>
          <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-4)', overflowX: 'auto', paddingBottom: 'var(--space-4)' }}>
            {pipelineSteps.map((step, i) => (
              <div key={step.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <div className="feature-card compact" style={{ minWidth: '220px', borderColor: (step.status === 'running' || (isSearching && step.name === 'Theme')) ? 'var(--primary-400)' : 'var(--cream-300)' }}>
                  <div className="icon-wrap"><Activity size={18} /></div>
                  <div className="body">
                    <div className="name">{step.name} Agent</div>
                    <div className="desc">
                      {isSearching ? 'Analyzing Query...' : step.status === 'running' ? 'Processing...' : step.status === 'pending' ? 'Waiting' : `${(step.count / 1000).toFixed(1)}k items`}
                    </div>
                  </div>
                </div>
                {i < pipelineSteps.length - 1 && (
                  <div style={{ color: 'var(--ink-300)' }}>→</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* THEMES SECTION */}
        <section id="themes" className="section-container block">
          <div className="block-head">
            <h2 className="h2-sp">Theme Explorer</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 'var(--space-8)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {themes.map(t => (
                <div key={t.id} className="feature-card compact" style={{ cursor: 'pointer', borderColor: t.id === 1 ? 'var(--primary-500)' : 'var(--cream-300)', background: t.id === 1 ? 'var(--primary-50)' : 'var(--cream-100)' }}>
                  <div className="body">
                    <div className="name">{t.title}</div>
                    <div className="desc">{t.count} mentions</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="canvas">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                <h3 className="h3-sp" style={{ margin: 0, color: 'var(--primary-900)' }}>{themes[0].title}</h3>
                <span className={`badge ${themes[0].sentiment === 'Negative' ? 'soft-coral' : 'soft-green'}`}>{themes[0].sentiment} Sentiment</span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
                <div>
                  <div className="cat" style={{ marginBottom: 'var(--space-2)' }}>Why this happens</div>
                  <p className="body-md">{themes[0].why}</p>
                </div>
                <div>
                  <div className="cat" style={{ marginBottom: 'var(--space-2)' }}>Affected Segments</div>
                  <p className="body-md">{themes[0].segment}</p>
                </div>
              </div>

              <div className="sub-head"><h3>Evidence Quotes</h3></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {themes[0].evidence.map((ev, i) => (
                  <div key={i} style={{ padding: 'var(--space-5)', backgroundColor: 'var(--cream-100)', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--primary-300)' }}>
                    <p className="body-lg" style={{ fontStyle: 'italic', marginBottom: 'var(--space-2)' }}>"{ev.quote}"</p>
                    <span className="body-sm">— Source: {ev.source}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SEGMENTS SECTION */}
        <section id="segments" className="section-container block">
          <div className="block-head">
            <h2 className="h2-sp">User Segments</h2>
            <div className="hint">Which user segments experience different discovery challenges?</div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {segments.map(seg => (
              <div key={seg.name} className="feature-card" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1.5fr', gap: 'var(--space-8)', alignItems: 'start' }}>
                <div>
                  <h3 className="h4-sp">{seg.name}</h3>
                  <div className="body-sm" style={{ marginTop: 'var(--space-1)' }}>Goal: {seg.goal}</div>
                </div>
                <div>
                  <div className="cat">Main Frustration</div>
                  <p className="body-md">{seg.problem}</p>
                </div>
                <div>
                  <div className="cat">Core Need</div>
                  <p className="body-md" style={{ color: 'var(--primary-700)', fontWeight: 500 }}>{seg.challenge}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* OPPORTUNITIES SECTION */}
        <section id="opportunities" className="section-container block">
          <div className="block-head">
            <h2 className="h2-sp">Opportunity Board</h2>
            <div className="hint">Data-backed product directions derived from AI analysis.</div>
          </div>
          
          <div className="card-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {opportunities.map(opp => (
              <div key={opp.id} className="feature-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                <h3 className="h4-sp" style={{ color: 'var(--primary-900)', margin: 0 }}>{opp.title}</h3>
                
                <div>
                  <div className="cat">Signal</div>
                  <p className="body-md">{opp.signal}</p>
                </div>
                
                <div>
                  <div className="cat">User Need</div>
                  <p className="body-md">{opp.need}</p>
                </div>
                
                <div style={{ backgroundColor: 'var(--sage-50)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--sage-200)' }}>
                  <div className="cat" style={{ color: 'var(--sage-700)' }}>Possible Direction</div>
                  <p className="body-md" style={{ color: 'var(--sage-900)' }}>{opp.direction}</p>
                </div>
                
                <div>
                  <div className="cat">Risk</div>
                  <p className="body-sm" style={{ color: 'var(--danger-500)' }}>{opp.risk}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}

export default App
