import ProcessWeFollow from "./ProcessWeFollow";
import Service from "./Service";
import WhyPartner from "./WhyPartner";

export default function HomePage() {
  return (
    <div className="bg-primary">
      <Service />
      <ProcessWeFollow />
      <WhyPartner />
    </div>
  );
}
