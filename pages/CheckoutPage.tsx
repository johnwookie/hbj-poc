import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

const CheckoutPage: React.FC = () => {
    return (
        <div className="bg-neutral-50 flex-grow py-16 px-4">
            <div className="max-w-4xl mx-auto flex flex-col items-center">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-4">Secure Checkout</h1>
                    <p className="text-neutral-500 font-medium flex items-center justify-center gap-2">
                        <Lock size={16} /> End-to-end encrypted payment
                    </p>
                </div>

                {/* Order Summary Card */}
                <div className="bg-white w-full max-w-lg rounded-2xl shadow-sm border border-neutral-200 overflow-hidden mb-8">
                    <div className="p-6 md:p-8 bg-neutral-900 text-white">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#FEDCD0] mb-2">Selected Course</h3>
                        <h2 className="font-serif text-2xl leading-tight">Advanced Aesthetic Injectables Certification</h2>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="flex justify-between items-end mb-6 pb-6 border-b border-neutral-100">
                            <div className="text-neutral-500 font-medium">12-Week Hybrid Program</div>
                            <div className="text-2xl font-bold text-neutral-900">$4,500</div>
                        </div>

                        <div className="flex items-start gap-4 text-sm text-neutral-600 mb-8 bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                            <ShieldCheck className="flex-shrink-0 text-emerald-600" size={24} />
                            <p>
                                By proceeding, you will be redirected to our secure Stripe checkout portal to finalize your enrollment and secure your cohort seat.
                            </p>
                        </div>

                        <button
                            disabled
                            className="w-full py-4 rounded-xl font-bold bg-neutral-200 text-neutral-400 cursor-not-allowed flex items-center justify-center gap-2 transition-colors relative group"
                        >
                            Proceed to Payment

                            {/* Tooltip for disabled state */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-xs px-3 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                Payment gateway connection pending
                            </div>
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default CheckoutPage;
