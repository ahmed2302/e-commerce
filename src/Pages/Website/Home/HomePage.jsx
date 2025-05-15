import Landing from "../../../Components/Website/Landing/Landing";
import landingImage from "../../../Assets/Images/1.jpg";
import watchImage from "../../../Assets/Images/watch.jpg";
import glassessImage from "../../../Assets/Images/classes.jpg";
import Section from "../../../Components/Website/Product/Section";
import { Latest, LatestSale, TopRated } from "../../../Api/Api";
import Footer from "../../../Components/Website/Footer/Footer";

export default function HomePage() {
  return (
    <div>
      <Landing
        height="100vh"
        background={landingImage}
        color="#333"
        title="Shampoo Nice"
      />

      <Section api={LatestSale} header="Latest Sale Products" sale />

      <Landing
        height="50vh"
        background={watchImage}
        color="white"
        title="Watch Nice"
      />

      <Section api={TopRated} header="Top Rated Products" />
      <Landing
        height="50vh"
        background={glassessImage}
        color="#333"
        title="glasses Nice"
        position="end"
      />

      <Section api={Latest} header="Latest Products" />

      <Footer />
    </div>
  );
}
