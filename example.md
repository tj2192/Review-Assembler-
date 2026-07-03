Your tool should look like an internal AI research dashboard used by a Growth PM, researcher, or product designer.

It is not a recommendation engine.
It is a Review Discovery Engine that helps the team understand why discovery is failing before designing a solution.

Core idea

The UI should answer this:

“Across thousands of reviews, Reddit posts, and social comments, what are users repeatedly saying about music discovery — and what evidence supports it?”

So the tool should have 4 main parts:

Data sources
AI analysis pipeline
Insight dashboard
Evidence + opportunity view
1. Main dashboard
This is the landing screen.

AI Review Discovery Engine — Spotify

[ Ask a research question... ]
Example: Why do users keep listening to the same songs?

Filters:
Source: App Store / Play Store / Reddit / Forums / Social
Time: Last 30 days / 6 months / 1 year
Market: India / US / Global
User type: Free / Premium / Unknown
Sentiment: Negative / Mixed / Positive

--------------------------------------------------

Top discovery problems

1. Recommendations feel repetitive
   42% of negative discovery complaints
   Trend: Increasing
   Main segment: Passive listeners

2. Users do not know where to find fresh music
   28% of discovery complaints
   Trend: Stable
   Main segment: Casual listeners

3. Algorithm over-personalizes too early
   21% of discovery complaints
   Trend: Increasing
   Main segment: Explorers

4. Playlists feel recycled
   19% of complaints
   Trend: Increasing
   Main segment: Heavy playlist users

This screen gives a quick answer to the assignment questions.

2. Source ingestion screen

This screen shows how the system collects feedback.

Data Sources

[✓] App Store Reviews
12,430 reviews collected

[✓] Play Store Reviews
18,902 reviews collected

[✓] Reddit Discussions
4,120 posts/comments collected

[✓] Spotify Community Forum
2,340 posts collected

[✓] X / Social mentions
8,500 mentions collected

Status:
Collecting → Cleaning → Deduplicating → Classifying → Clustering → Validating

This proves that your engine works at scale, not from a few handpicked reviews.

Important UI elements:

Source cards
Number of reviews collected
Last updated date
Language detected
Spam/duplicate removed count
Platform split
3. AI pipeline / agent view

You can show this as a simple workflow, not a technical mess.

Review Data
   ↓
Cleaner Agent
Removes spam, duplicates, irrelevant comments
   ↓
Theme Agent
Finds repeated complaints and patterns
   ↓
Behavior + Segment Agent
Identifies user types and listening goals
   ↓
Evidence Agent
Pulls quotes and source links
   ↓
Opportunity Agent
Turns patterns into product opportunities
   ↓
Final Research Report

In the UI, this could look like a horizontal process bar:

[Collect] → [Clean] → [Theme] → [Segment] → [Validate] → [Report]

Each step can show:

Completed / running status
Number of items processed
Confidence score
Output preview
4. Theme explorer

This is the most important screen.

The user clicks one theme, for example:

Theme: “Recommendations feel repetitive”
Theme: Recommendations feel repetitive

Frequency:
8,240 mentions

Sentiment:
Mostly negative

Trend:
Up 18% in the last 90 days

Common phrases:
- same songs again
- Discover Weekly is repetitive
- algorithm keeps pushing the same artists
- no fresh recommendations
- playlist feels stale

Affected segments:
- Passive listeners
- Heavy playlist users
- Former explorers

Why this happens:
Users feel the system is optimizing for familiarity, not discovery.
Spotify may be giving safe recommendations instead of helping users explore.

Then below that:

Evidence

Quote 1:
“I keep getting the same artists even when I skip them.”

Source:
Reddit

Quote 2:
“Discover Weekly used to be good, now it feels like a recycled playlist.”

Source:
App Store Review

Quote 3:
“I want new music, not the same 10 songs in different playlists.”

Source:
Play Store Review

This screen connects AI insight + human evidence.

That is very important.

5. Segment view

Your assignment asks:

Which user segments experience different discovery challenges?

So the tool needs a segment screen.

User Segments

1. Passive Repeat Listener
Goal:
Wants easy music with low effort.

Problem:
Keeps getting the same songs because they do not actively search.

Discovery challenge:
Needs gentle discovery without too much choice.

--------------------------------------------------

2. Active Music Explorer
Goal:
Wants fresh artists, genres, and underground music.

Problem:
Feels Spotify recommendations are too safe.

Discovery challenge:
Needs novelty, depth, and control.

--------------------------------------------------

3. Mood-Based Listener
Goal:
Wants music for a situation — gym, study, heartbreak, travel.

Problem:
Recommendations repeat the same mood playlists.

Discovery challenge:
Needs more context-aware freshness.

--------------------------------------------------

4. Playlist-Dependent Listener
Goal:
Relies on Spotify-created playlists.

Problem:
Feels playlists overlap too much.

Discovery challenge:
Needs playlist variety and clearer difference between playlists.

The UI can show this as cards or a matrix.

Example matrix:

Segment                  Main frustration              Need
Passive listener          Too much repetition            Low-effort discovery
Explorer                  Not enough novelty             Deeper exploration
Mood listener             Same mood playlists            Contextual freshness
Playlist user             Playlist overlap               Clearer variety
6. Question explorer

This is where the evaluator can see that your tool directly answers the brief.

Ask the engine

[ Why do users struggle to discover new music? ]

Answer:
Users struggle because discovery requires effort, recommendations feel too familiar, and playlist surfaces often repeat similar artists. The strongest signal is that users want freshness without losing the comfort of their known taste.

Evidence:
- 8,240 mentions about repetitive recommendations
- 3,910 mentions about playlist overlap
- 2,600 mentions about difficulty finding new genres
- Strongest complaints from explorers and heavy playlist users

Suggested preset questions:

[Why do users struggle to discover new music?]
[What frustrates users about recommendations?]
[Why do users repeat the same content?]
[Which segments struggle most?]
[What unmet needs are emerging?]
[Show me evidence]
[Generate opportunity areas]

This makes the tool feel AI-native without becoming vague.

7. Opportunity board

After analysis, the tool should not directly jump to features.
It should first show opportunity areas.

Opportunity Areas

1. Help users escape repetitive recommendations
Signal:
High complaint volume around repeated songs/artists.

User need:
Freshness without losing familiarity.

Possible direction:
Controlled discovery, novelty slider, better “not this again” feedback.

Risk:
Too much novelty may reduce listening comfort.

--------------------------------------------------

2. Make playlist differences clearer
Signal:
Users feel Spotify playlists overlap.

User need:
Know why one playlist is different from another.

Possible direction:
Playlist freshness label, overlap warning, “what’s new here” section.

Risk:
Can make playlists feel too technical.

--------------------------------------------------

3. Support mood-based discovery
Signal:
Users search by moment, not just artist or genre.

User need:
Find music for a situation without hearing the same songs.

Possible direction:
Mood refresh controls, situation-based discovery paths.

Risk:
Mood categories can become generic.

This is the bridge between research and product solution.

8. What screens you should show in your case study

You do not need to design 20 screens. Show only 4–5 strong screens.

Screen 1: Data source setup

Shows where reviews are coming from.

Screen 2: AI processing pipeline

Shows how agents clean, classify, cluster, and validate feedback.

Screen 3: Insight dashboard

Shows top themes, volume, sentiment, trend, and affected segments.

Screen 4: Theme detail + evidence

Shows one deep insight with quotes from reviews.

Screen 5: Opportunity board

Shows how insights become product opportunities.

That is enough.

The UI structure I would recommend
Left sidebar:

Overview
Sources
Themes
Segments
Evidence
Opportunities
Report

Top bar:

Product: Spotify
Market: Global
Date range: Last 6 months
Sources: All
Confidence: 82%

Main content:

Insight cards
Theme clusters
Segment breakdown
Evidence drawer
Opportunity recommendations
Important design principle

The UI should not look like a normal analytics dashboard full of charts.