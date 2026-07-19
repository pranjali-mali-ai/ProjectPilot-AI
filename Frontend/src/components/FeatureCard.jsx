export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="pp-fCard" role="article" aria-label={title}>
      <div className="pp-fTop">
        <div className="pp-fIcon" aria-hidden="true">
          {icon}
        </div>
        <div className="pp-fName">{title}</div>
      </div>
      {description ? <div className="pp-bText" style={{ fontSize: 14 }}>{description}</div> : null}
    </div>
  );
}

