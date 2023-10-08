import OauthButton from "./components/OauthButton";
import Thumbnail from "./components/Thumbnail";

function App() {
  return (
    <>
      <div className="d-flex p-3 justify-content-between">
        <div className="">
          <Thumbnail />
        </div>
        <div className="">
          <div className="">
            <OauthButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
