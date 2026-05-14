import ClientReviews from "./ClientReviews";
import FeaturedProject from "./FeaturedProject";
import ProcessWeFollow from "./ProcessWeFollow";
import ProjectShowcase from "./ProjectShowcase";
import Service from "./Service";
import WhyPartner from "./WhyPartner";

export default function HomePage() {
  return (
    <div className="bg-primary">
      <ProjectShowcase />
      <Service />
      <ProcessWeFollow />
      <WhyPartner />
      <FeaturedProject />
      <ClientReviews />
    </div>
  );
}
