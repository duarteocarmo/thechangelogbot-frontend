"use client";
import { useState } from "react";
import Header from "@/components/HeaderView";
import PodcastItem from "@/components/PodcastItem";
import useSWR from "swr";

export default function Home() {
  const speakerChoices = ["Adam Stacoviak", "Jerod Santo"];
  const defaultSpeaker =
    speakerChoices[Math.floor(Math.random() * speakerChoices.length)];
  const [data, setData] = useState<string>("");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: optionsData, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/speakers`,
    fetcher,
    { dedupingInterval: 60000 }
  );

  const options = optionsData ? [...optionsData] : [defaultSpeaker];

  if (error) return <div>Error loading data</div>;
  if (!optionsData) return <div>Loading...</div>;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      searchInput: { value: string };
      speakerName: { value: string };
    };

    const inputValue = target.searchInput.value;
    const speakerName = target.speakerName.value;

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: inputValue,
        speaker: speakerName,
      }),
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, options)
      .then((response) => {
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
        <form method="post" onSubmit={handleSubmit} className="w-3/4">
          <label className="mb-2 text-gray-900 pr-3">Ask a question to </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/3 p-2.5 mb-8"
            name="speakerName"
            defaultValue={options[0]}
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
              placeholder={"What is test driven development?"}
              autoFocus
            />
          </div>
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

    </main>
  );
}
