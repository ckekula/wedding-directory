import { Input } from "@/components/ui/input";

//components
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ProfileSetting from "@/components/ProfileSetting";

const page = () => {
  return (
    <div>
      <Header />
      <ProfileSetting />
      <Footer />
    </div>
  );
};

export default page;
