/*
  The Current's Edge — Single-file React landing page
  Clone of pasteapp.io, customized for your YA Neo-African Futuristic Book.
  - Uses TailwindCSS, Framer Motion, Lucide React icons.
  - Drop into Next.js/CRA/Vite.
  - Replace placeholder info with your own.
  - Mailing list + purchase are stubbed with localStorage.
  - Animations and structure closely follow the pasteapp.io style.
  Install:
    npm install framer-motion lucide-react
*/

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, ShoppingCart, ArrowRight } from 'lucide-react';

export default function BookMicrosite() {
  // --- Replace these with your real content ---
  const BOOK = {
    title: "The Current's Edge",
    subtitle: "A luminous, mythic YA novel where rivers hold memory and power flows through bloodlines.",
    cover: null as string | null, // TODO: Replace with cover image URL or import
    buyLink: '#', // TODO: Replace with real buy/preorder link
    excerpt: `"The river spoke in frequencies she couldn't name but somehow understood. 
Amara pressed her palms against the smooth stone of the riverbank, feeling 
the vibration travel up through her bones. This was the inheritance her 
grandmother had tried to prepare her for—not just the land, but the 
responsibility that came with being able to hear what the water remembered.

'Every current tells a story,' her grandmother had said. 'But not every 
story is meant to be changed.'

Now, with the developers' machines growing louder each day and the river's 
voice growing more urgent, Amara understood that some stories demanded to 
be rewritten—even if the cost was everything she thought she knew about home."`,
    author: {
      name: 'Musole Kambinda', // TODO: Replace with your name
      bio: "Writer. Explorer of environmental justice and cultural preservation. Telling stories where land, memory, and identity collide.",
      photo: null as string | null, // TODO: Replace with author photo URL or import
    },
  };

  // --- scroll / parallax ---
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, -60]);
  const y2 = useTransform(scrollY, [0, 800], [0, -120]);

  // --- local state ---
  const [showExcerpt, setShowExcerpt] = useState(false);
  const [mail, setMail] = useState('');
  const [saved, setSaved] = useState(false);
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleMailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!mail || !mail.includes('@')) return alert('Enter a real email');
    // stub: save to localStorage
    const list = JSON.parse(localStorage.getItem('book_mailing_list') || '[]') as Array<{ email: string; at: string }>;
    list.unshift({ email: mail, at: new Date().toISOString() });
    localStorage.setItem('book_mailing_list', JSON.stringify(list));
    setSaved(true);
    setMail('');
    setTimeout(() => setSaved(false), 2500);
  }

  // simple smooth anchor scroller
  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // reveal animation variants
  const reveal = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  } as const;

  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-slate-50 to-white text-slate-800" ref={ref}>
      {/* NAVBAR */}
      <nav className={`fixed inset-x-0 top-4 z-50 transition-all ${navSolid ? 'backdrop-blur bg-white/60 shadow-sm' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center text-white font-bold">CE</div>
            <div className="text-sm font-medium">{BOOK.title}</div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => scrollToId('about')} className="text-sm hover:underline">About</button>
            <button onClick={() => scrollToId('excerpt')} className="text-sm hover:underline">Excerpt</button>
            <button onClick={() => scrollToId('buy')} className="text-sm hover:underline">Buy</button>
            <a href={BOOK.buyLink} className="ml-2 inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-slate-900 text-white text-sm">Buy <ShoppingCart size={14} /></a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-12 gap-6 items-center">
          <motion.div className="col-span-12 md:col-span-7" style={{ y: y1 }}>
            <motion.h1 initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-5xl md:text-6xl leading-tight font-extrabold tracking-tight">
              {BOOK.title}
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-4 text-lg text-slate-600 max-w-xl">
              {BOOK.subtitle}
            </motion.p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => scrollToId('buy')} className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-500 text-white font-semibold shadow hover:translate-y-[-2px] transition-transform">
                Buy the Book <ArrowRight size={16} />
              </button>
              <button onClick={() => setShowExcerpt(true)} className="px-4 py-3 rounded-lg border">Read an Excerpt</button>
              <button onClick={() => scrollToId('signup')} className="px-4 py-3 rounded-lg border inline-flex items-center gap-2"><Mail size={14}/> Join the List</button>
            </div>
            <motion.div className="mt-6 text-xs text-slate-400">
              <span className="inline-block mr-2">⭐️⭐️⭐️⭐️⭐️ Early reviews</span>
              <span>“A river that remembers—beautiful and fierce.” — Advance Reader</span>
            </motion.div>
          </motion.div>
          <motion.div className="col-span-12 md:col-span-5 flex justify-center" style={{ y: y2 }}>
            <div className="w-60 md:w-72 lg:w-80 rounded-xl overflow-hidden shadow-2xl bg-white">
              {/* Replace with actual cover image */}
              {BOOK.cover ? (
                <img src={BOOK.cover} alt="Book cover" className="aspect-[2/3] object-cover w-full" />
              ) : (
                <div className="aspect-[2/3] bg-gradient-to-br from-sky-200 to-emerald-100 flex items-end p-6">
                  <div>
                    <div className="text-sm text-slate-700 font-semibold">Cover mockup</div>
                    <div className="text-xs text-slate-500 mt-1">Drop in your cover image</div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
        {/* subtle animated river background (SVG) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
          <motion.svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-40" style={{ y: useTransform(scrollY, [0, 400], [0, -30]) }}>
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.08" />
              </linearGradient>
            </defs>
            <path d="M0,160 C200,120 400,200 720,150 C1040,100 1200,180 1440,140 L1440,200 L0,200 Z" fill="url(#g1)" />
          </motion.svg>
        </div>
      </header>

      {/* ABOUT / FEATURES */}
      <section id="about" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ show: { transition: { staggerChildren: 0.14 }}}}>
            <motion.h2 variants={reveal} className="text-3xl font-semibold">About the story</motion.h2>
            <motion.p variants={reveal} className="mt-4 text-slate-600 max-w-3xl">
              Set in a world where rivers hold memory and power flows through bloodlines, <em className="text-emerald-500">The Current's Edge</em> follows Amara as she navigates the intersection of tradition and survival, discovering that some inheritances demand everything.
            </motion.p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Inheritance', desc: 'Amara inherits more than land—she receives ancestral knowledge and the burden of choice.' },
                { title: 'Displacement', desc: 'When home becomes contested ground, every decision carries the risk of losing what matters most.' },
                { title: 'Language', desc: 'The river speaks in frequencies older than words, teaching those who learn to listen.' },
              ].map((c) => (
                <motion.div key={c.title} variants={reveal} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-lg font-semibold">{c.title}</div>
                  <div className="mt-2 text-slate-500">{c.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* EXCERPT */}
      <section id="excerpt" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-4">
            <motion.h3 variants={reveal} className="text-2xl font-semibold">An Excerpt</motion.h3>
            <motion.div variants={reveal} className="prose max-w-none text-slate-700 whitespace-pre-line">{BOOK.excerpt}</motion.div>
            <div className="mt-4">
              <button onClick={() => setShowExcerpt(true)} className="px-4 py-2 rounded border">Read more</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* REVIEWS / PULLQUOTES */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h4 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-xl font-semibold">Early Praise</motion.h4>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              "A mesmerizing blend of magical realism and environmental urgency. The Current's Edge flows with the power of tradition and the necessity of change.",
              "Amara's journey through inheritance and identity resonates with profound truth. This book will stay with you like the sound of running water.",
              "A powerful meditation on land, legacy, and the languages we inherit. Essential reading for our time.",
            ].map((q, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="italic text-slate-700">"{q}"</div>
                <div className="mt-4 text-xs text-slate-500">— Advance reader</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BUY / SIGNUP */}
      <section id="buy" className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="text-3xl font-semibold">Get a copy</motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-3 text-slate-600">
              Available in paperback, ebook, and audiobook. Preorder opens soon — sign up to get updates and limited edition extras.
            </motion.p>
            <div className="mt-6 flex gap-3">
              <a href={BOOK.buyLink} className="px-5 py-3 rounded-lg bg-emerald-500 text-white font-semibold inline-flex items-center gap-2">Buy now <ShoppingCart size={14} /></a>
              <button onClick={() => scrollToId('signup')} className="px-5 py-3 rounded-lg border">Join the list</button>
            </div>
          </div>
          <div>
            <motion.form onSubmit={handleMailSubmit} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-sm font-medium">Join the mailing list</div>
              <div className="mt-3 flex gap-2">
                <input value={mail} onChange={e => setMail(e.target.value)} placeholder="you@domain.com" className="flex-1 border rounded px-3 py-2" />
                <button type="submit" className="px-3 py-2 rounded bg-slate-900 text-white">Subscribe</button>
              </div>
              {saved && <div className="mt-3 text-sm text-emerald-600">Thanks — you’re on the list.</div>}
            </motion.form>
          </div>
        </div>
      </section>

      {/* AUTHOR */}
      <section className="py-20" id="signup">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6 items-center">
          <div className="col-span-1">
            {BOOK.author.photo ? (
              <img src={BOOK.author.photo} alt={BOOK.author.name} className="w-40 h-40 rounded-full object-cover" />
            ) : (
              <div className="w-40 h-40 rounded-full bg-slate-200 flex items-center justify-center text-4xl text-slate-400">Photo</div>
            )}
          </div>
          <div className="col-span-2">
            <h5 className="text-xl font-semibold">{BOOK.author.name}</h5>
            <p className="mt-2 text-slate-600">{BOOK.author.bio}</p>
            <div className="mt-4 flex gap-3">
              <a className="px-4 py-2 rounded border cursor-pointer">Contact</a>
              <a className="px-4 py-2 rounded border cursor-pointer">Events</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 text-sm text-slate-500 flex justify-between items-center">
          <div>© {new Date().getFullYear()} {BOOK.author.name}</div>
          <div className="flex gap-4">
            <a className="hover:underline cursor-pointer">Privacy</a>
            <a className="hover:underline cursor-pointer">Terms</a>
          </div>
        </div>
      </footer>

      {/* Excerpt modal (client-side) */}
      {showExcerpt && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-3xl w-full bg-white rounded-xl p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <h4 className="text-lg font-semibold">Excerpt — {BOOK.title}</h4>
              <button onClick={() => setShowExcerpt(false)} className="text-slate-500">Close</button>
            </div>
            <div className="mt-4 prose whitespace-pre-line">
              <p>{BOOK.excerpt}</p>
              <p>— continued —</p>
              <p className="mt-4 text-slate-500 text-sm">(This is a placeholder excerpt. Replace with your full excerpt or integrate your CMS/MDX.)</p>
            </div>
            <div className="mt-6 flex justify-end">
              <a href={BOOK.buyLink} className="px-4 py-2 rounded bg-emerald-500 text-white">Buy the Book</a>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

