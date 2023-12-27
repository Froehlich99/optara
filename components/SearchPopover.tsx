import React from "react";
import { Popover } from "@headlessui/react";

const SearchPopover = () => {
  return (
    <Popover className="relative">
      {/* <Popover.Panel className="absolute z-10">
        <div className="grid grid-cols-2">
          <a href="/analytics">Analytics</a>
          <a href="/engagement">Engagement</a>
          <a href="/security">Security</a>
          <a href="/integrations">Integrations</a>
        </div>
      </Popover.Panel> */}
    </Popover>
  );
};

export default SearchPopover;
