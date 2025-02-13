import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./component/Header";
import Body from "./component/Body";
function GithubProfile() {
  return (
    <>
      <Header />
      <Body />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<GithubProfile />);
