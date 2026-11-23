import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  Send,
} from 'lucide-react';
import { FormEvent, useState } from 'react';
import { PROFILE } from '../data/profile';

type FormFeedback =
  | { type: 'idle' }
  | { type: 'error'; message: string }
  | { type: 'success'; message: string };

const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as
  | string
  | undefined;

export function ContactFooter() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<FormFeedback>({ type: 'idle' });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setFeedback({
        type: 'error',
        message: `Clipboard permission blocked. You can reach me directly at ${PROFILE.email}.`,
      });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setFeedback({
        type: 'error',
        message: 'Please fill in your name, email address, and message.',
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFeedback({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    // If the owner configures a free Formspree / Web3Forms endpoint via VITE_CONTACT_FORM_ENDPOINT,
    // submit directly via fetch; otherwise open the visitor's mail client honestly with zero fake promises.
    if (FORM_ENDPOINT) {
      setSubmitting(true);
      setFeedback({ type: 'idle' });
      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            message: trimmedMessage,
          }),
        });

        if (!response.ok) {
          throw new Error('Endpoint returned an error');
        }

        setName('');
        setEmail('');
        setMessage('');
        setFeedback({
          type: 'success',
          message: 'Message delivered. Thanks for reaching out — I will reply soon.',
        });
      } catch {
        setFeedback({
          type: 'error',
          message: `Could not reach the form endpoint right now. Please email ${PROFILE.email} directly.`,
        });
      } finally {
        setSubmitting(false);
      }
      return;
    }

    const subject = encodeURIComponent(`Portfolio Inquiry from ${trimmedName}`);
    const body = encodeURIComponent(
      `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\n${trimmedMessage}`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setFeedback({
      type: 'success',
      message:
        'Opened your default mail client with a pre-filled draft. You can also copy the message below if you prefer webmail.',
    });
  };

  const handleCopyDraft = async () => {
    const formatted = `To: ${PROFILE.email}\nFrom: ${name.trim() || 'Visitor'} (${email.trim() || 'no email provided'})\n\n${message.trim()}`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedMessage(true);
      window.setTimeout(() => setCopiedMessage(false), 2500);
    } catch {
      setFeedback({
        type: 'error',
        message: 'Unable to copy to clipboard automatically.',
      });
    }
  };

  return (
    <>
      <section
        id="connect"
        aria-labelledby="connect-heading"
        className="border-b border-[#26313A] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left column: Headline + direct verified channels */}
            <div className="lg:col-span-5">
              <p className="font-mono text-xs text-[#A0F2B8]">connect</p>
              <h2
                id="connect-heading"
                className="headline-balance mt-3 text-3xl font-bold tracking-tight text-[#E8EEF2] sm:text-4xl"
              >
                Something interesting in mind?
                <span className="block text-[#A0F2B8]">Let’s make it real.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#92A0AA]">
                Good ideas, interesting problems, collaborations, internships, or just a
                conversation about technology.
              </p>

              {/* Direct Email box with Mailto + Copy */}
              <div className="mt-8 rounded-lg border border-[#26313A] bg-[#11171C] p-5">
                <p className="font-mono text-xs text-[#92A0AA]">Direct Email</p>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="mt-1.5 block break-all font-mono text-sm font-medium text-[#E8EEF2] transition-colors hover:text-[#A0F2B8]"
                >
                  {PROFILE.email}
                </a>

                <div className="mt-4 flex flex-wrap items-center gap-2.5">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-md border border-[#A0F2B8]/50 bg-[#A0F2B8]/10 px-3.5 py-2 font-mono text-xs text-[#A0F2B8] whitespace-nowrap shrink-0 transition-colors hover:bg-[#A0F2B8] hover:text-[#080B0E]"
                  >
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Send Email</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-md border border-[#26313A] bg-[#080B0E] px-3.5 py-2 font-mono text-xs text-[#E8EEF2] whitespace-nowrap shrink-0 transition-colors hover:border-[#A0F2B8]/50 hover:text-[#A0F2B8]"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#A0F2B8]" aria-hidden="true" />
                        <span className="text-[#A0F2B8]">Email Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Verified external profile links */}
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[52px] items-center justify-between rounded-lg border border-[#26313A] bg-[#11171C] px-4 py-3 font-mono text-xs text-[#E8EEF2] transition-colors hover:border-[#A0F2B8]/50 hover:text-[#A0F2B8]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Github className="h-4 w-4 text-[#92A0AA]" aria-hidden="true" />
                    <span>GitHub</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#92A0AA]" aria-hidden="true" />
                </a>

                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[52px] items-center justify-between rounded-lg border border-[#26313A] bg-[#11171C] px-4 py-3 font-mono text-xs text-[#E8EEF2] transition-colors hover:border-[#A0F2B8]/50 hover:text-[#A0F2B8]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-[#92A0AA]" aria-hidden="true" />
                    <span>LinkedIn</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#92A0AA]" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Right column: Accessible Contact Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-lg border border-[#26313A] bg-[#11171C] p-6 sm:p-8"
              >
                <div className="mb-6 flex items-center justify-between border-b border-[#26313A] pb-3 font-mono text-xs">
                  <span className="text-[#E8EEF2]">compose message</span>
                  <span className="text-[#92A0AA]">
                    {FORM_ENDPOINT ? 'Direct submit active' : 'Drafts via mail client'}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-xs text-[#92A0AA]"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="mt-2 block w-full rounded-md border border-[#26313A] bg-[#080B0E] px-3.5 py-2.5 text-sm text-[#E8EEF2] placeholder:text-[#92A0AA]/50 focus:border-[#A0F2B8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-xs text-[#92A0AA]"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="mt-2 block w-full rounded-md border border-[#26313A] bg-[#080B0E] px-3.5 py-2.5 text-sm text-[#E8EEF2] placeholder:text-[#92A0AA]/50 focus:border-[#A0F2B8] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs text-[#92A0AA]"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share a problem, collaboration idea, internship opportunity, or question..."
                    className="mt-2 block w-full resize-y rounded-md border border-[#26313A] bg-[#080B0E] px-3.5 py-2.5 text-sm leading-relaxed text-[#E8EEF2] placeholder:text-[#92A0AA]/50 focus:border-[#A0F2B8] focus:outline-none"
                  />
                </div>

                {feedback.type !== 'idle' && (
                  <p
                    role={feedback.type === 'error' ? 'alert' : 'status'}
                    className={`mt-4 rounded-md border px-3.5 py-2.5 font-mono text-xs leading-relaxed ${
                      feedback.type === 'error'
                        ? 'border-red-500/40 bg-red-500/10 text-red-300'
                        : 'border-[#A0F2B8]/40 bg-[#A0F2B8]/10 text-[#A0F2B8]'
                    }`}
                  >
                    {feedback.message}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[#A0F2B8] bg-[#A0F2B8] px-5 py-2.5 font-mono text-xs font-semibold text-[#080B0E] whitespace-nowrap shrink-0 transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                      <Send className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>
                        {submitting
                          ? 'Sending...'
                          : FORM_ENDPOINT
                            ? 'Send Message'
                            : 'Open in Email Client'}
                      </span>
                    </button>

                    {message.trim().length > 0 && (
                      <button
                        type="button"
                        onClick={handleCopyDraft}
                        className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-[#26313A] bg-[#080B0E] px-4 py-2 font-mono text-xs text-[#92A0AA] whitespace-nowrap shrink-0 transition-colors hover:border-[#A0F2B8]/50 hover:text-[#E8EEF2]"
                      >
                        {copiedMessage ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-[#A0F2B8]" aria-hidden="true" />
                            <span className="text-[#A0F2B8]">Draft Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Copy Draft</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet, grounded Footer */}
      <footer className="bg-[#06080A] py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-lg font-semibold tracking-tight text-[#E8EEF2]">
                {PROFILE.footerQuote}
              </p>
              <p className="mt-2 font-mono text-xs text-[#A0F2B8]">
                {PROFILE.footerLoop.join(' · ')}
              </p>
            </div>

            <a
              href="#top"
              className="inline-flex min-h-[40px] items-center gap-1.5 self-start font-mono text-xs text-[#92A0AA] whitespace-nowrap shrink-0 transition-colors hover:text-[#A0F2B8] sm:self-end"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#26313A]/70 pt-6 font-mono text-xs text-[#92A0AA]">
            <span>
              © {new Date().getFullYear()} {PROFILE.name}
            </span>
            <div className="flex items-center gap-5">
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#E8EEF2]"
              >
                GitHub
              </a>
              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#E8EEF2]"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                className="transition-colors hover:text-[#E8EEF2]"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
