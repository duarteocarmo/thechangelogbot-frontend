"use client";
import { useState, useRef, useEffect } from "react";
import Header from "@/components/HeaderView";
import Footer from "@/components/FooterView";
import useSWR from "swr";

export default function Home() {
  const speakerChoices = ["Adam Stacoviak", "Jerod Santo", "Gerhard Lazu"];
  const defaultSpeaker =
    speakerChoices[Math.floor(Math.random() * speakerChoices.length)];
  const [data, setData] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [hideExamples, setHideExamples] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (shouldSubmit) {
      handleSubmit();
      setShouldSubmit(false); // Reset the flag after submission
    }
  }, [shouldSubmit, handleSubmit]);

  const examples = [
    { speaker: "Gerhard Lazu", query: "What makes good DevOps?" },
    { speaker: "Daniel Whitenack", query: "What are embeddings?" },
    {
      speaker: "Jerod Santo",
      query: "How to build a successful podcast platform?",
    },
  ];

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: optionsData, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/speakers`,
    fetcher,
    { dedupingInterval: 60000 }
  );

  const options = optionsData ? [...optionsData] : [defaultSpeaker];
  const [speakerName, setSpeakerName] = useState<string>(options[0]);

  if (error) return <div>Error loading data</div>;
  if (!optionsData) return <div>Loading...</div>;

  function handleExampleClick(speaker: string, query: string) {
    setSpeakerName(speaker);
    setSearchInput(query);
    setShouldSubmit(true);
    setHideExamples(true);
  }

  function handleSubmit(event?: React.FormEvent<HTMLFormElement>) {
    if (event) event.preventDefault();

    setIsLoading(true);

    const inputValue = searchInput;
    const selectedSpeakerName = speakerName;

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: inputValue,
        speaker: selectedSpeakerName,
      }),
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, options)
      .then((response) => {
        setIsLoading(false);
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let chatText = "";

        async function handleStream(): Promise<void> {
          const { done, value } = await reader.read();
          if (done) return;
          chatText += decoder.decode(value);
          setData(chatText);
          await handleStream();
        }

        return handleStream();
      })
      .catch((err) => console.error(err));
  }

  return (
    <main className="flex flex-col items-center justify-between pb-40">
      <Header />
      <div className="flex w-full items-center justify-center pt-4">
        <form
          method="post"
          onSubmit={handleSubmit}
          className="w-3/4"
          ref={formRef}
        >
          <label className="mb-2 text-gray-900 pr-3">Ask a question to </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/3 p-2.5 mb-8"
            name="speakerName"
            value={speakerName}
            onChange={(e) => setSpeakerName(e.target.value)}
          >
            {options.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <div className="relative bg-slate-800 rounded">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-changelog-green">
              {"~ $ "}
            </span>
            <input
              className="bg-slate-800 text-changelog-green p-4 rounded w-full tracking-wider font-light pl-16"
              name="searchInput"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              autoFocus
            />
          </div>

          {!hideExamples && (
            <div className="flex flex-col space-y-4 border-t border-gray-200 bg-gray-50 p-7 sm:p-10">
              {examples.map((item, index) => (
                <div
                  key={index}
                  className="rounded-md border border-gray-200 bg-white px-5 py-3 text-left text-sm text-gray-500 transition-all duration-75 hover:border-black hover:text-gray-700 active:bg-gray-50"
                  onClick={() => handleExampleClick(item.speaker, item.query)}
                >
                  Ask {item.speaker}: &quot;{item.query}&quot;
                </div>
              ))}
            </div>
          )}
          <button type="submit" className="hidden">
            Submit
          </button>
        </form>
      </div>

      {data && (
        <div className="bg-gray-50 w-3/4 mt-10 rounded p-4 leading-loose">
          <div className="font-normal">{data}</div>
        </div>
      )}

      {isLoading && (
        <div className="bg-gray-50 w-3/4 mt-10 rounded p-4 leading-loose">
          <div className="font-normal">Generating response...</div>
        </div>
      )}

      <Footer />
    </main>
  );
}
