import React, { useEffect } from "react";
import background from "../images/image3_resized.jpg";

function Success() {
  let params = new URLSearchParams(window.location.search);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${background})`,
      }}
    >
      <p style={{ color: "white" }}>
        Your payment has been processed successfully. Thank you for your
        purchase!
      </p>
      <p style={{ color: "white", marginBottom: "20px" }}>
        A copy of the receipt has been sent to your provided email address
      </p>

      <div style={{ marginTop: '30px', marginBottom: '10px' }}>
        <iframe style={{ border: 'none' }} src={"https://api.yaavaay.com/requestpdfashtml/" + params.get('session_id')} type="application/pdf" width="834" height="1163"></iframe>
      </div>
      <div style={{ fontSize: "20px", textAlign: "center", marginBottom: "40px", display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <a style={{ color: "#03a5fc", display: "inline-block", width: "150px", marginRight: "20px" }} href={"https://api.yaavaay.com/requestpdf/" + params.get('session_id') + ".pdf"} download="your-yaavaay-receipt.pdf">Download</a>
      </div>
    </div>
  );
}

export default Success;
