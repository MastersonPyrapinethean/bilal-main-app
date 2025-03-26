import ButtonPopup from "./ButtonPopup";
import FormOne from "./RegisterForm/FormOne";
import buyButtonImage from "./images/WITH-ALPHA-CHANNEL_GIhan_BTV_Creation_2nd-option__the-better-Y-BUTTON_Fiverr-Test_.gif";

import { useState, useEffect } from "react";

export default function FormSection({ textObject, backgroundImage }) {
  const [currentForm, setCurrentForm] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const openForm = (formNumber) => {
    setCurrentForm(formNumber);
  };

  const closeForm = () => {
    setCurrentForm(null);
  };

  useEffect(() => {
    // Define async function inside the effect
    const fetchTotalAmount = async () => {
      try {
        // Replace with the actual URL of your API
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

    // Call the function
    fetchTotalAmount();
  }, []);

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
        width: "100vw",
        overflow: "hidden", // Prevent any overflow
      }}
    >
      <div id="chartContainer" style={{ width: "100%", maxWidth: "100vw" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 5vh)" }}>
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
	transform: window.innerWidth < 400 ? "scale(0.5)" : window.innerWidth < 768 ? "scale(0.5)" : "none",
	    transformOrigin: "center top",
    padding: "10px 0"
  }}
>
            {/* Vice 01 */}
            <div
              className="grid-row"
              style={{
                display: "flex",
                flexDirection: window.innerWidth < 768 ? "column" : "row",
                alignItems: window.innerWidth < 768 ? "flex-start" : "center",
                marginBottom: "1rem",
                width: "100%",
				overflow:"hidden"
              }}
            >
              <div
                className="cta-cell"
                onClick={() => openForm(1)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  minWidth: "200px",
                  padding: "0.5rem",
                  cursor: "pointer",
                }}
              >
                <span style={{ whiteSpace: "nowrap" }}>Vice 01 - $100</span>
                <img
                  src={buyButtonImage}
                  style={{ width: "40px", height: "auto" }}
                  alt="pulsing buy button"
                />
              </div>
              <div
                className="info-cell"
                style={{
                  width:
                    window.innerWidth < 768 ? "100%" : "calc(100% - 220px)",
                  padding: window.innerWidth < 768 ? "0.5rem 0 0 0" : "0.5rem",
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
                  {textObject.vice01.map((element, index) => (
                    <li key={index} style={{ wordBreak: "break-word" }}>
                      {element}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Vice 02 */}
            <div
              className="grid-row"
              style={{
                display: "flex",
                flexDirection: window.innerWidth < 768 ? "column" : "row",
                alignItems: window.innerWidth < 768 ? "flex-start" : "center",
                marginBottom: "1rem",
                width: "100%",overflow:"hidden"
              }}
            >
              <div
                className="cta-cell"
                onClick={() => openForm(2)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  minWidth: "200px",
                  padding: "0.5rem",
                  cursor: "pointer",
                }}
              >
                <span style={{ whiteSpace: "nowrap" }}>Vice 02 - $1,000</span>
                <img
                  src={buyButtonImage}
                  style={{ width: "40px", height: "auto" }}
                  alt="pulsing buy button"
                />
              </div>
              <div
                className="info-cell"
                style={{
                  width:
                    window.innerWidth < 768 ? "100%" : "calc(100% - 220px)",
                  padding: window.innerWidth < 768 ? "0.5rem 0 0 0" : "0.5rem",
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
                  <li style={{ wordBreak: "break-word" }}>
                    {textObject.vice02}
                  </li>
                </ul>
              </div>
            </div>

            {/* Vice 03 */}
            <div
              className="grid-row"
              style={{
                display: "flex",
                flexDirection: window.innerWidth < 768 ? "column" : "row",
                alignItems: window.innerWidth < 768 ? "flex-start" : "center",
                marginBottom: "1rem",
                width: "100%",overflow:"hidden"
              }}
            >
              <div
                className="cta-cell"
                onClick={() => openForm(3)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  minWidth: "200px",
                  padding: "0.5rem",
                  cursor: "pointer",
                }}
              >
                <span style={{ whiteSpace: "nowrap" }}>Vice 03 - $10,000</span>
                <img
                  src={buyButtonImage}
                  style={{ width: "40px", height: "auto" }}
                  alt="pulsing buy button"
                />
              </div>
              <div
                className="info-cell"
                style={{
                  width:
                    window.innerWidth < 768 ? "100%" : "calc(100% - 220px)",
                  padding: window.innerWidth < 768 ? "0.5rem 0 0 0" : "0.5rem",
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
                  <li style={{ wordBreak: "break-word" }}>
                    {textObject.vice03}
                  </li>
                </ul>
              </div>
            </div>

            {/* Vice 04 */}
            <div
              className="grid-row"
              style={{
                display: "flex",
                flexDirection: window.innerWidth < 768 ? "column" : "row",
                alignItems: window.innerWidth < 768 ? "flex-start" : "center",
                marginBottom: "1rem",
                width: "100%",overflow:"hidden"
              }}
            >
              <div
                className="cta-cell"
                onClick={() => openForm(4)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  minWidth: "200px",
                  padding: "0.5rem",
                  cursor: "pointer",
                }}
              >
                <span style={{ whiteSpace: "nowrap" }}>Vice 04 - $100,000</span>
                <img
                  src={buyButtonImage}
                  style={{ width: "40px", height: "auto" }}
                  alt="pulsing buy button"
                />
              </div>
              <div
                className="info-cell"
                style={{
                  width:
                    window.innerWidth < 768 ? "100%" : "calc(100% - 220px)",
                  padding: window.innerWidth < 768 ? "0.5rem 0 0 0" : "0.5rem",
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
                  <li style={{ wordBreak: "break-word" }}>
                    {textObject.vice04}
                  </li>
                </ul>
              </div>
            </div>

            {/* Vice 05 */}
            <div
              className="grid-row"
              style={{
                display: "flex",
                flexDirection: window.innerWidth < 768 ? "column" : "row",
                alignItems: window.innerWidth < 768 ? "flex-start" : "center",
                marginBottom: "1rem",
                width: "100%",overflow:"hidden"

              }}
            >
              <div
                className="cta-cell"
                onClick={() => openForm(5)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  minWidth: "200px",
                  padding: "0.5rem",
                  cursor: "pointer",
                }}
              >
                <span style={{ whiteSpace: "nowrap" }}>Vice 05 - $900,000</span>
                <img
                  src={buyButtonImage}
                  style={{ width: "40px", height: "auto" }}
                  alt="pulsing buy button"
                />
              </div>
              <div
                className="info-cell"
                style={{
                  width:
                    window.innerWidth < 768 ? "100%" : "calc(100% - 220px)",
                  padding: window.innerWidth < 768 ? "0.5rem 0 0 0" : "0.5rem",
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
                  <li style={{ wordBreak: "break-word" }}>
                    {textObject.vice05}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <ButtonPopup
          isOpen={currentForm !== null}
          onClose={closeForm}
          step={currentStep}
        >
          {currentForm === 1 && (
            <FormOne
              productId="price_1Nx3aXCZjdGT7ryJW7jXcPnE"
              onNextStep={(step) => setCurrentStep(step)}
            />
          )}
          {currentForm === 2 && (
            <FormOne
              productId="price_1Nx6siCZjdGT7ryJ8bZRUbuy"
              onNextStep={(step) => setCurrentStep(step)}
            />
          )}
          {currentForm === 3 && (
            <FormOne
              productId="price_1Nx6t6CZjdGT7ryJhez0wmUv"
              onNextStep={(step) => setCurrentStep(step)}
            />
          )}
          {currentForm === 4 && (
            <FormOne
              productId="price_1Nx6tRCZjdGT7ryJsmlaTuFI"
              onNextStep={(step) => setCurrentStep(step)}
            />
          )}
          {currentForm === 5 && (
            <FormOne
              productId="price_1Nx6uKCZjdGT7ryJVtwrgXs2"
              onNextStep={(step) => setCurrentStep(step)}
            />
          )}
        </ButtonPopup>
      </div>
      <div className="live-budget">
        <h2>LIVE AMOUNT</h2>
        <h2>
          ${totalAmount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
        </h2>
      </div>
      <p className="footer">{textObject.footer}</p>
    </section>
  );
}
