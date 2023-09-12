"use client";
import { useState } from "react";
import Header from "@/components/HeaderView";
import Footer from "@/components/FooterView";
import PodcastItem from "@/components/PodcastItem";
import useSWR from "swr";

export default function Home() {
  const allPodcastsFilterValue = "all";
  const [data, setData] = useState<Podcast[]>([]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: optionsData, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/podcasts`,
    fetcher,
    { dedupingInterval: 60000 }
  );

  const options = optionsData
    ? [allPodcastsFilterValue, ...optionsData]
    : [allPodcastsFilterValue];

  if (error) return <div>Error: We're probably updating the database</div>;
  if (!optionsData) return <div>Loading...</div>;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      searchInput: { value: string };
      podcastName: { value: string };
    };

    const inputValue = target.searchInput.value;
    const podcastName = target.podcastName.value;

    const requestBody: SearchRequestBody = {
      query: inputValue,
    };

    if (podcastName !== allPodcastsFilterValue) {
      requestBody.filters = { podcast: podcastName };
    }

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/search`, options)
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
      })
      .catch((err) => console.error(err));
  }

  return (
    <main className="flex flex-col items-center justify-between pb-40">
      <Header />
      <div className="flex w-full items-center justify-center pt-4">
        <form method="post" onSubmit={handleSubmit} className="w-3/4">
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
          <details className="text-sm">
            <summary className="text-gray-800 mt-2">Advanced</summary>
            <label className="mb-2 text-gray-900 pr-3">Filter by show</label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/3 p-2.5"
              name="podcastName"
              defaultValue={options[0]}
            >
              {options.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </details>
          <button type="submit" className="hidden">
            Submit
          </button>
        </form>
      </div>

      {data.map((item: Podcast) => (
        <PodcastItem podcast={item} key={item._hash} />
      ))}

      <Footer />
    </main>
  );
}
