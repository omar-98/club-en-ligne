import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie — FCAZ" },
      { name: "description", content: "Photos et moments forts du FC Ait Zeggane." },
      { property: "og:title", content: "Galerie — FCAZ" },
      { property: "og:description", content: "Photos du club." },
    ],
  }),
  component: GaleriePage,
});

const categories = ["Tout", "Matchs", "Entraînements", "Événements"];

const photos = [
  { id: 1, category: "Matchs", caption: "Celebration après le but décisif", color: "from-primary/40 to-primary/10" },
  { id: 2, category: "Entraînements", caption: "Séance tactique du mardi", color: "from-pitch/40 to-pitch/10" },
  { id: 3, category: "Événements", caption: "Journée des supporters", color: "from-club-gold/40 to-club-gold/10" },
  { id: 4, category: "Matchs", caption: "Tifo des ultras au derby", color: "from-primary/40 to-club-dark/20" },
  { id: 5, category: "Entraînements", caption: "Préparation physique d'avant-saison", color: "from-pitch/30 to-pitch/10" },
  { id: 6, category: "Matchs", caption: "Victoire en coupe 2-0", color: "from-primary/30 to-primary/5" },
  { id: 7, category: "Événements", caption: "Remise des maillots 2025/2026", color: "from-club-gold/30 to-club-gold/5" },
  { id: 8, category: "Matchs", caption: "Ambiance stade sous les projecteurs", color: "from-primary/50 to-club-dark/20" },
  { id: 9, category: "Entraînements", caption: "Les jeunes du centre de formation", color: "from-pitch/40 to-pitch/5" },
];

function GaleriePage() {
  const [filter, setFilter] = useState("Tout");
  const filtered = filter === "Tout" ? photos : photos.filter((p) => p.category === filter);

  return (
    <div className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Galerie" subtitle="Les moments forts du club" />

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm font-heading font-bold transition-colors ${
                filter === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden hover-lift cursor-pointer group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${photo.color}`} />
              <div className="absolute inset-0 bg-secondary/50 flex items-center justify-center">
                <span className="font-heading text-4xl font-bold text-foreground/20">{photo.id}</span>
              </div>
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-colors flex items-end p-4">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-primary font-bold uppercase">{photo.category}</span>
                  <p className="text-sm text-foreground font-heading font-bold mt-1">{photo.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
