import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";

export const Route = createFileRoute("/historique")({
  head: () => ({
    meta: [
      { title: "Historique — FC Étoile Rouge" },
      { name: "description", content: "L'histoire et les résultats passés du FC Étoile Rouge." },
      { property: "og:title", content: "Historique — FC Étoile Rouge" },
      { property: "og:description", content: "Parcours historique du club." },
    ],
  }),
  component: HistoriquePage,
});

const seasons = [
  {
    year: "2024/2025",
    results: [
      { opponent: "Paris SG", score: "1-3", result: "D" },
      { opponent: "OL", score: "2-1", result: "V" },
      { opponent: "AS Monaco", score: "0-0", result: "N" },
      { opponent: "LOSC", score: "3-2", result: "V" },
      { opponent: "OGC Nice", score: "1-2", result: "D" },
    ],
    finalPosition: "4ème",
  },
  {
    year: "2023/2024",
    results: [
      { opponent: "Paris SG", score: "0-2", result: "D" },
      { opponent: "OL", score: "1-1", result: "N" },
      { opponent: "RC Lens", score: "3-0", result: "V" },
      { opponent: "Stade Rennais", score: "2-2", result: "N" },
      { opponent: "OM", score: "2-1", result: "V" },
    ],
    finalPosition: "6ème",
  },
  {
    year: "2022/2023",
    results: [
      { opponent: "Paris SG", score: "1-4", result: "D" },
      { opponent: "AS Monaco", score: "2-0", result: "V" },
      { opponent: "FC Nantes", score: "1-1", result: "N" },
      { opponent: "LOSC", score: "0-1", result: "D" },
      { opponent: "RC Strasbourg", score: "3-1", result: "V" },
    ],
    finalPosition: "5ème",
  },
];

const trophies = [
  { year: "2021", title: "Coupe de France" },
  { year: "2018", title: "Champion de Ligue 2" },
  { year: "2015", title: "Coupe de la Ligue (Finaliste)" },
  { year: "2010", title: "Champion Régional" },
];

function HistoriquePage() {
  return (
    <div className="section-padding">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title="Historique" subtitle="Le parcours du club à travers les saisons" />

        {/* Palmarès */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold font-heading text-foreground mb-6">Palmarès</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {trophies.map((t, i) => (
              <motion.div
                key={t.year + t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-card rounded-lg border border-border p-5 text-center border-glow"
              >
                <div className="text-club-gold font-heading font-bold text-2xl">{t.year}</div>
                <div className="text-sm text-foreground mt-2 font-heading">{t.title}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Saisons */}
        {seasons.map((season, si) => (
          <motion.div
            key={season.year}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: si * 0.1 }}
            className="mb-10"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold font-heading text-foreground">Saison {season.year}</h3>
              <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full font-bold">
                {season.finalPosition}
              </span>
            </div>
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              {season.results.map((r, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-3 border-b border-border last:border-0">
                  <span className="text-sm text-foreground font-heading">vs {r.opponent}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-heading font-bold text-foreground">{r.score}</span>
                    <span className={`text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                      r.result === "V" ? "bg-pitch/20 text-pitch" : r.result === "N" ? "bg-club-gold/20 text-club-gold" : "bg-destructive/20 text-destructive"
                    }`}>
                      {r.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
