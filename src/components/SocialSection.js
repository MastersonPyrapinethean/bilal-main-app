import CountdownComponent from "./countdown/Countdown";
import ShareButton from "./ShareButton";
import ContactForm from "./ContactForm";

export default function SocialSection({ targetDate, backgroundImage }) {
  return (
    <section className="text-section"
      style={{
        background: `rgba(0,0,0,.8) url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <CountdownComponent targetDate={targetDate} />
      <ShareButton />
      <ContactForm />
    </section>
  )
}