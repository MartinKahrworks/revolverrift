import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import Footer from "../Footer/Footer";
import fireVideo from '../../assets/embers_background.gif';
import { getContactPageData, FALLBACK_CONTACT_DATA } from "../../api/contactApi";

function Contact() {
    const [formData, setFormData] = useState({});
    const [cmsData, setCmsData] = useState(FALLBACK_CONTACT_DATA);

    useEffect(() => {
        const fetchCMS = async () => {
            const data = await getContactPageData();
            setCmsData(data);

            // Initialize form state based on dynamic fields
            const initialForm = {};
            data.formFields.forEach(field => {
                initialForm[field.name] = "";
            });
            setFormData(initialForm);
        };
        fetchCMS();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Form is valid if all required CMS fields are filled
    const isFormValid = cmsData.formFields.every(field => {
        if (!field.isRequired) return true;
        return formData[field.name] && formData[field.name].trim() !== "";
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            alert(result.message || cmsData.successMessage);

            // Reset form based on dynamic fields
            const resetForm = {};
            cmsData.formFields.forEach(field => {
                resetForm[field.name] = "";
            });
            setFormData(resetForm);
        } catch (error) {
            console.error("Error sending email:", error);
            alert(cmsData.errorMessage);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col justify-between bg-black text-white font-sans overflow-x-hidden">

            {/* Background Animation */}
            <div className="fixed inset-0 z-0">
                <img
                    src={fireVideo}
                    alt="Background Embers"
                    className="w-full h-full object-cover opacity-50 mix-blend-screen pointer-events-none"
                />
                <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex-grow flex items-center justify-center py-24 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-2xl relative"
                >
                    {/* Decorative Top Accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff3333] to-transparent opacity-70"></div>

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-[Cinzel] font-bold text-white tracking-widest mb-2 uppercase">
                            {cmsData.title}
                        </h1>
                        <p className="text-[#ff3333] text-xs font-mono tracking-[0.3em] uppercase">
                            {cmsData.subtitle}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        {/* Dynamic Render of CMS Fields */}
                        {cmsData.formFields.map((field) => (
                            <div key={field.id}>
                                {field.inputType === "textarea" ? (
                                    <textarea
                                        name={field.name}
                                        placeholder={field.placeholder + (field.isRequired ? " *" : "")}
                                        value={formData[field.name] || ""}
                                        onChange={handleChange}
                                        required={field.isRequired}
                                        rows={5}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-[#ff3333] focus:bg-white/10 focus:outline-none transition-all duration-300 placeholder-white/30 font-mono text-xs tracking-wider resize-none"
                                    />
                                ) : (
                                    <input
                                        type={field.inputType}
                                        name={field.name}
                                        placeholder={field.placeholder + (field.isRequired ? " *" : "")}
                                        value={formData[field.name] || ""}
                                        onChange={handleChange}
                                        required={field.isRequired}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-[#ff3333] focus:bg-white/10 focus:outline-none transition-all duration-300 placeholder-white/30 font-mono text-xs tracking-wider"
                                    />
                                )}
                            </div>
                        ))}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={`
                                mt-4 w-full py-4 uppercase tracking-[0.2em] font-bold text-xs transition-all duration-300 border border-transparent
                                ${isFormValid
                                    ? "bg-[#ff3333] text-white hover:bg-transparent hover:border-[#ff3333] hover:text-[#ff3333] cursor-pointer shadow-[0_0_15px_rgba(255,51,51,0.3)]"
                                    : "bg-white/10 text-white/30 cursor-not-allowed"
                                }
                            `}
                        >
                            {cmsData.submitButtonText}
                        </button>
                    </form>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
}

export default Contact;