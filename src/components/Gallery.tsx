import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

import cappuccinoImg from "@assets/generated_images/Cappuccino_with_latte_art_881fb889.png";
import latteArtImg from "@assets/generated_images/Latte_art_tulip_pattern_09082f1b.png";
import coldbrewImg from "@assets/generated_images/Iced_cold_brew_coffee_32cba3e4.png";
import baristaImg from "@assets/generated_images/Barista_preparing_pour-over_coffee_2595947e.png";
import seatingImg from "@assets/generated_images/Elegant_café_seating_area_c0211f5f.png";
import coffeeBarImg from "@assets/generated_images/Coffee_bar_counter_detail_bc480fa8.png";
import varietyImg from "@assets/generated_images/Coffee_variety_flat_lay_8654a2a1.png";
import readingImg from "@assets/generated_images/Person_reading_in_café_7b6f61c0.png";
import croissantImg from "@assets/generated_images/Fresh_flaky_croissant_d74fee48.png";
import tiramisuImg from "@assets/generated_images/Tiramisu_dessert_slice_8fa810ef.png";
import cheesecakeImg from "@assets/generated_images/Cheesecake_with_berries_9fd3d1ef.png";
import cinnamonImg from "@assets/generated_images/Cinnamon_roll_pastry_55bc7b75.png";

const galleryImages = [
  { id: 1, src: cappuccinoImg, alt: "Cappuccino with latte art" },
  { id: 2, src: latteArtImg, alt: "Latte art tulip pattern" },
  { id: 3, src: baristaImg, alt: "Barista preparing coffee" },
  { id: 4, src: seatingImg, alt: "Cozy seating area" },
  { id: 5, src: coldbrewImg, alt: "Cold coffee drink" },
  { id: 6, src: coffeeBarImg, alt: "Coffee bar counter" },
  { id: 7, src: croissantImg, alt: "Fresh croissant" },
  { id: 8, src: tiramisuImg, alt: "Tiramisu" },
  { id: 9, src: varietyImg, alt: "Coffee variety" },
  { id: 10, src: readingImg, alt: "Person reading in café" },
  { id: 11, src: cheesecakeImg, alt: "Cheesecake with berries" },
  { id: 12, src: cinnamonImg, alt: "Cinnamon roll" },
];

export default function Gallery() {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const ref = useRef(null);
  // Use smaller threshold for mobile devices
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "-50px" });

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1
      );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="gallery" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-background min-h-[400px] relative z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4" data-testid="text-gallery-title">
            {t("gallery.title")}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-gallery-subtitle">
            {t("gallery.subtitle")}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "visible"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => openModal(index)}
              data-testid={`gallery-image-${index}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeModal}
            onKeyDown={(e) => {
              if (e.key === "Escape") closeModal();
              if (e.key === "ArrowLeft") prevImage();
              if (e.key === "ArrowRight") nextImage();
            }}
            data-testid="gallery-modal"
            role="dialog"
            aria-modal="true"
            aria-label={t("gallery.title")}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10"
              onClick={closeModal}
              data-testid="button-close-modal"
              aria-label="Close"
              autoFocus
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 hidden md:flex"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              data-testid="button-prev-image"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 hidden md:flex"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              data-testid="button-next-image"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
              data-testid="img-modal-display"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
