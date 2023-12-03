import React from "react";
import AddNewUrl from "../Components/AddNewUrl";
import UrlsList from "../Components/UrlsList";

function Home() {
  return (
    <div className="container mx-auto px-2 flex md:flex-row flex-col gap-10 my-10">
      <AddNewUrl />
      <UrlsList />
    </div>
  );
}

export default Home;
