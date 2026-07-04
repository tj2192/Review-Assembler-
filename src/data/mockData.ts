export const sources = [
  { platform: 'App Store', count: 12430, status: 'Completed' },
  { platform: 'Play Store', count: 18902, status: 'Completed' },
  { platform: 'Reddit', count: 4120, status: 'Completed' },
  { platform: 'Forum', count: 2340, status: 'Completed' },
  { platform: 'Social', count: 8500, status: 'Completed' }
];

export const pipelineSteps = [
  { name: 'Collect', status: 'done', count: 46292 },
  { name: 'Clean', status: 'done', count: 41021 },
  { name: 'Theme', status: 'done', count: 32000 },
  { name: 'Segment', status: 'done', count: 32000 },
  { name: 'Validate', status: 'running', count: 28000 },
  { name: 'Report', status: 'pending', count: 0 }
];

export const defaultThemes = [
  {
    id: 1,
    title: 'Recommendations feel repetitive',
    frequency: '42%',
    count: 8240,
    sentiment: 'Negative',
    trend: '+18% in 90d',
    trendDirection: 'up',
    segment: 'Passive listeners',
    why: 'Users feel the system is optimizing for familiarity, not discovery. Spotify may be giving safe recommendations instead of helping users explore.',
    phrases: [
      'same songs again',
      'Discover Weekly is repetitive',
      'algorithm keeps pushing the same artists',
      'no fresh recommendations',
      'playlist feels stale'
    ],
    evidence: [
      { quote: 'I keep getting the same artists even when I skip them.', source: 'Reddit' },
      { quote: 'Discover Weekly used to be good, now it feels like a recycled playlist.', source: 'App Store' },
      { quote: 'I want new music, not the same 10 songs in different playlists.', source: 'Play Store' }
    ]
  },
  {
    id: 2,
    title: 'Users do not know where to find fresh music',
    frequency: '28%',
    count: 5490,
    sentiment: 'Negative',
    trend: 'Stable',
    trendDirection: 'flat',
    segment: 'Casual listeners',
    why: 'The UI emphasizes known content, burying exploration paths.',
    phrases: ['hard to find new', 'where is the fresh stuff'],
    evidence: []
  },
  {
    id: 3,
    title: 'Algorithm over-personalizes too early',
    frequency: '21%',
    count: 4120,
    sentiment: 'Mixed',
    trend: '+12% in 90d',
    trendDirection: 'up',
    segment: 'Explorers',
    why: 'Playing one song from a new genre immediately floods recommendations with that genre.',
    phrases: ['too personalized', 'trapped in a bubble'],
    evidence: []
  }
];

export const defaultSegments = [
  {
    name: 'Passive Repeat Listener',
    goal: 'Wants easy music with low effort.',
    problem: 'Keeps getting the same songs because they do not actively search.',
    challenge: 'Needs gentle discovery without too much choice.'
  },
  {
    name: 'Active Music Explorer',
    goal: 'Wants fresh artists, genres, and underground music.',
    problem: 'Feels Spotify recommendations are too safe.',
    challenge: 'Needs novelty, depth, and control.'
  },
  {
    name: 'Mood-Based Listener',
    goal: 'Wants music for a situation — gym, study, heartbreak, travel.',
    problem: 'Recommendations repeat the same mood playlists.',
    challenge: 'Needs more context-aware freshness.'
  },
  {
    name: 'Playlist-Dependent Listener',
    goal: 'Relies on Spotify-created playlists.',
    problem: 'Feels playlists overlap too much.',
    challenge: 'Needs playlist variety and clearer difference.'
  }
];

export const defaultOpportunities = [
  {
    id: 1,
    title: 'Help users escape repetitive recommendations',
    signal: 'High complaint volume around repeated songs/artists.',
    need: 'Freshness without losing familiarity.',
    direction: 'Controlled discovery, novelty slider, better "not this again" feedback.',
    risk: 'Too much novelty may reduce listening comfort.'
  },
  {
    id: 2,
    title: 'Make playlist differences clearer',
    signal: 'Users feel Spotify playlists overlap.',
    need: 'Know why one playlist is different from another.',
    direction: 'Playlist freshness label, overlap warning, "what’s new here" section.',
    risk: 'Can make playlists feel too technical.'
  }
];

// Data when the user searches for "Why do users keep listening to the same songs?"
export const searchThemes = [
  {
    id: 1,
    title: 'Recommendations are too safe and familiar',
    frequency: '65%',
    count: 12400,
    sentiment: 'Negative',
    trend: '+25% in 30d',
    trendDirection: 'up',
    segment: 'Passive listeners, Former explorers',
    why: 'The algorithm strongly weights past listening history over exploration, trapping users in a "comfort loop" where only known hits are recommended.',
    phrases: ['stuck in a loop', 'keeps playing the same tracks', 'Spotify assumes I only like 10 songs'],
    evidence: [
      { quote: 'I literally let Spotify auto-play after my album finished, and it played the exact same 5 songs it played yesterday.', source: 'Reddit' },
      { quote: 'My Discover Weekly is just songs I already liked 3 years ago.', source: 'App Store' }
    ]
  }
];

export const searchSegments = [
  {
    name: 'The Trapped Listener',
    goal: 'Wants to branch out effortlessly.',
    problem: 'Algorithm keeps pulling them back to their historical favorites.',
    challenge: 'Needs an explicit "explore outside my bubble" button.'
  }
];

export const searchOpportunities = [
  {
    id: 1,
    title: 'Introduce a "Freshness" Slider',
    signal: 'Users explicitly asking for more variety in auto-play.',
    need: 'Control over the known-to-unknown ratio.',
    direction: 'Add a slider on playlists to toggle between "Familiar", "Mix", and "Completely New".',
    risk: 'Users might slide to "New", dislike it, and churn. Needs careful curation.'
  }
];
