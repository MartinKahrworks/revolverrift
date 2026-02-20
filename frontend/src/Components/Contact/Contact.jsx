import Footer from "../Footer/Footer";
import { useState } from "react";
import bgImage from '../../assets/Texturelabs_Grunge_353M.webp';


function Contact (){

    const [formData, setFormData] = useState({ name: "", email: "", comment: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isFormValid = formData.name && formData.email && formData.comment;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            alert(result.message || "Email sent successfully!");
            } catch (error) {
                console.error("Error sending email:", error);
                alert("Failed to send message. Try again.");
            }
        };
    return(
        <div className="bg-black py-48 h-screen w-screen bg-cover bg-fixed"
         style={{ backgroundImage: `url(${bgImage})` }}
        >
           <form
           onSubmit={handleSubmit}
           className="max-w-xl mx-auto p-6 bg-[#1E1E1E] border border-[#AA0000] shadow-lg rounded-2xl">
                <div className="flex flex-col gap-8 p-8">
                    <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-blue-500 transition"
                    />
                    <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-blue-500 transition"
                    />
                    <textarea
                    name="comment"
                    id="comment"
                    placeholder="Comment"
                    value={formData.comment}
                    onChange={handleChange}
                    rows={5}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-blue-500 transition resize-y"
                    />
                    <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`font-semibold rounded-lg px-4 py-2 shadow-md transition duration-200 ${
                        isFormValid
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-400 text-gray-700 cursor-not-allowed"
                        }`}  
                    >
                    Submit
                    </button>
                </div>
            </form>

            <Footer />
        </div>
    )
}

export default Contact;