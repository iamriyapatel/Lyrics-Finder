import './App.css';
import Axios from 'axios';
import { useState } from 'react';

function App() {
    const [artist, setArtist] = useState("");
    const [song, setSong] = useState("");
    const [lyrics, setLyrics] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function searchLyrics() {
        if (artist.trim() === "" || song.trim() === "") {
            setError("Please enter both artist and song names.");
            setLyrics("");
            return;
        }

        setLoading(true);
        setError("");
        setLyrics("");

        Axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
            .then((res) => {
                if (res.data.lyrics) {
                    setLyrics(res.data.lyrics);
                } else {
                    setError("Lyrics not found.");
                    setLyrics("");
                }
            })
            .catch(() => {
                setError("An error occurred. Please try again.");
                setLyrics("");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className="App">
            <h1>Lyrics Finder</h1>

            <div className="input-group">
                <input
                    className="inp"
                    type="text"
                    placeholder="Enter artist name"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                />
                <input
                    className="inp"
                    type="text"
                    placeholder="Enter song name"
                    value={song}
                    onChange={(e) => setSong(e.target.value)}
                />
                {/*<button className="btn" onClick={searchLyrics}>
                    {loading ? "Searching..." : "Search"}
                </button>*/}
                <button className="btn" onClick={searchLyrics}>
                    <i className="fas fa-search"></i>
                </button>
            </div>

            {error && <p className="error">{error}</p>}
            <hr />

            <div className="lyrics-display">
                {loading ? (
                    <p>Loading lyrics...</p>
                ) : (
                    <div className="lyrics-content">
                        {lyrics.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;