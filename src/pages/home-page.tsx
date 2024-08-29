import { useEffect } from "react";
import DemoPanel from "../components/demo/DemoPanel";
import { useApiStore } from "../store/api-store";
import Navbar from "../components/ui/nav-bar";
import Button from "../components/ui/standard-button";
import Footer from "../components/ui/footer";

function HomePage() {
  const user = useApiStore((s) => s.user);
  const fetchUser = useApiStore((s) => s.fetchUser);
  const loginWithGoogle = useApiStore((s) => s.loginWithGoogle)

  useEffect(() => {
    fetchUser(); // Fetch user information on component mount
    console.log("on mount", user);
  }, [fetchUser]);

  return (
    <>
      <Navbar
        route="Home"
        buttons={[user ? "dashboard" : "login"]}
        isLoggedIn={!!user}
      />


      <DemoPanel />

      <div className="w-full flex justify-center items-center">
        <h1 className="text-3xl p-12 font-semibold text-center w-[900px]">
          Speed up your innovation with collaboration at all stages of design development
        </h1>

      </div>



      <div className="p-2">
        <div className="flex flex-col sm:flex-row border border-sky-200 rounded-md">
          <div className="order-2 sm:order-1 flex-1 h-[400px] text-lg flex flex-col gap-2 items-center justify-center m-4">

            <h1 className="text-xl sm:text-2xl font-poppins font-semibold text-center">
              Upload CAD files and generate links instantly.
            </h1>
            <div className="flex gap-2 justify-center items-center">
              <Button variant='green' >.OBJ</Button>
              <Button variant='green'>.STL</Button>
              <Button variant='green'>.GLB</Button>
              <Button variant='green'>.FBX</Button>
            </div>
          </div>
          <div className="order-1 sm:order-2 h-[400px] p-4">
            <img
              className="rounded-md border border-sky-200 shadow-lg w-full h-full object-cover sm:object-contain"
              src="./explain-1.png"
            />
          </div>
        </div>
      </div>

      <div className="p-2">
        <div className="flex flex-col sm:flex-row border border-sky-200 rounded-md">
          <div className="h-[400px] p-4">
            <img
              className="rounded-md border border-sky-200 shadow-lg w-full h-full object-cover sm:object-contain"
              src="./explain-2.png"
            />
          </div>
          <div className="flex-1  h-[400px] text-lg flex flex-col gap-2 items-center justify-center m-4">
            <h1 className="text-xl sm:text-2xl font-poppins font-semibold text-center">
              Drop pins on models and attach comments.
            </h1>
            <div className="flex gap-2 justify-center items-center">
              <p>Collaborate on designs real time with your team</p>
            </div>
          </div>
        </div>
      </div>


      <div className="p-2">
        <div className="flex border border-sky-200 rounded-md flex-col sm:flex-row">
          <div className="flex-1 h-[400px] order-2 sm:order-1 text-lg flex flex-col gap-2 items-center justify-center m-4">
            <h1 className="text-xl sm:text-2xl font-poppins font-semibold text-center">
              Easy Editing! All members of the team can play.
            </h1>
            <div className="flex gap-2 justify-center items-center">
              <p className="text-center">Modelnote gives access to editing color and hiding parts of the model</p>

            </div>
          </div>
          <div className="order-1 sm:order-2 h-[400px] p-4">
            <img
              className="rounded-md border border-sky-200 shadow-lg w-full h-full object-cover sm:object-contain"
              src="./explain-3.png"
            />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col mt-12 gap-2 justify-center items-center">
        <h1 className="text-xl sm:text-4xl px-12 font-semibold text-center w-[900px]">
          Boost your 3D collaboration
        </h1>
        <p>3D development deserves a 3D environment </p>
        <Button onClick={loginWithGoogle} size='lg' className="mt-8">Try ModelNote</Button>
      </div>


      <Footer />

    </>
  );
}

export default HomePage;
