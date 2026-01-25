import {
    Code2,
    Users,
    Clock,
    Star,
    MessageCircle,
    Github,
    Linkedin,
    Mail,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { generateWhatsAppLinkGeneral } from '@/lib/whatsapp';

const stats = [
    { value: '5+', label: 'Tahun Pengalaman' },
    { value: '200+', label: 'Klien Puas' },
    { value: '50+', label: 'Produk Dibuat' },
    { value: '24/7', label: 'Support' },
];

const principles = [
    {
        icon: Clock,
        title: 'Fast Response',
        description: 'Respons cepat dalam hitungan jam, bukan hari. Konsultasi gratis tanpa komitmen.',
    },
    {
        icon: CheckCircle2,
        title: 'No BS',
        description: 'Transparan dalam harga dan timeline. Tidak ada biaya tersembunyi.',
    },
    {
        icon: Star,
        title: 'Fair Pricing',
        description: 'Harga terjangkau untuk kualitas premium. One-time payment, lifetime license.',
    },
];

const skills = [
    'Next.js', 'React', 'TypeScript', 'Tailwind CSS',
    'Node.js', 'Express', 'Supabase', 'PostgreSQL',
    'MongoDB', 'Firebase', 'Flutter', 'Dart',
    'Laravel', 'PHP', 'MySQL', 'REST API',
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-violet-950/20 dark:via-gray-950 dark:to-indigo-950/20"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-violet-400/20 to-indigo-400/20 dark:from-violet-600/10 dark:to-indigo-600/10 rounded-full blur-3xl"></div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
                    {/* Avatar */}
                    <div className="mb-8">
                        <div className="inline-flex p-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/50 dark:to-indigo-900/50 flex items-center justify-center">
                                <Code2 className="h-16 w-16 text-violet-500 dark:text-violet-400" />
                            </div>
                        </div>
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Halo, Saya <span className="gradient-text">Ahmad</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Guru TIK yang juga indie developer. Sejak 2018, saya membuat tools untuk memudahkan
                        pekerjaan saya dan rekan guru. Sekarang saya share ke publik.
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center justify-center space-x-4 mb-12">
                        <a
                            href="#"
                            className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors"
                        >
                            <Github className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                        </a>
                        <a
                            href="#"
                            className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors"
                        >
                            <Linkedin className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                        </a>
                        <a
                            href="mailto:ahmad@sellappku.com"
                            className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors"
                        >
                            <Mail className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl lg:text-4xl font-bold gradient-text mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="py-24 bg-white dark:bg-gray-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        Cerita Saya
                    </h2>
                    <div className="prose prose-lg prose-gray max-w-none">
                        <p className="text-gray-600 dark:text-gray-400">
                            Perjalanan saya dimulai dari kebutuhan pribadi. Sebagai guru TIK di sebuah sekolah swasta,
                            saya sering menemui masalah administrasi yang memakan waktu: absensi manual, laporan nilai
                            yang harus diketik ulang, dan berbagai tugas repetitif lainnya.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Daripada mengeluh, saya memutuskan untuk belajar coding. Satu per satu, saya membuat
                            aplikasi kecil untuk membantu pekerjaan saya. Hasilnya? Waktu kerja berkurang drastis,
                            dan saya punya lebih banyak waktu untuk mengajar.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Rekan-rekan guru mulai tertarik. Beberapa sekolah lain juga meminta dibuatkan aplikasi serupa.
                            Dari situlah <span className="font-semibold text-violet-600 dark:text-violet-400">Sellappku</span> lahir —
                            tempat saya menjual source code yang sudah teruji dan siap pakai.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Saya percaya setiap orang berhak mendapat tools yang memudahkan hidup mereka, tanpa harus
                            bayar mahal atau terikat langganan bulanan. Itu kenapa saya menawarkan lisensi lifetime —
                            bayar sekali, pakai selamanya.
                        </p>
                    </div>
                </div>
            </section>

            {/* Principles */}
            <section className="py-24 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                        Prinsip Kerja Saya
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {principles.map((principle, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-transparent dark:border-gray-800"
                            >
                                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 mb-6">
                                    <principle.icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    {principle.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {principle.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section className="py-24 bg-white dark:bg-gray-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Tech Stack
                    </h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {skills.map((skill, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300 font-medium"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-gradient-to-br from-violet-600 via-indigo-600 to-violet-700 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Users className="h-16 w-16 mx-auto mb-6 text-white/80" />
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                        Mari Bekerja Sama
                    </h2>
                    <p className="text-lg text-violet-100 mb-8 max-w-2xl mx-auto">
                        Punya proyek yang ingin diwujudkan? Atau butuh customization untuk produk yang ada?
                        Saya siap membantu.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={generateWhatsAppLinkGeneral()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn bg-white text-violet-600 hover:bg-violet-50"
                        >
                            <MessageCircle className="mr-2 h-5 w-5" />
                            Chat via WhatsApp
                        </a>
                        <Link
                            href="/products"
                            className="btn bg-white/10 text-white hover:bg-white/20 border border-white/20"
                        >
                            Lihat Produk
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
