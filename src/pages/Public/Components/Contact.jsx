import { useState } from "react";
import { toast } from "react-toastify";

const STUDIO = {
  email: "hello@xiv.store",
  phone: "+92 42 111 000 000",
  address: "XIV Studio, Mall Road, Lahore",
  hours: "Monday to Saturday, 11:00 to 19:00",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const update = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const send = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Add your name, email, and a message");
      return;
    }
    const subject = encodeURIComponent(`Message from ${form.name.trim()}`);
    const body = encodeURIComponent(`${form.name.trim()}\n${form.email.trim()}\n\n${form.message.trim()}`);
    window.location.href = `mailto:${STUDIO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="info-page pt-[65px] pr-[52px] pb-[80px]">
      <h1>Contact</h1>
      <div className="studio">
        <span>{STUDIO.address}</span>
        <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>
        <a href={`tel:${STUDIO.phone.replace(/\s/g, "")}`}>{STUDIO.phone}</a>
        <span>{STUDIO.hours}</span>
      </div>
      <form className="contact-form" onSubmit={send}>
        <input type="text" placeholder="Name" value={form.name} onChange={update("name")} />
        <input type="email" placeholder="Email" value={form.email} onChange={update("email")} />
        <textarea placeholder="Message" rows={6} value={form.message} onChange={update("message")} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
