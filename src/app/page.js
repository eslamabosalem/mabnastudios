import Image from "next/image";
import HomeHero from "./Component/Pages/HomeHero";
import TeamCarousel from "./Component/Pages/TeamCarousel";
import About from "./Component/Pages/About";
import ScrollVideo from "./Component/Pages/ScrollVideo";
import Slider from "./Component/Slider";
import ContactUs from "./Component/Pages/CountactUs";

export default function Home() {
  return (
    <>
  <div className=" mx-1">
<HomeHero/>
<About/>

<Slider/>
<ScrollVideo/>
<TeamCarousel/>
<ContactUs/>

</div>

</>

  );
}
