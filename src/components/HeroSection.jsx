import React from "react";

function HeroSection() {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "100px 60px",
        background:
          "linear-gradient(135deg, #f9f5ff, #eef2ff)",
      }}
    >
      {/* LEFT CONTENT */}
      <div style={{ maxWidth: "600px" }}>
        <span
          style={{
            color: "#7c3aed",
            fontWeight: "600",
            fontSize: "14px",
            letterSpacing: "1px",
          }}
        >
          📍 SMART LOCATION DISCOVERY
        </span>

        <h1 style={{ fontSize: "48px", margin: "20px 0" }}>
          Discover Places <br />
          That Match Your Mood
        </h1>

        <p style={{ fontSize: "18px", color: "#555" }}>
          Find cafes, workspaces, hangout spots, and hidden gems
          curated based on how you feel right now.
        </p>

        <div style={{ marginTop: "30px" }}>
          <button
            style={{
              padding: "14px 24px",
              marginRight: "12px",
              borderRadius: "8px",
              border: "none",
              background: "#7c3aed",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Find Places Near Me
          </button>

          <button
            style={{
              padding: "14px 24px",
              borderRadius: "8px",
              border: "1px solid #7c3aed",
              background: "white",
              color: "#7c3aed",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Search Manually
          </button>
        </div>
      </div>

      {/* RIGHT VISUAL */}
      <div
        style={{
          width: "420px",
          height: "280px",
          borderRadius: "20px",
          background: "#ddd",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#666",
          fontSize: "16px",
        }}
      >
        Illustration / Map Preview
      </div>
    </section>
  );
}

export default HeroSection;
