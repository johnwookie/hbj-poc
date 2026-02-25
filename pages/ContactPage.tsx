import React, { useState, FormEvent } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Front-end placeholder only
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="bg-white min-h-screen py-24 px-4 border-b border-neutral-100">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="font-serif text-4xl md:text-5xl text-neutral-900 mb-6 tracking-tight">Ge in Touch</h1>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Whether you have questions about our certifications, enrollment timelines, or partnership opportunities, our academy team is here to assist.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">

                    {/* Contact Info Sidebar */}
                    <div className="flex flex-col gap-10">
                        <div>
                            <h2 className="text-2xl font-serif text-neutral-900 mb-8">Academy Details</h2>

                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 text-neutral-900">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-neutral-900 mb-1 tracking-wide">Email Us</h4>
                                    <p className="text-neutral-600 text-sm hover:text-rose-600 transition-colors cursor-pointer">
                                        admissions@hbj-academy.com
                                    </p>
                                    <p className="text-neutral-600 text-sm hover:text-rose-600 transition-colors cursor-pointer">
                                        support@hbj-academy.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 text-neutral-900">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-neutral-900 mb-1 tracking-wide">Global Headquarters</h4>
                                    <p className="text-neutral-600 text-sm">
                                        123 Aesthetic Avenue,<br />
                                        Gangnam-gu, Seoul 06000<br />
                                        South Korea
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 text-neutral-900">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-neutral-900 mb-1 tracking-wide">Phone Support</h4>
                                    <p className="text-neutral-600 text-sm hover:text-rose-600 transition-colors cursor-pointer">
                                        +82 2-123-4567
                                    </p>
                                    <p className="text-neutral-400 text-xs mt-1">
                                        Mon-Fri, 9am - 6pm KST
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-neutral-50 rounded-3xl p-8 lg:p-10 border border-neutral-100 shadow-sm">
                        <h3 className="text-2xl font-bold text-neutral-900 mb-6">Send a Message</h3>

                        {isSubmitted && (
                            <div className="bg-[#FEDCD0]/30 text-rose-900 px-4 py-3 rounded-xl text-sm font-medium mb-6 border border-[#FEDCD0]">
                                Thank you! Your message has been received. Our team will get back to you shortly. (This is a prototype confirmation).
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-neutral-900 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-neutral-900 transition-colors"
                                    placeholder="Jane Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-neutral-900 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-neutral-900 transition-colors"
                                    placeholder="jane@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-neutral-900 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-neutral-900 transition-colors resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-neutral-900 text-white font-bold py-4 rounded-xl mt-2 hover:bg-neutral-800 transition-colors flex justify-center items-center"
                            >
                                Submit Inquiry
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactPage;
