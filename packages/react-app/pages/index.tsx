import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import axios from "axios";

export default function Home() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const balance = useBalance({ address });
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [totalTransactions, setTotalTransactions] = useState<number | null>(
    null
  );

  useEffect(() => {
    setIsMounted(true);
    if (isConnected && address) {
      setUserAddress(address);

      const fetchTransactions = async () => {
        try {
          const apiUrl = "https://explorer.celo.org/mainnet/api";
          const today = new Date().toISOString().split("T")[0];
          const requestUrl = `${apiUrl}/?module=transaction&action=eth_get_balance&action=txlist&address=${address}&timeRange=${today}T00%3A00%3A00.000Z%2C${today}T23%3A59%3A59.999Z`;

          const response = await axios.get(
            "https://corsproxy.io/?" + encodeURIComponent(requestUrl)
          );
          const transactions = response.data;
          setTotalTransactions(transactions.length);
        } catch (error) {
          console.error("Error fetching transaction data:", error);
        }
      };

      //   fetchTransactions();
    }
  }, [address, isConnected]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col justify-between items-center">
      {isConnected ? (
        <>
          <div className="flex justify-center items-center space-x-2">
            <p className="font-semibold">{balance.data?.symbol}</p>
            <div>
              <p className="text-3xl text-center font-semibold">
                {balance.data?.decimals}
              </p>
              <p className="text-sm text-center font-extralight">
                Total Balance
              </p>
            </div>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M6.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.25 4.81V16.5a.75.75 0 0 1-1.5 0V4.81L3.53 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5Zm9.53 4.28a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V7.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div>
            {/* Body */}
            {totalTransactions}
          </div>
          <div className="w-full absolute bottom-0 p-4">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={() => setPrompt("Give me tips on ")}
                className="rounded-lg border cursor-pointer hover:bg-gray-200  flex p-2 border-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
                  <path
                    fillRule="evenodd"
                    d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span>Give me tips on...</span>
              </button>
              <button
                onClick={() => setPrompt("How much did i spend on ")}
                className="rounded-lg border cursor-pointer hover:bg-gray-200  flex p-2 border-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
                  <path
                    fillRule="evenodd"
                    d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span>How much did i spend on (mention day or time)</span>
              </button>
              <button
                onClick={() => setPrompt("New transaction: ")}
                className="rounded-lg border cursor-pointer hover:bg-gray-200  flex p-2 border-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span>New Transaction</span>
              </button>
              <button
                onClick={() => setPrompt("How do i earn with celo ")}
                className="rounded-lg border cursor-pointer hover:bg-gray-200 flex p-2 border-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                </svg>

                <span>How do i earn with celo</span>
              </button>
            </div>
            <div className="relative">
              <textarea
                className="p-2 w-full rounded-lg shrink-0"
                placeholder="Ask me anything about your finances or use the options above"
                value={prompt}
              ></textarea>
              <button className="absolute right-4 bottom-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>Please connect a wallet to get started</div>
      )}
    </div>
  );
}
