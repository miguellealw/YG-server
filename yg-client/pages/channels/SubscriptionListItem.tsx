import { useEffect, useState } from "react";
import Image from "next/image";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import {
  DotsVerticalIcon,
  ExternalLinkIcon,
  HandIcon,
} from "@heroicons/react/outline";
import Dropdown from "../../components/Dropdown";
import { PlusCircleIcon } from "@heroicons/react/solid";

export interface SubscriptionListItem {
  name: string;
  description?: string;
  thumbnail: any;
  channelId: string;
  // addChannelToCategory: (categoryId: string, channelName: string, channelId: string) => void;
}

const SubscriptionListItem: React.FC<SubscriptionListItem> = ({
  name,
  description,
  thumbnail,
  channelId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "SUB_ITEM",
    item: { name, id: channelId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  useEffect(() => {
    // For react-dnd
    preview(getEmptyImage(), { captureDraggingState: true });
  });

  return (
    <div
      className={`bg-black translate shadow-sm flex flex-col lg:flex-row items-center rounded-md hover:shadow-md overflow-hidden relative ${
        isDragging && "translate opacity-50 transform scale-90"
      }`}
      ref={drag}
      role="Subscription"
    >
      <DotsVerticalIcon
        className="w-5 h-5 absolute text-white hover:text-black top-0 right-0 m-2 cursor-pointer z-20 hover:bg-gray-50 rounded-full"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      />
      <span title={`Drag ${name} to Category`}>
        <HandIcon className="w-5 h-5 absolute text-white opacity-20 hover:opacity-100 top-0 left-0 m-2 cursor-move z-20" />
      </span>

      <Dropdown isOpen={isOpen}>
        <Dropdown.Item>
          <span className="flex">
            <PlusCircleIcon className="w-4 h-4 mr-1"/>
            Add to Category
          </span>
        </Dropdown.Item>
        <Dropdown.Item>
          <a
            href={`https://www.youtube.com/channel/${channelId}`}
            // target="_blank"
            className="flex"
          >
            <ExternalLinkIcon className="w-4 h-4 mr-1" />
            Go to Channel
          </a>
        </Dropdown.Item>
      </Dropdown>

      <Image
        src={thumbnail.url}
        alt={`${name}'s thumbnail`}
        className="w-full h-full object-cover object-center transition opacity-30 hover:opacity-60"
        width={200}
        height={200}
      />

      {/* Name */}
      <span className="font-bold w-32 truncate text-sm lg:font-base absolute bottom-2 left-2 text-white">
        {name}
      </span>
    </div>
  );
};

export default SubscriptionListItem;
