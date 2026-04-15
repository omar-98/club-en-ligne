import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, Trophy, Users, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-stadium.jpg";
import SectionTitle from "@/components/SectionTitle";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const latestNews = [
  { id: 1, title: "Victoire écrasante 3-0 contre l'AS Monaco", date: "12 Avr 2026", category: "Match" },
  { id: 2, title: "Recrutement : Un nouveau milieu de terrain rejoint l'équipe", date: "10 Avr 2026", category: "Transfert" },
  { id: 3, title: "Journée portes ouvertes au stade ce samedi", date: "8 Avr 2026", category: "Événement" },
];

const upcomingMatches = [
  { id: 1, opponent: "Olympique Lyonnais", date: "20 Avr 2026", time: "20:00", venue: "Domicile" },
  { id: 2, opponent: "FC Nantes", date: "27 Avr 2026", time: "17:00", venue: "Extérieur" },
];

const stats = [
  { icon: Trophy, value: "18", label: "Victoires" },
  { icon: Calendar, value: "24", label: "Matchs joués" },
  { icon: Users, value: "32", label: "Joueurs" },
];

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Stade FC Étoile Rouge en ambiance de match"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-background/50" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gradient-club leading-tight">
            FC ÉTOILE ROUGE
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-xl mx-auto">
            Passion, fierté et engagement depuis 1920
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              to="/matchs"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-md font-heading font-bold text-sm hover:bg-club-red-light transition-colors"
            >
              Prochains Matchs <ArrowRight size={16} />
            </Link>
            <Link
              to="/effectif"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-3 rounded-md font-heading font-bold text-sm hover:bg-secondary transition-colors"
            >
              Notre Effectif
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-secondary">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <s.icon className="mx-auto text-primary mb-3" size={36} />
              <div className="text-4xl font-bold font-heading text-foreground">{s.value}</div>
              <div className="text-muted-foreground text-sm mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Actualités */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="Dernières Actualités" subtitle="Toutes les nouvelles du club" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((news, i) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-card rounded-lg p-6 border border-border hover-lift cursor-pointer"
              >
                <span className="text-xs font-bold text-primary uppercase tracking-wider">{news.category}</span>
                <h3 className="text-lg font-bold text-foreground mt-2 font-heading">{news.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{news.date}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/actualites" className="text-primary font-heading font-bold text-sm hover:text-club-red-light transition-colors inline-flex items-center gap-1">
              Voir toutes les actualités <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Prochains matchs */}
      <section className="section-padding bg-secondary">
        <div className="max-w-4xl mx-auto">
          <SectionTitle title="Prochains Matchs" />
          <div className="space-y-4">
            {upcomingMatches.map((match, i) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-lg p-6 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="font-heading font-bold text-foreground text-lg">
                    FC Étoile Rouge vs {match.opponent}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {match.date} — {match.time} · {match.venue}
                  </div>
                </div>
                <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full font-bold">
                  À venir
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
