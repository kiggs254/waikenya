"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { submitForm, type FormName } from "@/lib/forms";
import { CONTACT } from "@/lib/site";

export type Field = {
    name: string;
    label: string;
    type?: "text" | "email" | "tel" | "textarea" | "select";
    required?: boolean;
    options?: string[];
    placeholder?: string;
    rows?: number;
};

/**
 * One form component for the contact, membership and scholarship enquiries, so
 * all three look and behave identically and all three actually deliver.
 *
 * Submissions go to Netlify Forms. If that fails the visitor is given the
 * Chapter's email address rather than a dead end — losing an enquiry silently
 * is the worst outcome here.
 */
export default function EnquiryForm({
    formName,
    fields,
    submitLabel = "Send message",
    successTitle = "Thank you — message received",
    successBody = "We have your message and a member of the Chapter will be in touch shortly.",
    theme = "light",
}: {
    formName: FormName;
    fields: Field[];
    submitLabel?: string;
    successTitle?: string;
    successBody?: string;
    theme?: "light" | "dark";
}) {
    const [values, setValues] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    const set = (name: string, value: string) =>
        setValues((v) => ({ ...v, [name]: value }));

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (status === "sending") return;
        setStatus("sending");
        try {
            await submitForm(formName, values);
            setStatus("sent");
        } catch {
            setStatus("error");
        }
    };

    if (status === "sent") {
        return (
            <div className={`enquiry enquiry-${theme} enquiry-done`} role="status">
                <CheckCircle size={44} strokeWidth={1.6} className="enquiry-done-icon" />
                <h3>{successTitle}</h3>
                <p>{successBody}</p>
            </div>
        );
    }

    return (
        <form
            onSubmit={onSubmit}
            name={formName}
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className={`enquiry enquiry-${theme}`}
        >
            <input type="hidden" name="form-name" value={formName} />
            {/* Honeypot: hidden from people, irresistible to bots. */}
            <p className="enquiry-hp" aria-hidden="true">
                <label>
                    Leave this field empty
                    <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
            </p>

            {fields.map((f) => {
                const id = `${formName}-${f.name}`;
                return (
                    <div key={f.name} className="enquiry-field">
                        <label htmlFor={id}>
                            {f.label}
                            {f.required && <span aria-hidden="true"> *</span>}
                        </label>

                        {f.type === "textarea" ? (
                            <textarea
                                id={id}
                                name={f.name}
                                rows={f.rows ?? 4}
                                required={f.required}
                                placeholder={f.placeholder}
                                value={values[f.name] ?? ""}
                                onChange={(e) => set(f.name, e.target.value)}
                            />
                        ) : f.type === "select" ? (
                            <select
                                id={id}
                                name={f.name}
                                required={f.required}
                                value={values[f.name] ?? ""}
                                onChange={(e) => set(f.name, e.target.value)}
                            >
                                <option value="">{f.placeholder ?? "Please choose…"}</option>
                                {f.options?.map((o) => (
                                    <option key={o} value={o}>{o}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                id={id}
                                name={f.name}
                                type={f.type ?? "text"}
                                required={f.required}
                                placeholder={f.placeholder}
                                autoComplete={autoCompleteFor(f)}
                                value={values[f.name] ?? ""}
                                onChange={(e) => set(f.name, e.target.value)}
                            />
                        )}
                    </div>
                );
            })}

            {status === "error" && (
                <p className="enquiry-error" role="alert">
                    <AlertCircle size={16} strokeWidth={2.2} />
                    <span>
                        Sorry — we couldn&rsquo;t send that. Please email us directly at{" "}
                        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call{" "}
                        <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.
                    </span>
                </p>
            )}

            <button type="submit" className="enquiry-submit" disabled={status === "sending"}>
                {status === "sending" ? (
                    <>
                        <Loader2 size={16} strokeWidth={2.4} className="enquiry-spin" />
                        Sending…
                    </>
                ) : (
                    <>{submitLabel} →</>
                )}
            </button>

            <style>{`
                .enquiry {
                    display: flex;
                    flex-direction: column;
                    gap: 1.15rem;
                }
                .enquiry-hp {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    overflow: hidden;
                    clip: rect(0 0 0 0);
                    white-space: nowrap;
                }
                .enquiry-field {
                    display: flex;
                    flex-direction: column;
                    gap: 0.4rem;
                }
                .enquiry-field label {
                    font-size: 0.8rem;
                    font-weight: 700;
                    letter-spacing: 0.4px;
                    color: var(--teal-deep);
                }
                .enquiry-dark .enquiry-field label { color: rgba(255,255,255,0.85); }
                .enquiry-field input,
                .enquiry-field select,
                .enquiry-field textarea {
                    width: 100%;
                    padding: 0.82rem 1rem;
                    font-family: inherit;
                    font-size: 0.95rem;
                    color: var(--text-dark);
                    background: #fff;
                    border: 1.5px solid #dde2e7;
                    border-radius: 3px;
                    outline: none;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                }
                .enquiry-field textarea { resize: vertical; }
                .enquiry-field input:focus,
                .enquiry-field select:focus,
                .enquiry-field textarea:focus {
                    border-color: var(--teal);
                    box-shadow: 0 0 0 3px rgba(26,107,124,0.14);
                }
                .enquiry-submit {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-top: 0.35rem;
                    padding: 1rem 2rem;
                    background: var(--teal);
                    color: #fff;
                    border: none;
                    border-radius: 2px;
                    font-family: inherit;
                    font-size: 0.9rem;
                    font-weight: 700;
                    letter-spacing: 0.4px;
                    cursor: pointer;
                    transition: background 0.25s ease, transform 0.25s ease;
                }
                .enquiry-submit:hover:not(:disabled) {
                    background: var(--teal-dark);
                    transform: translateY(-2px);
                }
                .enquiry-submit:disabled { opacity: 0.65; cursor: progress; }
                .enquiry-dark .enquiry-submit { background: var(--gold); color: var(--teal-deep); }
                .enquiry-spin { animation: enquiry-spin 0.9s linear infinite; }
                @keyframes enquiry-spin { to { transform: rotate(360deg); } }
                .enquiry-error {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.6rem;
                    padding: 0.9rem 1rem;
                    background: #fdf1f1;
                    border: 1px solid #f3cfcf;
                    border-radius: 4px;
                    color: #9a2a2a;
                    font-size: 0.86rem;
                    line-height: 1.6;
                }
                .enquiry-error a { color: #9a2a2a; font-weight: 700; text-decoration: underline; }
                .enquiry-error svg { flex-shrink: 0; margin-top: 2px; }
                .enquiry-done {
                    align-items: center;
                    text-align: center;
                    gap: 0.75rem;
                    padding: 2.5rem 1rem;
                }
                .enquiry-done-icon { color: var(--teal); }
                .enquiry-dark .enquiry-done-icon { color: var(--gold); }
                .enquiry-done h3 { font-size: 1.3rem; color: var(--teal-deep); }
                .enquiry-dark .enquiry-done h3 { color: #fff; }
                .enquiry-done p { color: var(--text-body); max-width: 420px; }
                .enquiry-dark .enquiry-done p { color: rgba(255,255,255,0.75); }
                @media (prefers-reduced-motion: reduce) {
                    .enquiry-submit, .enquiry-field input, .enquiry-field select,
                    .enquiry-field textarea { transition: none; }
                    .enquiry-spin { animation: none; }
                }
            `}</style>
        </form>
    );
}

function autoCompleteFor(f: Field): string | undefined {
    if (f.type === "email") return "email";
    if (f.type === "tel") return "tel";
    if (f.name === "name") return "name";
    return undefined;
}
