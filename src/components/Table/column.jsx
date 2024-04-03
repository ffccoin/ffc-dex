import { ColumnDef } from "@tanstack/react-table";

export const columns = [
  {
    accessorKey: "makerRate",
    header: "You Pay",
  },
  {
    accessorKey: "takerRate",
    header: "You Recieve",
  },
  {
    accessorKey: "OrderRates",
    header: "Order Rates",
  },
  {
    accessorKey: "createdAt",
    header: "Created/Expiration",
  },
  {
    accessorKey: "takerAsset",
    header: ({ column }) => "Created/Expiration",
    cell: ({ row }) => {
      const logoURI = row.getValue("takerAsset");
      return (
        <div className="flex w-[100px] items-center">
          {logoURI && (
            <img
              className="mr-2 h-4 w-4 text-muted-foreground"
              src={logoURI}
              alt="Logo"
            />
          )}
        </div>
      );
    },
  },
];
