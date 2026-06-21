import html2canvas from "html2canvas";
import { useRef } from "react";

export function useCertificateGenerator() {
  const certRef = useRef(null);

  async function downloadCertificate() {
    const el = certRef.current;
    if (!el) return;
    
    el.style.display = "block";
    
    try {
      const canvas = await html2canvas(el, {
        backgroundColor: "#0f1a0a",
        scale: 2,
        logging: false,
        useCORS: true,
      });
      
      const link = document.createElement("a");
      link.download = "nvidia-money-master-certificate.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      el.style.display = "none";
    }
  }

  return { certRef, downloadCertificate };
}

export default function CertificateTemplate({ certRef, completedAt }) {
  const date = completedAt ? new Date(completedAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric"
  }) : new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div
      ref={certRef}
      style={{
        display: "none",
        position: "fixed",
        left: "-9999px",
        top: 0,
        width: "800px",
        height: "560px",
        background: "linear-gradient(135deg, #0f1a0a 0%, #1a2a10 50%, #0f1a0a 100%)",
        fontFamily: "'Inter', sans-serif",
        color: "#e0e0e0",
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      {/* Border */}
      <div style={{
        border: "2px solid #76B900",
        borderRadius: "16px",
        padding: "40px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        boxShadow: "inset 0 0 40px rgba(118,185,0,0.1)",
        position: "relative",
      }}>
        {/* Corner accents */}
        <div style={{ position: "absolute", top: "12px", left: "12px", width: "24px", height: "24px", borderTop: "3px solid #76B900", borderLeft: "3px solid #76B900", borderRadius: "4px 0 0 0" }} />
        <div style={{ position: "absolute", top: "12px", right: "12px", width: "24px", height: "24px", borderTop: "3px solid #76B900", borderRight: "3px solid #76B900", borderRadius: "0 4px 0 0" }} />
        <div style={{ position: "absolute", bottom: "12px", left: "12px", width: "24px", height: "24px", borderBottom: "3px solid #76B900", borderLeft: "3px solid #76B900", borderRadius: "0 0 0 4px" }} />
        <div style={{ position: "absolute", bottom: "12px", right: "12px", width: "24px", height: "24px", borderBottom: "3px solid #76B900", borderRight: "3px solid #76B900", borderRadius: "0 0 4px 0" }} />

        <p style={{ fontSize: "11px", letterSpacing: "6px", textTransform: "uppercase", color: "#76B900", marginBottom: "8px", fontWeight: 600 }}>
          Official Certificate
        </p>

        <h1 style={{ fontSize: "32px", fontWeight: 900, color: "#76B900", marginBottom: "6px", lineHeight: 1.2 }}>
          Spend NVIDIA's Money
        </h1>

        <div style={{ width: "80px", height: "2px", background: "linear-gradient(90deg, transparent, #76B900, transparent)", margin: "16px auto" }} />

        <p style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>Awarded To</p>
        <p style={{ fontSize: "26px", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>Player</p>

        <p style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>For Successfully Spending</p>
        <p style={{ fontSize: "28px", fontWeight: 800, color: "#76B900", fontFamily: "'JetBrains Mono', monospace", marginBottom: "16px" }}>
          $4,500,000,000,000
        </p>

        <div style={{ width: "80px", height: "2px", background: "linear-gradient(90deg, transparent, #76B900, transparent)", margin: "16px auto" }} />

        <p style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>Rank</p>
        <p style={{ fontSize: "18px", fontWeight: 700, color: "#76B900" }}>🏆 NVIDIA Money Master</p>

        <p style={{ fontSize: "11px", color: "#555", marginTop: "20px" }}>{date}</p>
      </div>
    </div>
  );
}