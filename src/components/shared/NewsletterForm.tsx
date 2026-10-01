"use client";

import Button from "@/components/ui/Button";

const fields: { id: string; name: string; type: string; label: string; autoComplete: string }[] = [
  {
    id: "newsletter-email",
    name: "email",
    type: "email",
    label: "Your Email Address",
    autoComplete: "email",
  },
  {
    id: "newsletter-first-name",
    name: "firstName",
    type: "text",
    label: "First Name",
    autoComplete: "given-name",
  },
  {
    id: "newsletter-last-name",
    name: "lastName",
    type: "text",
    label: "Last Name",
    autoComplete: "family-name",
  },
];

export default function NewsletterForm() {
  const [email, ...names] = fields;

  const renderField = (field: (typeof fields)[number]) => (
    <div key={field.id} className="newsletter-field">
      <label htmlFor={field.id} className="sr-only">
        {field.label}
      </label>
      <input
        id={field.id}
        name={field.name}
        type={field.type}
        autoComplete={field.autoComplete}
        placeholder={field.label}
        required={field.type === "email"}
        className="newsletter-input"
      />
    </div>
  );

  return (
    <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
      <div className="newsletter-fields">
        {renderField(email)}
        <div className="newsletter-row">{names.map(renderField)}</div>
      </div>
      <Button type="submit" variant="white" ariaLabel="Sign up for the newsletter">
        Sign Up
      </Button>
    </form>
  );
}
