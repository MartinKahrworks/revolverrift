const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://127.0.0.1:1337";

export const FALLBACK_CONTACT_DATA = {
    title: "CONTACT US",
    subtitle: "// Transmission_Open",
    submitButtonText: "SEND MESSAGE",
    successMessage: "Email sent successfully!",
    errorMessage: "Failed to send message. Try again.",
    formFields: [
        { id: 1, name: "name", placeholder: "AGENT NAME", inputType: "text", isRequired: true },
        { id: 2, name: "email", placeholder: "COMMUNICATION CHANNEL (EMAIL)", inputType: "email", isRequired: true },
        { id: 3, name: "comment", placeholder: "TRANSMISSION CONTENT...", inputType: "textarea", isRequired: true }
    ]
};

export const getContactPageData = async () => {
    try {
        const res = await fetch(`${STRAPI_URL}/api/contact-page?populate=*`);
        if (!res.ok) return FALLBACK_CONTACT_DATA;

        const json = await res.json();
        const data = json.data;
        if (!data) return FALLBACK_CONTACT_DATA;

        let parsedFields = FALLBACK_CONTACT_DATA.formFields;
        if (data.formFields && data.formFields.length > 0) {
            parsedFields = data.formFields.map((f, i) => ({
                id: f.id || i + 1,
                name: f.name || `field_${i}`,
                placeholder: f.placeholder || "",
                inputType: f.inputType || "text",
                isRequired: f.isRequired ?? true
            }));
        }

        return {
            title: data.title || FALLBACK_CONTACT_DATA.title,
            subtitle: data.subtitle || FALLBACK_CONTACT_DATA.subtitle,
            submitButtonText: data.submitButtonText || FALLBACK_CONTACT_DATA.submitButtonText,
            successMessage: data.successMessage || FALLBACK_CONTACT_DATA.successMessage,
            errorMessage: data.errorMessage || FALLBACK_CONTACT_DATA.errorMessage,
            formFields: parsedFields
        };

    } catch (e) {
        if (import.meta.env.DEV) {
            console.error("Failed fetching contact page data:", e);
        }
        return FALLBACK_CONTACT_DATA;
    }
};
