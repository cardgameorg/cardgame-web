import { ReactEventHandler, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [state, setState] = useState<'register' | 'login'>('login');
  const { login, register, user } = useAuth();
  const location = useLocation();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    if (username && password) {
      if(state == "login") {
        login(username,password);
      } else {
        register(username,password);
      }
    }
  };

  if (user != null) {
    //redirect to this route after login
    return (
      <Navigate
        to={'/game'}
        replace
        state={{
          redirectTo: location,
        }}
      />
    );
  }

  return (
    <div className='flex w-screen h-screen items-center justify-center content-center'>
      <div className=" flex flex-col gap-2 items-center justify-center content-center text-center gradientbg highlightshadow p-16 rounded-xl">
        <h1 className='text-3xl font-bold'>{state=="register"?"Regisztrálj!":"Jelentkezz be!"}</h1>
        <input
          placeholder="username"
          onChange={handleUsernameChange}
          className="bg-gray-950 p-2 rounded-xl text-center"
        ></input>
        <input
          placeholder="password"
          onChange={handlePasswordChange}
          className="bg-gray-950 p-2 rounded-xl text-center"
        ></input>
        <button onClick={handleClick} className="bg-blue-950 rounded-xl p-4 hover:cursor-pointer hover:bg-blue-800">
        {state == 'register' ? 'Regisztrálás' : 'Bejelentkezés'}
        </button>
        <a className='opacity-50 hover:cursor-pointer hover:opacity-100'
          onClick={() => {
            setState(state == 'register' ? 'login' : 'register');
          }}
        >
          vagy 
          {state == 'register' ? ' jelentkezz be' : ' regisztrálj'}
        </a>
      </div>
    </div>
  );
}
