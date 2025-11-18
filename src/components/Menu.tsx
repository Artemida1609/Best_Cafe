import { useState, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { menuItems } from "@/data/menu";

// Image imports
import cappuccinoImg from "@assets/generated_images/Cappuccino_with_latte_art_881fb889.png";
import espressoImg from "@assets/generated_images/Espresso_shot_close-up_5da32f4e.png";
import coldbrewImg from "@assets/generated_images/Iced_cold_brew_coffee_32cba3e4.png";
import matchaImg from "@assets/generated_images/Matcha_latte_beverage_45108503.png";
import tiramisuImg from "@assets/generated_images/Tiramisu_dessert_slice_8fa810ef.png";
import cheesecakeImg from "@assets/generated_images/Cheesecake_with_berries_9fd3d1ef.png";
import brownieImg from "@assets/generated_images/Chocolate_brownie_dessert_3909ed7f.png";
import croissantImg from "@assets/generated_images/Fresh_flaky_croissant_d74fee48.png";
import cinnamonImg from "@assets/generated_images/Cinnamon_roll_pastry_55bc7b75.png";
import muffinImg from "@assets/generated_images/Blueberry_muffin_pastry_56f357b2.png";
import orangeImg from "@assets/generated_images/Fresh_orange_juice_27503374.png";
import avocadoImg from "@assets/generated_images/Avocado_toast_brunch_item_a9377d8d.png";

const imageMap: Record<string, string> = {
  cappuccino: cappuccinoImg,
  espresso: espressoImg,
  coldbrew: coldbrewImg,
  matcha: matchaImg,
  tiramisu: tiramisuImg,
  cheesecake: cheesecakeImg,
  brownie: brownieImg,
  croissant: croissantImg,
  cinnamon: cinnamonImg,
  muffin: muffinImg,
  orange: orangeImg,
  avocado: avocadoImg,
};

export default function Menu() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const ref = useRef(null);
  // Use smaller threshold for mobile devices
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "-50px" });

  const categories = [
    { key: "all", label: t("menu.all") },
    { key: "coffee", label: t("menu.coffee") },
    { key: "desserts", label: t("menu.desserts") },
    { key: "pastries", label: t("menu.pastries") },
    { key: "drinks", label: t("menu.drinks") },
  ];

  const categoryMap: Record<string, string> = {
    coffee: "Кава",
    desserts: "Десерти",
    pastries: "Випічка",
    drinks: "Напої",
  };

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") {
      return menuItems;
    }
    const categoryKey = categoryMap[selectedCategory];
    return menuItems.filter((item) => item.category === categoryKey);
  }, [selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="menu" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-card min-h-[400px] relative z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4" data-testid="text-menu-title">
            {t("menu.title")}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-menu-subtitle">
            {t("menu.subtitle")}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={selectedCategory === category.key ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.key)}
              className="px-4 sm:px-6 py-2 text-sm sm:text-base"
              data-testid={`button-category-${category.key}`}
            >
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20" data-testid="empty-menu">
            <p className="text-xl text-muted-foreground">{t("menu.empty")}</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "visible"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {filteredItems.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <Card className="overflow-hidden group hover-elevate active-elevate-2 transition-all duration-300" data-testid={`card-menu-item-${item.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={imageMap[item.image] || cappuccinoImg}
                      alt={t(`menu.items.${item.image}.name`)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      data-testid={`img-menu-${item.image}`}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-serif text-xl font-bold text-foreground" data-testid={`text-menu-name-${item.id}`}>
                        {t(`menu.items.${item.image}.name`)}
                      </h3>
                      <span className="font-bold text-primary text-lg whitespace-nowrap" data-testid={`text-menu-price-${item.id}`}>
                        {item.priceEUR?.toFixed(2) || (item.price / 48.98).toFixed(2)} €
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`text-menu-description-${item.id}`}>
                      {t(`menu.items.${item.image}.description`)}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
