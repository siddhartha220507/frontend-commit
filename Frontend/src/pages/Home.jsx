import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getTrendingMovies, getPopularMovies, getTVShows } from "../services/tmdbApi";
import HeroBanner from "../components/HeroBanner";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

function Home() {
    const [activeTab, setActiveTab] = useState('trending'); // 'trending', 'popular', 'tvShows'
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);

    // Reset and fetch when tab changes
    useEffect(() => {
        setItems([]);
        setPage(1);
        setHasMore(true);
        setInitialLoad(true);
        // We do not call fetch here directly to avoid race conditions with the state clearing.
        // We will trigger fetchData implicitly or carefully handle it. 
        // Best approach is a deliberate fetch on tab change to page 1
        fetchInitialData(activeTab);
    }, [activeTab]);

    const fetchInitialData = async (tab) => {
        try {
            const data = await fetchDataByTab(tab, 1);
            setItems(data);
            setPage(2);
            setHasMore(data.length > 0);
        } catch (error) {
            console.error("Failed to fetch initial home data", error);
            setHasMore(false);
        } finally {
            setInitialLoad(false);
        }
    };

    const fetchMoreData = async () => {
        try {
            const newData = await fetchDataByTab(activeTab, page);
            if (newData?.length === 0) {
                setHasMore(false);
            } else {
                setItems(prev => {
                    const existingIds = new Set(prev.map(m => m.id));
                    const uniqueNew = newData.filter(m => !existingIds.has(m.id));
                    return [...prev, ...uniqueNew];
                });
                setPage(prev => prev + 1);
            }
        } catch (error) {
            console.error("Failed to load more home data", error);
            setHasMore(false);
        }
    };

    const fetchDataByTab = async (tab, pageNum) => {
        switch (tab) {
            case 'trending': return await getTrendingMovies(pageNum);
            case 'popular': return await getPopularMovies(pageNum);
            case 'tvShows': return await getTVShows(pageNum);
            default: return [];
        }
    };

    const tabs = [
        { id: 'trending', label: 'Trending Now' },
        { id: 'popular', label: 'Popular Movies' },
        { id: 'tvShows', label: 'TV Shows' }
    ];

    return (
        <div>
            {items[0] && <HeroBanner movie={items[0]} />}
            
            <div style={{ padding: '0 2rem 2rem 2rem', marginTop: '2rem' }}>
                
                {/* Tab Navigation */}
                <div style={{
                    display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="glowing-line" style={{ marginTop: '0', marginBottom: '2rem' }}></div>
                
                {/* Infinite Scroll Grid Container */}
                {initialLoad ? (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                        <Loader fullScreen={false} />
                    </div>
                ) : (
                    <InfiniteScroll
                        dataLength={items.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<Loader fullScreen={false} />}
                        endMessage={
                            <p style={{ textAlign: 'center', margin: '2rem 0', color: 'var(--text-muted)' }}>
                                <b>Yay! You have seen it all for {tabs.find(t => t.id === activeTab)?.label}</b>
                            </p>
                        }
                    >
                        <div className="movie-grid">
                            {items.map((item, index) => (
                                <MovieCard key={`${item.id}-${index}`} movie={item} />
                            ))}
                        </div>
                    </InfiniteScroll>
                )}

            </div>
        </div>
    );
}

export default Home;