import { createFileRoute } from "@tanstack/react-router";
import { PublicGallery } from "@/components/public/PublicGallery";

export const Route = createFileRoute("/actualites")({
  head: () => ({
    meta: [
      { title: "Actualités — FCAZ" },
      { name: "description", content: "Toutes les actualités du FC Ait Zeggane." },
      { property: "og:title", content: "Actualités — FCAZ" },
      { property: "og:description", content: "Les nouvelles du club." },
    ],
  }),
  component: ActualitesPage,
});

function ActualitesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Actualités</h1>
          <p className="text-gray-600 text-lg">
            Les dernières nouvelles du FC Ait Zeggane
          </p>
        </div>
        <PublicGallery />
      </div>
    </div>
  );
}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <motion.article key={a.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-gradient-card rounded-lg overflow-hidden border border-border hover-lift">
              <div className="h-2 bg-primary" />
              <div className="p-6">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">{a.category}</span>
                <h3 className="text-lg font-bold text-foreground mt-2 font-heading leading-tight">{a.title}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{a.excerpt}</p>
                <p className="text-xs text-muted-foreground mt-4">{a.date}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
