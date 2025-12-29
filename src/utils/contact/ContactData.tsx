import { RiBuilding2Fill, RiChat3Line, RiCustomerService2Line, RiMailSendLine } from "react-icons/ri";
import type { ContactMethod } from "../types/contact.type";

export const contactMethods: ContactMethod[] = [
    {
      id: '01',
      title: 'Our Office',
      desc: ' Main Street, Dhaka, Bangladesh',
      icon: <RiBuilding2Fill size={24} />,
    },
    {
      id: '02',
      title: 'Send Message',
      desc: "Let's work together, send your message to us hello@NetGlow.io",
      icon: <RiMailSendLine size={24} />,
    },
    {
      id: '03',
      title: 'Chat to Us',
      desc: 'Need help on your projects? We\'re ready to help. Click here to chat our customer service.',
      icon: <RiChat3Line size={24} />,
    },
    {
      id: '04',
      title: 'Let\'s Talk',
      desc: 'Need custom solutions? Our customer service will be happy to assist you',
      icon: <RiCustomerService2Line size={24} />,
    },
  ];