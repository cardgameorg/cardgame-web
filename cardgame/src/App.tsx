import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router';
import './App.css';
import WebSocketComponent from './lib/websocket';
import { GameContextProvider } from './contexts/GameWsContext';
import { AuthContextProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/LoginPage';
import GamePage from './pages/GamePage';
import { PopupProvider, usePopups } from './contexts/PopupContext';
import PopupList, { PopupListWrapper } from './components/websocket/Popup';
import DiscoverPage from './pages/discover/DiscoverPage';
import CreateHomePage from './pages/create/CreateHomePage';
import CreateCardPackPage from './pages/create/CreateCardPackPage';
import CreatePromptPackPage from './pages/create/CreatePackPackPage';

function App() {
  return (
    <BrowserRouter>
      <PopupProvider>
        <AuthContextProvider>
          <GameContextProvider>
            <PopupListWrapper />
            <Routes>
              <Route path='*' element={<Login/>} />
              <Route index element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/discover/:path" element={<DiscoverPage/>}/>
              <Route path='/create' element={<CreateHomePage/>}/>
              <Route element={<AuthenticatedRoute />}>
                <Route path="/game" element={<GamePage />}/>
                <Route path="/create/cardpack" element={<CreateCardPackPage />}/>
                <Route path="/create/promptpack" element={<CreatePromptPackPage />}/>

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
