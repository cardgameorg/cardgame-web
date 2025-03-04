import Logo from '../../components/Logo';
import NavigateButton from '../../components/template/NavigateButton';
import { useAuth } from '../../contexts/AuthContext';

export default function CreateHomePage() {
  const { user } = useAuth();

  return (
    <div className="w-full h-full p-2 gap-1 sm:gap-4 sm:p-12 flex flex-col items-center justify-center">
      <Logo className="h-32" />
      <h1 className="font-black text-4xl text-main-text">Create!</h1>
      <h2 className="text-xl text-primary-text">Unleash your creativity.</h2>
      {!user ? (
        <div className="text-center sm:gap-4">
          <p>You need to be signed in in order to create packs.</p>
          <NavigateButton
            to="/login"
            className="my-6 text-xl shadow-center shadow-highlight-secondary hover:opacity-50 active:opacity-75 cursor-pointer bg-highlight p-4 rounded-2xl"
          >
            Login or Register
          </NavigateButton>
        </div>
      ) : (
        <div className=" flex flex-col justify-center items-center">
          <h1>Start creating a:</h1>
          <div className="flex flex-row gap-6">
            <NavigateButton
              to="/create/cardpack"
              className="my-6 text-xl shadow-center shadow-highlight-secondary hover:opacity-50 active:opacity-75 cursor-pointer bg-highlight p-4 rounded-2xl"
            >
              Card Pack
            </NavigateButton>
            <NavigateButton
              to="/create/promptpack"
              className="my-6 text-xl shadow-center shadow-highlight-secondary hover:opacity-50 active:opacity-75 cursor-pointer bg-highlight p-4 rounded-2xl"
            >
              Prompt Pack
            </NavigateButton>
          </div>
        </div>
      )}
    </div>
  );
}
