import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";

export const Route = createFileRoute("/classement")({
  head: () => ({
    meta: [
      { title: "Classement — FC Étoile Rouge" },
      { name: "description", content: "Classement et performances du FC Étoile Rouge." },
      { property: "og:title", content: "Classement — FC Étoile Rouge" },
      { property: "og:description", content: "Classement et performances de l'équipe." },
    ],
  }),
  component: ClassementPage,
});

const standings = [
  { pos: 1, team: "Paris SG", pts: 62, w: 20, d: 2, l: 2, gf: 58, ga: 15 },
  { pos: 2, team: "FC Étoile Rouge", pts: 55, w: 18, d: 1, l: 5, gf: 50, ga: 22 },
  { pos: 3, team: "Olympique Lyonnais", pts: 50, w: 15, d: 5, l: 4, gf: 45, ga: 25 },
  { pos: 4, team: "AS Monaco", pts: 48, w: 14, d: 6, l: 4, gf: 42, ga: 23 },
  { pos: 5, team: "LOSC Lille", pts: 45, w: 13, d: 6, l: 5, gf: 38, ga: 20 },
  { pos: 6, team: "OGC Nice", pts: 42, w: 12, d: 6, l: 6, gf: 35, ga: 28 },
  { pos: 7, team: "Stade Rennais", pts: 39, w: 11, d: 6, l: 7, gf: 32, ga: 30 },
  { pos: 8, team: "RC Strasbourg", pts: 36, w: 10, d: 6, l: 8, gf: 30, ga: 32 },
];

function ClassementPage() {
  return (
    <div className="section-padding">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="Classement" subtitle="Ligue 1 — Saison 2025/2026" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg border border-border overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary text-muted-foreground">
                  <th className="text-left py-3 px-4 font-heading font-bold">#</th>
                  <th className="text-left py-3 px-4 font-heading font-bold">Équipe</th>
                  <th className="text-center py-3 px-4 font-heading font-bold">V</th>
                  <th className="text-center py-3 px-4 font-heading font-bold">N</th>
                  <th className="text-center py-3 px-4 font-heading font-bold">D</th>
                  <th className="text-center py-3 px-4 font-heading font-bold">BP</th>
                  <th className="text-center py-3 px-4 font-heading font-bold">BC</th>
                  <th className="text-center py-3 px-4 font-heading font-bold">Pts</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((t) => (
                  <tr
                    key={t.pos}
                    className={`border-t border-border transition-colors hover:bg-secondary/50 ${
                      t.team === "FC Étoile Rouge" ? "bg-primary/10" : ""
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-muted-foreground">{t.pos}</td>
                    <td className={`py-3 px-4 font-heading font-bold ${
                      t.team === "FC Étoile Rouge" ? "text-primary" : "text-foreground"
                    }`}>
                      {t.team}
                    </td>
                    <td className="py-3 px-4 text-center text-foreground">{t.w}</td>
                    <td className="py-3 px-4 text-center text-foreground">{t.d}</td>
                    <td className="py-3 px-4 text-center text-foreground">{t.l}</td>
                    <td className="py-3 px-4 text-center text-foreground">{t.gf}</td>
                    <td className="py-3 px-4 text-center text-foreground">{t.ga}</td>
                    <td className="py-3 px-4 text-center font-bold text-foreground">{t.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
