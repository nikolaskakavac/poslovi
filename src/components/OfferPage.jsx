import React from 'react';
import { Check, Sparkles, ShieldCheck, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const roles = [
  {
    name: 'Student',
    badge: 'Traži posao ili praksu',
    description: 'Pronađi savršenu praksu ili svoj prvi posao uz pomoć moderisanih oglasa.',
    features: [
      'Napredna pretraga oglasa',
      'Filtriranje po lokaciji, tipu i iskustvu',
      'Prijava na poslove i prakse',
      'CV upload i privatni profil',
      'Praćenje aplikacija'
    ]
  },
  {
    name: 'Alumni',
    badge: 'Karijeru gradim dalje',
    description: 'Putem za sve - od rasta u postojećoj karijeri do pokretanja своје priče.',
    features: [
      'Sve kao Student, plus:',
      'Objavljuj oglase za druge talente',
      'Pristup admin pregledu oglasa',
      'Privatne grupe i networking'
    ]
  },
  {
    name: 'Kompanija',
    badge: 'Zaposli talente',
    description: 'Postavi oglase i pronađi najbolje kandidate za tvoj tim brzo i efikasno.',
    features: [
      'Kreiraj i upravljaj oglasima',
      'Pregled prijava i kandidata',
      'Prate CV i portfolije',
      'Brendiranje kompanije',
      'Moderisani oglasi za kvalitet'
    ]
  }
];

const perks = [
  {
    title: 'Pametna pretraga',
    desc: 'Filtriraj po lokaciji, tipu angažmana i nivou iskustva za par sekundi.'
  },
  {
    title: 'Moderacija oglasa',
    desc: 'Svaki oglas prolazi admin proveru kako bi kvalitet ostao visok.'
  },
  {
    title: 'Brzi shortlist',
    desc: 'Kompanije lako porede kandidate i upravljaju prijavama u toku.'
  },
  {
    title: 'Bezbedan nalog',
    desc: 'JWT autentifikacija i verifikacija emaila cuvaju nalog sigurnim.'
  }
];

const featuredOffers = [
  {
    company: 'Yettel',
    title: 'Junior Network Engineer',
    location: 'Beograd',
    type: 'Full-time',
    level: 'Entry'
  },
  {
    company: 'Databricks',
    title: 'Data Platform Intern',
    location: 'Remote',
    type: 'Internship',
    level: 'Entry'
  },
  {
    company: 'Microsoft',
    title: 'Cloud Support Engineer',
    location: 'Novi Sad',
    type: 'Full-time',
    level: 'Mid'
  },
  {
    company: 'Microsoft',
    title: 'Software Engineer Intern',
    location: 'Beograd',
    type: 'Internship',
    level: 'Entry'
  }
];

const OfferPage = () => {
  return (
    <div className="bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0f766e_0%,transparent_55%)] opacity-60" />
        <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-amber-300 font-semibold tracking-widest uppercase text-xs">Ponuda</p>
            <h1 className="mt-4 text-4xl md:text-6xl font-display font-bold leading-tight">
              Jedna platforma za posao, praksu i prave talente.
            </h1>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              Jobzee spaja studente, alumni i kompanije kroz moderisane oglase, jasne
              tokove prijava i profile koji govore vise od CV-ja.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/"
                className="px-6 py-3 rounded-full bg-emerald-400 text-slate-900 font-semibold hover:bg-emerald-300 transition"
              >
                Postavi oglas
              </Link>
              <Link
                to="/jobs"
                className="px-6 py-3 rounded-full border border-white/20 text-white hover:border-white/60 transition"
              >
                Pretrazi oglase
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/60 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-emerald-300">
              <Sparkles size={20} />
              <span className="uppercase text-xs tracking-widest">Zasto Jobzee</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold">Kreirano za brze odluke.</h2>
            <p className="text-slate-300">
              Fokus na kvalitetne oglase i jasne informacije. Bez buke, bez spam oglasa.
              Sve sto je potrebno da zaposlis ili nadjes praksu nalazi se ovde.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {perks.map((perk) => (
              <div key={perk.title} className="rounded-2xl bg-slate-950/80 border border-white/5 p-5">
                <h3 className="font-semibold text-white mb-2">{perk.title}</h3>
                <p className="text-sm text-slate-300">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-emerald-300 uppercase text-xs tracking-widest">Uloge</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-semibold">Ko si? Šta želiš da postigneš?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <div
                key={role.name}
                className="rounded-3xl border border-white/10 bg-slate-900/40 p-8 flex flex-col hover:border-emerald-300/60 hover:bg-slate-900/60 transition"
              >
                <span className="text-xs uppercase tracking-widest text-emerald-300">{role.badge}</span>
                <h3 className="mt-4 text-2xl font-semibold">{role.name}</h3>
                <p className="mt-4 text-sm text-slate-300">{role.description}</p>
                <ul className="mt-6 space-y-3 text-sm flex-grow">
                  {role.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check size={16} className="text-emerald-300 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/"
                  className="mt-8 text-center px-5 py-3 rounded-full font-semibold bg-white/10 text-white hover:bg-emerald-300 hover:text-slate-900 transition"
                >
                  {role.name === 'Student' && 'Kreni besplatno'}
                  {role.name === 'Alumni' && 'Uloguj se kao Alumni'}
                  {role.name === 'Kompanija' && 'Postavi oglas'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950/90 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-emerald-300 uppercase text-xs tracking-widest">Aktuelni oglasi</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-semibold">
                Ponude od provjerenih kompanija
              </h2>
              <p className="mt-4 text-slate-300">
                Primjeri oglasa koji su trenutno aktivni na platformi.
              </p>
            </div>
            <Link
              to="/jobs"
              className="px-6 py-3 rounded-full border border-white/20 text-white hover:border-white/60 transition"
            >
              Vidi sve oglase
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredOffers.map((offer) => (
              <div
                key={`${offer.company}-${offer.title}`}
                className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 hover:border-emerald-300/60 hover:bg-slate-900/70 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-emerald-300">{offer.company}</span>
                  <span className="text-xs text-slate-400">{offer.location}</span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-white">{offer.title}</h3>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
                  <span className="px-3 py-1 rounded-full bg-white/10">{offer.type}</span>
                  <span className="px-3 py-1 rounded-full bg-white/10">{offer.level}</span>
                </div>
                <Link
                  to="/jobs"
                  className="mt-6 inline-flex items-center text-emerald-300 hover:text-emerald-200 font-semibold"
                >
                  Pogledaj oglas
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900/70 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-slate-950/70 p-6 border border-white/5">
              <Rocket className="text-emerald-300" />
              <h3 className="mt-4 text-xl font-semibold">Brz onboarding</h3>
              <p className="text-sm text-slate-300 mt-2">Postavljanje profila traje manje od 10 minuta.</p>
            </div>
            <div className="rounded-2xl bg-slate-950/70 p-6 border border-white/5">
              <ShieldCheck className="text-emerald-300" />
              <h3 className="mt-4 text-xl font-semibold">Sigurna infrastruktura</h3>
              <p className="text-sm text-slate-300 mt-2">Oglasi su verifikovani, podaci zasticeni.</p>
            </div>
            <div className="rounded-2xl bg-slate-950/70 p-6 border border-white/5">
              <Sparkles className="text-emerald-300" />
              <h3 className="mt-4 text-xl font-semibold">Bolji match</h3>
              <p className="text-sm text-slate-300 mt-2">AI-ready profili za precizniji izbor kandidata.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OfferPage;
