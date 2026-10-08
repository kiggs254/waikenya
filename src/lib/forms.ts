/**
 * Form submission via Netlify Forms.
 *
 * Netlify detects forms by parsing static HTML at deploy time, and Next.js
 * renders ours through the server function — so `public/__forms.html` carries a
 * blueprint of every form (same name, same field names) and we POST to it.
 * Keep that file in step with the field specs in `EnquiryForm` call sites.
 *
 * Requires "Form detection" to be enabled for the site in Netlify, and a
 * redeploy afterwards: it does not apply retroactively.
 */

export const FORM_ENDPOINT = "/__forms.html";

export type FormName = "contact" | "membership" | "scholarship";

export async function submitForm(
    formName: FormName,
    data: Record<string, string>,
): Promise<void> {
    const body = new URLSearchParams({ "form-name": formName, ...data });

    const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
    });

    if (!res.ok) {
        throw new Error(`Form submission failed with status ${res.status}`);
    }
}
