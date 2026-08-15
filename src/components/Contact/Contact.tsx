import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Linkedin,
  Github,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Section, SectionHeading, Backdrop } from '../ui/Section';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await emailjs.send(
        'service_s2lccnc',
        'template_cthfgnc',
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        'jcL7LQmdR4deOpN9H'
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error);
      setStatus('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === 'success' || status === 'error') setStatus('idle');
  };

  return (
    <Section id="contact">
      <Backdrop variant="both" />

      <SectionHeading
        eyebrow="Contact"
        title="Travaillons ensemble"
        description="Un projet, un poste à pourvoir ou simplement une question ? Ma boîte de réception est ouverte."
      />

      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Coordonnées */}
        <div
          className="reveal flex flex-col gap-4"
          style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
        >
          <ContactCard
            icon={<Mail className="h-5 w-5" />}
            title="Email"
            content="youssef.lamouchi@esprit.tn"
            href="mailto:youssef.lamouchi@esprit.tn"
          />
          <ContactCard
            icon={<Phone className="h-5 w-5" />}
            title="Téléphone"
            content="+216 22 554 114"
            href="tel:+21622554114"
          />
          <ContactCard
            icon={<MapPin className="h-5 w-5" />}
            title="Localisation"
            content="Tunis, Ariana"
          />

          <div className="glass mt-auto p-6">
            <p className="mb-4 text-sm leading-relaxed text-slate-400">
              Vous préférez les réseaux ? On peut aussi échanger là-bas.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/youssef-lamouchi/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-sm text-slate-300 transition-colors hover:border-accent/40 hover:text-white"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <a
                href="https://github.com/lamouchiyoussef"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-sm text-slate-300 transition-colors hover:border-accent/40 hover:text-white"
              >
                <Github size={16} />
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div
          className="reveal glass p-7 sm:p-9"
          style={{ '--reveal-delay': '180ms' } as React.CSSProperties}
        >
          <span
            aria-hidden
            className="absolute inset-x-9 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Nom"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
              />
              <Field
                label="Email"
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="vous@exemple.com"
              />
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                required
                placeholder="Parlez-moi de votre projet…"
                className={inputClasses}
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Envoi en cours…
                </>
              ) : (
                <>
                  <Send size={17} />
                  Envoyer le message
                </>
              )}
            </button>

            <div aria-live="polite">
              {status === 'success' && (
                <p className="flex items-center gap-2.5 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                  <CheckCircle2 size={17} className="flex-shrink-0" />
                  Message envoyé — je vous réponds au plus vite.
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-center gap-2.5 rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                  <AlertCircle size={17} className="flex-shrink-0" />
                  Une erreur s'est produite. Réessayez ou écrivez-moi directement par
                  email.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
};

const inputClasses =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-600 transition-colors duration-300 focus:border-accent/50 focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-accent/40';

const Label = ({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) => (
  <label
    htmlFor={htmlFor}
    className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400"
  >
    {children}
  </label>
);

const Field = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className={inputClasses}
    />
  </div>
);

const ContactCard = ({
  icon,
  title,
  content,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  href?: string;
}) => {
  const inner = (
    <>
      <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent/25 to-cyan-glow/10 text-accent-soft transition-transform duration-500 group-hover:scale-110">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <span className="block truncate text-[15px] text-slate-200">{content}</span>
      </span>
    </>
  );

  const classes = 'glass glass-hover group flex items-center gap-4 p-5';

  return href ? (
    <a href={href} className={classes}>
      {inner}
    </a>
  ) : (
    <div className={classes}>{inner}</div>
  );
};

export default Contact;
