import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";

import Layout from "./components/Layout";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/:username" element={<Profile />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
