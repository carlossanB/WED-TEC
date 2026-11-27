export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title.replace(/\\n/g, "\n")}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}
