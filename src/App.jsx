import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";

import Layout from "./components/Layout";
import Profile from "./pages/Profile/Profile";
import { auth } from "./firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [authUser] = useAuthState(auth)

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/auth" />}
        />
        <Route path="/auth" element={!authUser ? <Auth /> : <Navigate to="/" />} />
        <Route path="/:username" element={<Profile />} />
      </Routes>
    </Layout>
  );
}

export default App;
