import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import baristaImage from "@assets/generated_images/Barista_preparing_pour-over_coffee_2595947e.png";
import seatingImage from "@assets/generated_images/Elegant_café_seating_area_c0211f5f.png";
import beansImage from "@assets/generated_images/Coffee_roasting_and_beans_d9858847.png";
import readingImage from "@assets/generated_images/Person_reading_in_café_7b6f61c0.png";

export default function About() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground" data-testid="text-about-title">
              {t("about.title")}
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p data-testid="text-about-paragraph-1">
                {t("about.paragraph1")}
              </p>
              <p data-testid="text-about-paragraph-2">
                {t("about.paragraph2")}
              </p>
              <p data-testid="text-about-paragraph-3">
                {t("about.paragraph3")}
              </p>
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-4 lg:gap-6"
          >
            <div className="space-y-4 lg:space-y-6">
              <div className="overflow-hidden rounded-lg aspect-[3/4]">
                <img
                  src={baristaImage}
                  alt={t("about.title")}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  data-testid="img-about-barista"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-lg aspect-square">
                <img
                  src={beansImage}
                  alt={t("about.title")}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  data-testid="img-about-beans"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="space-y-4 lg:space-y-6 pt-8 lg:pt-12">
              <div className="overflow-hidden rounded-lg aspect-square">
                <img
                  src={seatingImage}
                  alt={t("about.title")}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  data-testid="img-about-seating"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-lg aspect-[3/4]">
                <img
                  src={readingImage}
                  alt={t("about.title")}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  data-testid="img-about-reading"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
