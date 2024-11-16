import OauthButton from "./components/OauthButton";
import ThumbnailContainer from "./components/ThumbnailContainer";

function App() {
  return (
    <>
      <div className="d-flex p-3 justify-content-between">
        <div className="">
          <ThumbnailContainer />
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
