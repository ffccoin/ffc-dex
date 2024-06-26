import TVLGraph from "@/components/tokens/TVLGraph";
import TokensTable from "@/components/tokens/TokensTable";
import VolumeGraph from "@/components/tokens/VolumeGraph";

const TokensPage = ({ searchParams }) => {
  const query = searchParams?.query || "";
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col w-full max-w-[87rem]">
        <div className="grid grid-cols-2 gap-5 md:gap-14 w-full px-5 md:px-10">
          <div className="bg-gray22/50 rounded-lg p-5 flex flex-col">
            <span className="text-gray15 text-sm">Force Finance TVL</span>
            <h1 className="text-3xl md:text-6xl mt-3">$75M</h1>
            <TVLGraph />
          </div>
          <div className="bg-gray22/50 rounded-lg p-5 flex flex-col">
            <span className="text-gray15 text-sm">Force Finance Volume</span>
            <h1 className="text-3xl md:text-6xl mt-3">$250M</h1>
            <VolumeGraph />
          </div>
        </div>
        <TokensTable query={query} />
      </div>
    </div>
  );
};

export default TokensPage;
