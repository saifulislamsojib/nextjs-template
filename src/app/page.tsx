import { useEffect } from "react";

const HomePage = () => {
  const a = "b";
  useEffect(() => {
    console.log(a);
  }, []);
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default HomePage;
