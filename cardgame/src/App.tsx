import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router';
import './App.css';
import WebSocketComponent from './lib/websocket';
import { GameContextProvider } from './contexts/GameWsContext';
import { AuthContextProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/LoginPage';
import GamePage from './pages/GamePage';
import { PopupProvider, usePopups } from './contexts/PopupContext';
import PopupList, { PopupListWrapper } from './components/websocket/Popup';

function App() {
  return (
    <BrowserRouter>
      <PopupProvider>
        <AuthContextProvider>
          <GameContextProvider>
            <PopupListWrapper />
            <Routes>
              <Route index element={<Login />} />
              <Route path="/login" element={<Login />} />

              <Route element={<AuthenticatedRoute />}>
                <Route path="/game" element={<GamePage />}></Route>
              </Route>
            </Routes>
          </GameContextProvider>
        </AuthContextProvider>
      </PopupProvider>
    </BrowserRouter>
  );
}

const AuthenticatedRoute = () => {
  const user = useAuth();
  const location = useLocation();

  if (user == null) {
    //redirect to this route after login
    return (
      <Navigate
        to={'/login'}
        replace
        state={{
          redirectTo: location,
        }}
      />
    );
  }

  return <Outlet />;
};

export default App;
