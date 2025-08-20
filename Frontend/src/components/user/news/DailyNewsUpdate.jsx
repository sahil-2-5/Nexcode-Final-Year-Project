import React, { useState } from "react";
import NewsBoard from "./NewsBoard";
import Category from "./Category";

const DailyNewsUpdate = () => {
  const [category, setCategory] = useState("technology");

  return (
    <>
      <Category setCategory={setCategory} />
      <div className="background bg-cover bg-center">
        <NewsBoard category={category} />
      </div>
    </>
  );
};

export default DailyNewsUpdate;
