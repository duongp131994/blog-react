import * as React from "react";
import Stars from "../assets/images/stars.png";
import Moon from "../assets/images/moon.png";
import MountainsBehind from "../assets/images/mountains_behind.png";
import MountainsFront from "../assets/images/mountains_front.png";
const Section = (prop) => {
    React.useEffect(() => {
        let stars = document.getElementById("stars");
        let moon = document.getElementById("moon");
        let mountains_behind = document.getElementById("mountains_behind");
        let mountains_front = document.getElementById("mountains_front");
        let btn = document.getElementById("btn");
        let text = document.getElementById("text");
        let header = document.querySelector("header");

        window.addEventListener("scroll", () => {
            const value = window.scrollY;

            stars.style.left = value * 0.25 + "px";
            moon.style.top = value * 1.05 + "px";
            mountains_behind.style.top = value * 0.5 + "px";
            mountains_front.style.top = value * 0 + "px";
            text.style.marginRight = value * 4 + "px";
            text.style.marginTop = value * .5 + "px";
            btn.style.marginTop = value * 2.5 + "px";
            header.style.top = value * 0.5 + "px";
        });
    }, []);
  return (
    <section>
      <img className="parallax" src={Stars} id="stars" alt="" />
      <img className="parallax" src={Moon} id="moon" alt="" />
      <img
        className="parallax"
        src={MountainsBehind}
        id="mountains_behind"
        alt=""
      />
        {
            !prop.notFound
                ? (
                    <>
                        <h2 id="text">Moon Light</h2>
                        <a href="/" id="btn">
                            Scroll down
                        </a>
                    </>
                )
                : (<a href="/" id="btn">
                    <span>Not found</span>
                </a>)
        }


      <img
        className="parallax"
        src={MountainsFront}
        id="mountains_front"
        alt=""
      />
    </section>
  );
};

export default Section;
