import { useState } from "react";

export default function ContactForm({ email, social }) {
  const [status, setStatus] = useState("idle");
  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    setStatus("loading");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...fields,
          _subject: `Portfolio contact from ${fields.name}`,
          _captcha: "false",
        }),
      });
      if (!response.ok) throw new Error("Message was not accepted");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }
  return (
    <div className="portfolio-contact-grid">
      <div className="portfolio-contact-details">
        <span className="section-index">DIRECT LINE</span>
        <a href={`mailto:${email}`} className="portfolio-email">
          {email} ↗
        </a>
        <p>
          For collaborations, product work, or a conversation about the next
          idea.
        </p>
        <div className="portfolio-socials">
          <a href={social.github} target="_blank" rel="noopener noreferrer">
            GITHUB ↗
          </a>
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            LINKEDIN ↗
          </a>
          <a
            href="/fullStack(Saif).pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            RESUME ↗
          </a>
        </div>
      </div>
      <form className="portfolio-contact-form" onSubmit={onSubmit}>
        <span className="section-index">OR SEND A MESSAGE</span>
        <div className="portfolio-form-row">
          <label>
            Name
            <input
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Your name"
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
            />
          </label>
        </div>
        <label>
          Message
          <textarea
            name="message"
            rows="4"
            required
            placeholder="Tell me what you're building"
          />
        </label>
        <div className="portfolio-form-bottom">
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "SENDING…" : "SEND MESSAGE ↗"}
          </button>
          {status === "success" && (
            <p role="status">Message sent. Thanks for reaching out.</p>
          )}
          {status === "error" && (
            <p role="alert">
              Could not send. Please{" "}
              <a href={`mailto:${email}`}>email me directly</a>.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
