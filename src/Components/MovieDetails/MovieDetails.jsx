import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  let { id, mediaType } = useParams();

  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function getTrending(id, mediaType) {
    setIsLoading(true);
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=50cf8e01bb76a7210961b755d2dd8dbd&language=en-US`
    );
    setDetails(data);
    setIsLoading(false);
    // console.log(data);
  }
  useEffect(() => {
    getTrending(id, mediaType);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Details</title>
      </Helmet>
      {isLoading ? (
        <div className="d-flex vh-100 justify-content-center align-items-center">
          <i className="fas fa-spinner fa-spin fa-8x"></i>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-3">
            {details.poster_path ? (
              <img
                src={"https://image.tmdb.org/t/p/w500" + details.poster_path}
                className="w-100"
                alt=""
              />
            ) : (
              <img
                src={"https://image.tmdb.org/t/p/w500" + details.profile_path}
                className="w-100"
                alt=""
              />
            )}
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div>
              <h2>
                {details.title} {details.name}
              </h2>
              <p className="my-4 text-muted">
                {details.overview}
                {details.biography}
              </p>
              {details.vote_average ? (
                <h4 className="mb-4">
                  Vote Average :{" "}
                  <span className="vote p-1 rounded-2">
                    {details.vote_average.toFixed(1)}
                  </span>{" "}
                </h4>
              ) : (
                ""
              )}
              {details.vote_count ? (
                <h4>
                  Vote Count :{" "}
                  <span className="vote p-1 rounded-2">
                    {details.vote_count}
                  </span>{" "}
                </h4>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
