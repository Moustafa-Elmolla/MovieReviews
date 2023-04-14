import axios from "axios";
import React, { useEffect, useState } from "react";
import MediaItem from "../MediaItem/MediaItem";
import { Helmet } from "react-helmet";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getTrending(mediaitem, callback) {
    setIsLoading(true);
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaitem}/week?api_key=50cf8e01bb76a7210961b755d2dd8dbd`
    );
    callback(data.results);
    setIsLoading(false);
    // console.log(data.results);
  }
  useEffect(() => {
    getTrending("movie", setMovies);
    getTrending("tv", setTv);
    getTrending("person", setPeople);
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      {isLoading ? (
        <div className="d-flex vh-100 justify-content-center align-items-center">
          <i className="fas fa-spinner fa-spin fa-8x"></i>
        </div>
      ) : (
        <>
          <div className="row py-3">
            <div className="col-md-4 d-flex align-items-center">
              <div>
                <div className="brdr w-25 mb-3"></div>
                <h2 className="h3">
                  Trending <br />
                  Movies <br />
                  To Watch Now
                </h2>
                <p className="text-muted">Most Watched Movies By Week</p>
                <div className="brdr w-100 mt-3"></div>
              </div>
            </div>
            {movies.slice(0, 10).map((item, index) => (
              <MediaItem key={index} item={item} />
            ))}
          </div>

          <div className="row py-3">
            <div className="col-md-4 d-flex align-items-center">
              <div>
                <div className="brdr w-25 mb-3"></div>
                <h2 className="h3">
                  Trending <br />
                  tv <br />
                  To Watch Now
                </h2>
                <p className="text-muted">Most Watched tv By Week</p>
                <div className="brdr w-100 mt-3"></div>
              </div>
            </div>
            {tv.slice(0, 10).map((item, index) => (
              <MediaItem key={index} item={item} />
            ))}
          </div>

          <div className="row py-3 mb-5">
            <div className="col-md-4 d-flex align-items-center">
              <div>
                <div className="brdr w-25 mb-3"></div>
                <h2 className="h3">
                  Trending <br />
                  people <br />
                  To Watch Now
                </h2>
                <p className="text-muted">Most Watched people By Week</p>
                <div className="brdr w-100 mt-3"></div>
              </div>
            </div>
            {people.slice(0, 10).map((item, index) => (
              <MediaItem key={index} item={item} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
