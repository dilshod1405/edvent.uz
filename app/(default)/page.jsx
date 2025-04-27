export const metadata = {
    title: "Edvent.uz",
  };
import Hero from "@/components/banner-home";
import Features from "@/components/features";
import PageIllustration from "@/components/page-illustration";
import Testimonials from "@/components/testimonials";
import Workflows from "@/components/workflows";
import Cta from "@/components/cta";
import Header from "@/components/ui/header";

  
  export default function Home() {
    return (
      <>
        <Header />
        <PageIllustration />
        <Hero />
        <Workflows />
        <Features />
        <Testimonials />
        <Cta />
      </>
    );
  }
  