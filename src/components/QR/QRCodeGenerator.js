import React from "react";
import QRCode from "qrcode.react";
import "./QRCodeGenerator.css";

function QRCodeGenerator({ url }) {
  return (
    <div className="qr-code-container flex">
      <QRCode value={url} className="qr-code" />
    </div>
  );
}

export default QRCodeGenerator;
