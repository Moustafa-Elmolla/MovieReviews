import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function People() {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let mediaType = 'person'
  let nums = new Array(10).fill(1).map((ele, index) => index +1)
  // console.log(nums);
  async function getTrending(page) {
    setIsLoading(true);
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/popular?api_key=50cf8e01bb76a7210961b755d2dd8dbd&language=en-US&page=${page}`
    );
    setPeople(data.results);
    setIsLoading(false);
    console.log(data.results);
  }
  useEffect(() => {
    getTrending(1);
  }, []);
  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>People</title>
            </Helmet>
      {isLoading ? (
        <div className="d-flex vh-100 justify-content-center align-items-center">
          <i className="fas fa-spinner fa-spin fa-8x"></i>
        </div>
      ) : (
        <div className="row">
          {people.map((item, index) => (
            <div key={index} className="col-md-3">
              <Link
                className=" text-decoration-none text-white"
                to={`/moviedetails/${item.id}/${mediaType}`}
              >
                <div className=" position-relative">
                  <img
                    src={"https://image.tmdb.org/t/p/w500" + item.profile_path}
                    className="w-100"
                    alt=""
                  />
                  <h3 className="h5">{item.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
      <nav className="py-5">
  <ul className="pagination pagination-sm justify-content-center">
    {nums.map((page)=> <li key={page} onClick={()=> getTrending(page)} className="page-item p-1">
      <Link className="page-link bg-transparent text-white">{page}</Link>
    </li>)}
    
  </ul>
</nav>
    </>
  );
}





