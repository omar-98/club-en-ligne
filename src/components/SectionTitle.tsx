import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">
        {title}
      </h2>
      <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
      {subtitle && (
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
}
