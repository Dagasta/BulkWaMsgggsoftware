'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-slate-gray hover:text-trust-blue transition-colors mb-4"
        >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
        </button>
    );
}
