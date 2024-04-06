import { ColumnDef } from "@tanstack/react-table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
export const columns = [
  {
    accessorKey: "makerAsset",
    header: ({ column }) => "You Pay",
    cell: ({ row }) => {
      const makerAsset = row.getValue("makerAsset");
      const logoURI = makerAsset.logoURI;
      const makerAssetName = makerAsset.symbol;
      const amount = makerAsset.amount;
      return (
        <div className="flex w-[100px] items-center">
          {logoURI && (
            <div className="flex flex-row items-center">
              <img
                className="mr-2 h-6 w-6 text-muted-foreground"
                src={logoURI}
                alt="Logo"
              />
              <div className="flex flex-col">
                <p className="text-gray12">{makerAssetName}</p>
                <HoverCard>
                  <HoverCardTrigger>
                    <p className="text-xs">{parseFloat(amount).toFixed(6)}</p>
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-[#23272f] w-auto">
                    <p className="text-xs">{amount}</p>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "takerAsset",
    header: ({ column }) => "You Pay",
    cell: ({ row }) => {
      const takerAsset = row.getValue("takerAsset");
      const logoURI = takerAsset.logoURI;
      const takerAssetName = takerAsset.symbol;
      const amount = takerAsset.amount;
      return (
        <div className="flex w-[100px] items-center">
          {logoURI && (
            <div className="flex flex-row items-center">
              <img
                className="mr-2 h-6 w-6 text-muted-foreground"
                src={logoURI}
                alt="Logo"
              />
              <div className="flex flex-col">
                <p className="text-gray12">{takerAssetName}</p>
                <HoverCard>
                  <HoverCardTrigger>
                    <p className="text-xs">{parseFloat(amount).toFixed(6)}</p>
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-[#23272f] w-auto">
                    <p className="text-xs">{amount}</p>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "orderRates",
    header: ({ column }) => "Order rates",
    cell: ({ row }) => {
      const orderRates = row.getValue("orderRates");
      return <div className="flex text-xs gap-1">{orderRates}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => "Created/Expiration",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt");
      const utcDate = new Date(createdAt);
      const options = { hour: "2-digit", minute: "2-digit" };
      const localDateString = utcDate.toLocaleDateString(); // Get local date
      const localTimeString = utcDate.toLocaleTimeString(undefined, options);

      return (
        <div className="flex text-xs gap-1">
          <p className="">{localDateString}</p>
          <p className="text-gray12">{localTimeString}</p>
        </div>
      );
    },
  },
];
