const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const SUPABASE_CONTACT_TABLE = import.meta.env.VITE_SUPABASE_CONTACT_TABLE || "contact_submissions";

const hasSupabaseConfig = () => Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_CONTACT_TABLE);

const pickFirstNonEmpty = (obj, keys) => {
    for (const key of keys) {
        const value = obj?.[key];
        if (typeof value === "string" && value.trim()) return value.trim();
    }
    return "";
};

const normalizeContactPayload = (formData = {}) => {
    const name = pickFirstNonEmpty(formData, ["name", "fullName", "fullname", "firstName"]);
    const email = pickFirstNonEmpty(formData, ["email", "mail"]);
    const comment = pickFirstNonEmpty(formData, ["comment", "message", "details", "content"]);

    return {
        name,
        email,
        comment,
        source_page: "contact",
    };
};

const submitToSupabase = async (payload) => {
    const endpoint = `${SUPABASE_URL}/rest/v1/${SUPABASE_CONTACT_TABLE}`;

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || `Supabase insert failed: ${response.status}`);
    }
};

const submitToLegacyApi = async (payload) => {
    const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    let result = null;
    try {
        result = await response.json();
    } catch {
        result = null;
    }

    if (!response.ok) {
        throw new Error(result?.message || `Contact API failed: ${response.status}`);
    }

    return result;
};

export const submitContactForm = async (formData = {}) => {
    const payload = normalizeContactPayload(formData);

    if (!payload.name || !payload.email || !payload.comment) {
        throw new Error("Name, email, and message are required.");
    }

    if (hasSupabaseConfig()) {
        try {
            await submitToSupabase(payload);
            return { success: true, provider: "supabase", message: "Message sent successfully." };
        } catch (error) {
            if (import.meta.env.DEV) {
                console.error("[contactSubmitApi] Supabase submit failed, falling back to /api/contact", error);
            }
        }
    }

    const legacyResult = await submitToLegacyApi(payload);
    return {
        success: true,
        provider: "legacy-api",
        message: legacyResult?.message || "Message sent successfully.",
    };
};
