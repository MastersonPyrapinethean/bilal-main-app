import { useEffect, useState } from "react";
import ButtonPopup from "./ButtonPopup";
import FormOne from "./RegisterForm/FormOne";
import buyButtonImage from "./images/WITH-ALPHA-CHANNEL_GIhan_BTV_Creation_2nd-option__the-better-Y-BUTTON_Fiverr-Test_.gif";

export default function FormSection({ textObject, backgroundImage }) {
  const [currentForm, setCurrentForm] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const openForm = (formNumber) => setCurrentForm(formNumber);
  const closeForm = () => setCurrentForm(null);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await fetch("https://api.yaavaay.com/donations");
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setTotalAmount(data.totalAmount);
      } catch (error) {
        console.error("Failed to fetch total amount:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalAmount();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const viceList = [
    { label: "Vice 01 - $100", data: textObject.vice01, formNumber: 1 },
    { label: "Vice 02 - $1,000", data: [textObject.vice02], formNumber: 2 },
    { label: "Vice 03 - $10,000", data: [textObject.vice03], formNumber: 3 },
    { label: "Vice 04 - $100,000", data: [textObject.vice04], formNumber: 4 },
    { label: "Vice 05 - $900,000", data: [textObject.vice05], formNumber: 5 },
  ];

  return (
    <section
      className="text-section"
      style={{
        background: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div id="chartContainer" style={{ width: "100%", maxWidth: "100vw" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 5vh)", textAlign: "center" }}>
          {textObject.title}
        </h1>

        <div id="chartWrapper" style={{ width: "100%", overflow: "hidden" }}>
          <div
            id="cta-grid"
            style={{
              width: "90vw",
              maxWidth: "90%",
              backgroundSize: "contain",
              overflow: "hidden",
              transform: isMobile ? "scale(0.5)" : "none",
              transformOrigin: "center top",
              padding: "10px 0",
            }}
          >
            {viceList.map((vice, idx) => (
              <div
                key={idx}
                className="grid-row"
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  marginBottom: "1rem",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <div
                  className="cta-cell"
                  onClick={() => openForm(vice.formNumber)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    minWidth: "200px",
                    padding: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ whiteSpace: "nowrap" }}>{vice.label}</span>
                  <img
                    src={buyButtonImage}
                    style={{ width: "40px", height: "auto" }}
                    alt="buy button"
                  />
                </div>
                <div
                  className="info-cell"
                  style={{
                    width: isMobile ? "100%" : "calc(100% - 220px)",
                    padding: isMobile ? "0.5rem 0 0 0" : "0.5rem",
                  }}
                >
                  <ul
                    style={{
                      width: "100%",
                      margin: 0,
                      paddingLeft: "1.5rem",
                      overflowWrap: "break-word",
                    }}
                  >
                    {vice.data.map((item, i) => (
                      <li key={i} style={{ wordBreak: "break-word" }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conditionally render forms */}
        {currentForm && (
          <ButtonPopup closeForm={closeForm}>
            <FormOne
              step={currentStep}
              setStep={setCurrentStep}
              formNumber={currentForm}
              totalAmount={totalAmount}
              setTotalAmount={setTotalAmount}
            />
          </ButtonPopup>
        )}
      </div>
    </section>
  );
}
