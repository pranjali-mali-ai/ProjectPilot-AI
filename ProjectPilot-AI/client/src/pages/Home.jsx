import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div id="top">
      <Navbar />

      <main>
        <section
          className="hero"
          style={{ padding: "70px 22px 24px" }}
        >
          <h1
            style={{
              fontSize: 44,
              lineHeight: 1.1,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              textAlign: "center",
              maxWidth: 980,
              margin: "0 auto",
            }}
          >
            Welcome to
            <br />
            <span style={{ color: "#4f46e5" }}>ProjectPilot AI</span>
          </h1>
        </section>

        <section id="features" style={{ padding: "30px 22px 90px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>
            Features
          </h2>
          <p style={{ color: "rgba(15,23,42,0.7)", maxWidth: 760 }}>
            Your application content will appear here.
          </p>
        </section>

        <section id="about" style={{ padding: "30px 22px 90px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>
            About
          </h2>
          <p style={{ color: "rgba(15,23,42,0.7)", maxWidth: 760 }}>
            This is the ProjectPilot AI landing page.
          </p>
        </section>
      </main>
    </div>
  );
}


