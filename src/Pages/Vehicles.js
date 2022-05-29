import React from "react";

function Vehicles() {
  return (
    <div className="flex overflow-hidden bg-white pt-16">
      <div
        className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
        id="sidebarBackdrop"
      ></div>
      <div
        id="main-content"
        className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
      >
        <main>
          <div className="pt-6 px-4">
            <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <h1>Vehicles</h1>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Vehicles;
