"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type Podcast = {
  podcast_name: string;
  episode_number: number;
  text: string;
  speaker: string;
  id: string;
  num_words: number;
  embedding: null;
};

function PodcastItem({ podcast }: { podcast: Podcast }) {
  const displayedText = podcast.text; // .slice(0, 420).trim() + "...";
  return (
    <>
      <a
        href={`https://changelog.com/${podcast.podcast_name}/${podcast.episode_number}`}
        target="_blank"
        className="bg-gray-50 w-3/4 mt-10 rounded p-4 leading-loose"
      >
        <h2 className="text-xl font-bold">
          {podcast.podcast_name} #{podcast.episode_number}
        </h2>
        <div className="text-sm font-normal">{podcast.speaker}</div>
        <div className="text-xs font-light pt-2">{displayedText}</div>
      </a>
    </>
  );
}

export default function Home() {
  const allPodcastsFilterValue = "all";
  const [data, setData] = useState<Podcast[]>([]);
  const [options, setOptions] = useState<string[]>([allPodcastsFilterValue]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:8000/podcasts");
      const data: string[] = await res.json();
      setOptions((prevOptions) => [...prevOptions, ...data]);
    }

    fetchData();
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      searchInput: { value: string };
      podcastName: { value: string };
    };

    const inputValue = target.searchInput.value;
    const podcastName = target.podcastName.value;

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: "",
    };

    if (podcastName === allPodcastsFilterValue) {
      options.body = JSON.stringify({
        query: inputValue,
      });
    } else {
      options.body = JSON.stringify({
        query: inputValue,
        filters: {
          podcast_name: podcastName || allPodcastsFilterValue,
        },
      });
    }

    fetch("http://localhost:8000/search", options)
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData); // Update the data state with received data
      })
      .catch((err) => console.error(err));
  }

  return (
    <main className="flex flex-col items-center justify-between pb-40">
      <div className="absolute top-5 hidden w-full justify-between px-5 sm:flex">
        <div>
          <a href="/">
            <Image
              src="https://raw.githubusercontent.com/thechangelog/changelog.com/master/assets/static/images/brand/changelog-mark-dark.svg"
              width={30}
              height={30}
              alt="logo"
            />
          </a>
        </div>
        <div></div>
      </div>
      <div className="flex w-full items-center justify-center pt-16">
        <form method="post" onSubmit={handleSubmit} className="w-3/4">
          <div className="relative bg-slate-800 rounded">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400">
              {"~ $ "}
            </span>
            <input
              className="bg-slate-800 text-emerald-400 p-4 rounded w-full tracking-wider font-light pl-16"
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
        <PodcastItem podcast={item} key={item.id} />
      ))}
    </main>
  );
}
