import React, { useState, useEffect } from "react";

export default function Body() {
  const [profile, setprofile] = useState([]);
  const [numberofprofile, setnumberofprofile] = useState("");
  const [userprofile, setuserprofile] = useState("");
  const [apiLimitExceeded, setApiLimitExceeded] = useState(false);

  async function githubprofiles(count) {
    try {
      let random = Math.floor(1 + Math.random() * 10000);
      const response = await fetch(
        `https://api.github.com/users?since=${random}&per_page=${count}`
      );
      if (response.status === 403) {
        setApiLimitExceeded(true);
        setprofile([]);
        return;
      }
      if (!response.ok) throw new Error("Error Fetching Data");
      const data = await response.json();
      setprofile(data);
      setApiLimitExceeded(false);
    } catch {
      console.log("Error Fetching Data");
    }
  }

  useEffect(() => {
    // This call is for default showing of 5 cards
    githubprofiles(5);
  }, []);

  async function githubspecificprofile(name) {
    try {
      const response = await fetch(`https://api.github.com/users/${name}`);
      if (response.status === 403) {
        setApiLimitExceeded(true);
        setprofile([]);
        return;
      }
      if (!response.ok) throw new Error("Error Fetching Data");
      const data = await response.json();
      setprofile([data]);
      setApiLimitExceeded(false);
    } catch {
      console.log("Error Fetching Data");
    }
  }

  return (
    <>
      <div className="but">
        <div className="input1">
          <input
            type="number"
            className="input"
            placeholder="Enter The Number Of Profiles"
            value={numberofprofile}
            onChange={(e) => setnumberofprofile(e.target.value)}
          ></input>
          <button onClick={() => githubprofiles(Number(numberofprofile))}>
            Search
          </button>
        </div>

        <div className="input2">
          <input
            type="text"
            className="input"
            placeholder="Enter Github User Name"
            value={userprofile}
            onChange={(e) => setuserprofile(e.target.value)}
          ></input>
          <button onClick={() => githubspecificprofile(userprofile)}>
            Search Profile
          </button>
        </div>
      </div>

      {apiLimitExceeded ? (
        <h1 style={{ color: "red", textAlign: "center" }} className="apicall">
          API Limit Exceeded, try again after 1 Hour
        </h1>
      ) : (
        <div className="Profiles">
          {profile.map((value) => (
            <div className="cards" key={value.id}>
              <img src={value.avatar_url} alt={`${value.login}'s Image`}></img>
              <h2 className="profilename">{value.login}</h2>
              <a href={value.html_url} target="_blank" className="profilelink">
                Profile
              </a>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
