export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="pp-fCard" role="article" aria-label={title} style={{ textAlign: "center" }}>
      <div className="pp-fTop" style={{ justifyContent: "center" }}>
        <div className="pp-fIcon" aria-hidden="true">
          {icon}
        </div>
        <div className="pp-fName">{title}</div>
      </div>
      {description ? <div className="pp-bText" style={{ fontSize: 14, textAlign: "center" }}>{description}</div> : null}
    </div>
  );
}
