import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { toast } = useToast();

  const bookingSchema = z.object({
    name: z.string().min(2, t("contact.booking.errors.name")),
    phone: z.string().min(10, t("contact.booking.errors.phone")),
    email: z.string().email(t("contact.booking.errors.email")),
    date: z.string().min(1, t("contact.booking.errors.date")),
    time: z.string().min(1, t("contact.booking.errors.time")),
    guests: z.number().min(1, t("contact.booking.errors.guests")).max(20, t("contact.booking.errors.guests")),
    message: z.string().optional(),
  });

  type BookingForm = z.infer<typeof bookingSchema>;

  const form = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      guests: 2,
      message: "",
    },
  });

  const onSubmit = (data: BookingForm) => {
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: t("contact.booking.success.title"),
        description: t("contact.booking.success.description"),
      });
      form.reset();
    }, 500);
  };

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
    <section id="contact" className="py-24 md:py-32 bg-card" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4" data-testid="text-contact-title">
            {t("contact.title")}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-contact-subtitle">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Booking Form */}
          <motion.div variants={itemVariants}>
            <Card className="p-8">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6" data-testid="text-booking-form-title">
                {t("contact.booking.title")}
              </h3>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("contact.booking.name")}</Label>
                    <Input
                      id="name"
                      {...form.register("name")}
                      placeholder={t("contact.booking.namePlaceholder")}
                      data-testid="input-name"
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("contact.booking.phone")}</Label>
                    <Input
                      id="phone"
                      {...form.register("phone")}
                      placeholder={t("contact.booking.phonePlaceholder")}
                      data-testid="input-phone"
                    />
                    {form.formState.errors.phone && (
                      <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("contact.booking.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder={t("contact.booking.emailPlaceholder")}
                    data-testid="input-email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">{t("contact.booking.date")}</Label>
                    <Input
                      id="date"
                      type="date"
                      {...form.register("date")}
                      data-testid="input-date"
                    />
                    {form.formState.errors.date && (
                      <p className="text-sm text-destructive">{form.formState.errors.date.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">{t("contact.booking.time")}</Label>
                    <Input
                      id="time"
                      type="time"
                      {...form.register("time")}
                      data-testid="input-time"
                    />
                    {form.formState.errors.time && (
                      <p className="text-sm text-destructive">{form.formState.errors.time.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">{t("contact.booking.guests")}</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max="20"
                      {...form.register("guests", { valueAsNumber: true })}
                      data-testid="input-guests"
                    />
                    {form.formState.errors.guests && (
                      <p className="text-sm text-destructive">{form.formState.errors.guests.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t("contact.booking.message")}</Label>
                  <Textarea
                    id="message"
                    {...form.register("message")}
                    placeholder={t("contact.booking.messagePlaceholder")}
                    rows={4}
                    data-testid="input-message"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                  data-testid="button-submit-booking"
                >
                  {form.formState.isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
                      {t("contact.booking.submitting")}
                    </span>
                  ) : (
                    t("contact.booking.submit")
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="p-6 flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{t("contact.info.address")}</h4>
                  <p className="text-muted-foreground" data-testid="text-address">
                    {t("contact.info.addressValue")}
                  </p>
                </div>
              </Card>

              <Card className="p-6 flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{t("contact.info.phone")}</h4>
                  <p className="text-muted-foreground" data-testid="text-phone">
                    +380 44 123 45 67
                  </p>
                </div>
              </Card>

              <Card className="p-6 flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{t("contact.info.email")}</h4>
                  <p className="text-muted-foreground" data-testid="text-email">
                    info@bestcafe.ua
                  </p>
                </div>
              </Card>

              <Card className="p-6 flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{t("contact.info.hours")}</h4>
                  <div className="text-muted-foreground space-y-1" data-testid="text-hours">
                    <p>{t("contact.info.weekdays")}</p>
                    <p>{t("contact.info.weekend")}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Google Maps */}
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.7635114818924!2d30.522499176854!3d50.450441971595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce50c17bb087%3A0x6c3e3f8d8e85d4c!2z0KXRgNC10YnQsNGC0LjQuiwg0JrQuNGX0LI!5e0!3m2!1suk!2sua!4v1700000000000!5m2!1suk!2sua"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
                data-testid="map-embed"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
