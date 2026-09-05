import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { Seo } from "../components/Seo";

const EMAIL = "zubariel@gmail.com";

const initial = { username: "", email: "", subject: "", message: "" };

export function ContactPage() {
  const [form, setForm] = useState(initial);

  const update =
    (field: keyof typeof initial) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { username, email, subject, message } = form;
    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(
      `Username: ${username}\nEmail: ${email}\n\nMessage:\n${message}`,
    )}`;
    window.location.href = mailto;
  }

  return (
    <main>
      <Seo
        title="Zubariel | Contact"
        ogTitle="Contact"
        description="Get in touch with Zubariel for projects, questions, or collaborations."
      />
      <section className="page-hero contact-hero">
        <p className="kicker">// reach out</p>
        <h1>Get In Touch</h1>
        <p className="page-hero-sub">
          Have a project, a question, or just want to connect? My inbox is
          always open. Fill out the form below and I'll get back to you.
        </p>
      </section>

      <section className="section contact-section">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-grid">
            <div className="field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Your Name"
                required
                value={form.username}
                onChange={update("username")}
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                value={form.email}
                onChange={update("email")}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              placeholder="What's this about?"
              required
              value={form.subject}
              onChange={update("subject")}
            />
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows={5}
              placeholder="Your message here..."
              required
              value={form.message}
              onChange={update("message")}
            />
          </div>

          <button type="submit" className="btn btn-primary contact-submit">
            <i className="fa-solid fa-paper-plane" /> Send Message
          </button>
        </form>
      </section>
    </main>
  );
}
