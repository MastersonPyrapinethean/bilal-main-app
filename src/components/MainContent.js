import React from "react";
import './textStyle.css';
import text from "./messages.en-GB";
import TextSection from "./TextSection";
import HeroSection from "./HeroSection";
import FormSection from "./FormSection";
import SocialSection from "./SocialSection";
import image1 from './images/image1_resized.jpg';
//import image1 from '../assets/image1.jpg';
import image2 from './images/image2_resized.jpg';
import image3 from './images/image3_resized.jpg';
import image4 from './images/image4_resized.jpg';
import image5 from './images/image5_resized.jpg';
import image6 from './images/image6_resized.jpg';
import image7 from './images/image7_resized.jpg';
import image8 from './images/image8_resized.jpg';

function MainContent() {
  const targetDate = new Date("2024-12-31T23:59:59").getTime(); // Replace with your target date

  return (
    <>
      <HeroSection textObject={text.text0} backgroundImage={image1} />
      <TextSection textObject={text.text1} backgroundImage={image2} />
      <TextSection textObject={text.text2} backgroundImage={image3} />
      <TextSection textObject={text.text3} backgroundImage={image4} />
      <TextSection textObject={text.text4} backgroundImage={image5} />
      <TextSection textObject={text.text5} backgroundImage={image6} />
      <FormSection textObject={text.text6} backgroundImage={image8} />
      <SocialSection targetDate={targetDate} backgroundImage={image7} />
    </>
  );
}

export default MainContent;
