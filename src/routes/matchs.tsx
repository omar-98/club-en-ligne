import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";

export const Route = createFileRoute("/matchs")({
  head: () => ({
    meta: [
      { title: "Matchs — FC Étoile Rouge" },
      { name: "description", content: "Calendrier et résultats des matchs du FC Étoile Rouge." },
      { property: "og:title", content: "Matchs — FC Étoile Rouge" },
      { property: "og:description", content: "Calendrier et résultats des matchs." },
    ],
  }),
  component: MatchsPage,
});

const upcoming = [
  { id: 1, opponent: "Olympique Lyonnais", date: "20 Avr 2026", time: "20:00", venue: "Domicile", competition: "Ligue 1" },
  { id: 2, opponent: "FC Nantes", date: "27 Avr 2026", time: "17:00", venue: "Extérieur", competition: "Ligue 1" },
  { id: 3, opponent: "RC Strasbourg", date: "4 Mai 2026", time: "20:45", venue: "Domicile", competition: "Coupe de France" },
  { id: 4, opponent: "Stade Rennais", date: "11 Mai 2026", time: "15:00", venue: "Extérieur", competition: "Ligue 1" },
];

const results = [
  { id: 1, opponent: "AS Monaco", date: "12 Avr 2026", scoreHome: 3, scoreAway: 0, venue: "Domicile" },
  { id: 2, opponent: "LOSC Lille", date: "5 Avr 2026", scoreHome: 2, scoreAway: 1, venue: "Extérieur" },
  { id: 3, opponent: "OGC Nice", date: "29 Mar 2026", scoreHome: 1, scoreAway: 1, venue: "Domicile" },
  { id: 4, opponent: "Toulouse FC", date: "22 Mar 2026", scoreHome: 4, scoreAway: 2, venue: "Domicile" },
  { id: 5, opponent: "Montpellier HSC", date: "15 Mar 2026", scoreHome: 0, scoreAway: 2, venue: "Extérieur" },
];

function MatchsPage() {
  return (
    <div className="section-padding">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title="Matchs" subtitle="Calendrier et résultats" />

        {/* Upcoming */}
        <h3 className="text-2xl font-bold font-heading text-foreground mb-6">Matchs à venir</h3>
        <div className="space-y-3 mb-16">
          {upcoming.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-lg p-5 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex-1">
                <div className="font-heading font-bold text-foreground">
                  FC Étoile Rouge vs {m.opponent}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {m.date} — {m.time} · {m.venue}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-secondary text-muted-foreground px-3 py-1 rounded-full">{m.competition}</span>
                <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full font-bold">À venir</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Results */}
        <h3 className="text-2xl font-bold font-heading text-foreground mb-6">Résultats</h3>
        <div className="space-y-3">
          {results.map((m, i) => {
            const won = m.scoreHome > m.scoreAway;
            const draw = m.scoreHome === m.scoreAway;
            const lost = m.scoreHome < m.scoreAway;
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-lg p-5 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex-1">
                  <div className="font-heading font-bold text-foreground">
                    FC Étoile Rouge vs {m.opponent}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {m.date} · {m.venue}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-heading font-bold text-2xl text-foreground">
                    {m.scoreHome} - {m.scoreAway}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                    won ? "bg-pitch/20 text-pitch" : draw ? "bg-club-gold/20 text-club-gold" : "bg-destructive/20 text-destructive"
                  }`}>
                    {won ? "V" : draw ? "N" : "D"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
