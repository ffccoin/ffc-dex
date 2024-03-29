"use client";

const TokensTable = () => {
  return (
    <div className="text-white p-5 flex flex-col gap-5 max-w-full overflow-x-auto">
      <h1 className="text-2xl">Tokens</h1>
      <table class="table-fixed">
        <thead>
          <tr>
            <th>#</th>
            <th>Token Name</th>
            <th>Price</th>
            <th>1 hour</th>
            <th>1 day</th>
            <th>FDV</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              Ethereum <span className="text-gray17">ETH</span>
            </td>
            <td>$3506.12</td>
            <td>0.00%</td>
            <td>0.10%</td>
            <td>$10.7B</td>
            <td>$48.8M</td>
            <td>Graph</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TokensTable;
