"use client";

import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";

export function ContactForm({ recipient }: { recipient: string }) {
  const [draftOpened, setDraftOpened] = useState(false);

  function openDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const email = String(fields.get("email") ?? "").trim();
    const message = String(fields.get("message") ?? "").trim();
    const messageField = event.currentTarget.elements.namedItem("message") as HTMLTextAreaElement;
    if (!message) {
      messageField.setCustomValidity("Please write a message, not just spaces.");
      messageField.reportValidity();
      return;
    }
    const body = `Reply to: ${email}\n\n${message}`;
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent("Let’s connect — portfolio enquiry")}&body=${encodeURIComponent(body)}`;
    setDraftOpened(true);
  }

  return <form className="contact-form" action={`mailto:${recipient}`} method="post" encType="text/plain" onSubmit={openDraft} aria-labelledby="contact-form-title" aria-describedby="contact-form-note">
    <h3 id="contact-form-title">Start a conversation.</h3>
    <p className="form-intro">Have an opportunity or a project in mind? I’d love to hear about it.</p>
    <div className="contact-field">
      <label htmlFor="contact-email">Your email</label>
      <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required/>
    </div>
    <div className="contact-field">
      <label htmlFor="contact-message">Your message</label>
      <textarea id="contact-message" name="message" rows={5} placeholder="Tell me a little about what you have in mind…" maxLength={2000} required onInput={event => { event.currentTarget.setCustomValidity(""); setDraftOpened(false); }}/>
    </div>
    <button className="button contact-submit" type="submit"><Mail size={18} aria-hidden="true"/>Open email draft</button>
    <p className="form-note" id="contact-form-note">Opens your email app with a draft addressed to Revaldy. Send it there to get in touch.</p>
    <p className="form-status" role="status">{draftOpened ? "Draft requested. If your email app didn’t open, use the email link to get in touch." : ""}</p>
  </form>;
}
