import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

const Profile = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="p-6">
      {/* 👇 Inline heading with hamburger */}
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">My Profile</h1>
      </div>

      {/* 👇 Profile Details */}
      <div className="bg-white p-4 rounded shadow">
        <p><strong>Name:</strong> Anoosha Habib</p>
        <p><strong>Email:</strong> anoosha@example.com</p>
        <p><strong>Designation:</strong> Frontend Developer</p>
      </div>
    </div>
  );
};

export default Profile;
