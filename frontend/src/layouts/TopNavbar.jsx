import { Bell, UserCircle } from "lucide-react";

function TopNavbar() {

  return (

    <header className="h-20 bg-white border-b shadow-sm flex justify-between items-center px-8">

      <div>

        <h2 className="text-2xl font-semibold">
          Leave Management System
        </h2>

      </div>

      <div className="flex items-center gap-5">

        <Bell className="cursor-pointer" />

        <div className="flex items-center gap-2">

          <UserCircle size={36} />

          <div>

            <h3 className="font-semibold">
              Welcome
            </h3>

            <p className="text-sm text-gray-500">
              Employee
            </p>

          </div>

        </div>

      </div>

    </header>

  );

}

export default TopNavbar;