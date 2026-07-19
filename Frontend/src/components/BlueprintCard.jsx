function renderBlock(block, idx) {
  switch (block.type) {
    case "heading":
      return (
        <h4 key={idx} className="pp-richHeading">{block.text}</h4>
      );
    case "text":
      return (
        <p key={idx} className="pp-richText">{block.text}</p>
      );
    case "list":
      return (
        <ul key={idx} className="pp-richList">
          {block.items.map((item, i) => (
            <li key={i} className="pp-richListItem">{item}</li>
          ))}
        </ul>
      );
    case "numbered":
      return (
        <ol key={idx} className="pp-richList pp-richNumbered">
          {block.items.map((item, i) => (
            <li key={i} className="pp-richListItem">{item}</li>
          ))}
        </ol>
      );
    case "checklist":
      return (
        <div key={idx} className="pp-checklistGroup">
          {block.items.map((item, i) => (
            <label key={i} className="pp-checklistItem">
              <input
                type="checkbox"
                defaultChecked={item.checked}
                disabled
                className="pp-checklistInput"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      );
    case "code":
      return (
        <pre key={idx} className="pp-richCode">
          <code>{block.code}</code>
        </pre>
      );
    case "table":
      return (
        <div key={idx} className="pp-tableWrap">
          <table className="pp-richTable">
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "user":
      return (
        <div key={idx} className="pp-userCard">
          <div className="pp-userTitle">{block.who}</div>
          <div className="pp-userGrid">
            <div className="pp-userField">
              <strong>Pain Points:</strong>
              <p>{block.painPoints}</p>
            </div>
            <div className="pp-userField">
              <strong>How the Project Helps:</strong>
              <p>{block.help}</p>
            </div>
            <div className="pp-userField">
              <strong>Expected Benefits:</strong>
              <p>{block.benefits}</p>
            </div>
          </div>
        </div>
      );
    case "feature":
      return (
        <div key={idx} className="pp-featureDetail">
          <h4 className="pp-featureName">{block.name}</h4>
          <p className="pp-richText"><strong>Description:</strong> {block.description}</p>
          <p className="pp-richText"><strong>How it works:</strong> {block.howItWorks}</p>
          <p className="pp-richText"><strong>User benefit:</strong> {block.benefit}</p>
          <div className="pp-featureExample">
            <strong>Example:</strong> {block.example}
          </div>
        </div>
      );
    case "tech":
      return (
        <div key={idx} className="pp-techCategory">
          <h4 className="pp-techCategoryName">{block.category}</h4>
          {block.stacks.map((s, i) => (
            <div key={i} className="pp-techItem">
              <span className="pp-techName">{s.name}</span>
              <span className="pp-techWhy">{s.why}</span>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export default function BlueprintCard({ icon, title, open, onToggle, body }) {
  const blocks = Array.isArray(body) ? body : [];

  return (
    <article className="pp-bCard" aria-label={title}>
      <div className="pp-bHead">
        <div className="pp-bLeft">
          <div className="pp-bIcon" aria-hidden="true">
            {icon}
          </div>
          <div>
            <div className="pp-bTitle">{title}</div>
          </div>
        </div>

        <button className="pp-bToggle" type="button" onClick={onToggle}>
          {open ? "Collapse" : "Expand"}
        </button>
      </div>

      <div className={`pp-bBody ${open ? "isOpen" : ""}`}>
        <div className="pp-bText">
          {blocks.length > 0
            ? blocks.map((block, idx) => renderBlock(block, idx))
            : <p className="pp-richText">No content available for this section.</p>}
        </div>
      </div>
    </article>
  );
}
