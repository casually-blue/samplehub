import { createResource, createEffect, For, createSignal } from "solid-js";

import styles from "../styles/Search.module.css";

import Sample from "./Sample";

export async function searchAPI(query) {
  if (query.query.trim() === "") return [];
  const response = await fetch(
    `http://localhost:1337/search/${encodeURI(query.query)}/${query.page}`
  );
  console.log(response);
  const results = await response.json();
  return results;
}

function Search(props) {
  var resultsref;
  var inputref;

  // Search query

  // Resource for search results
  const [data] = createResource(props.query, searchAPI);
  const [totalResults, setTotalResults] = createSignal(0);

  createEffect(() => {
    inputref.value = props.query().query;
  });

  return (
    <div>
      <div class={styles.searchInput}>
        <i class="bi bi-search"></i>
        <input
          onInput={() =>
            props.setQuery({query:document.getElementById("search").value, page:1})
          }
          id="search"
          type="text"
          placeholder="Search..."
          ref={inputref}
        />
      </div>
      <div class={styles.Search}>
        <p class={styles.filterHeader}>
          <i class="bi bi-funnel-fill"></i> Search Filters:
        </p>
        <div class={styles.options}>
          <div class={styles.option}>
            <i class="bi bi-key-fill"></i>
            <p>Key: </p>
            <select name="" id="">
              <option value="">Any</option>
            </select>
          </div>

          <div class={styles.option}>
            <i class="bi bi-activity"></i>
            <p>BPM: </p>
            <input placeholder="120" type="text" />
          </div>

          <div class={styles.option}>
            <i class="bi bi-music-note-list"></i>
            <p>Sample Type: </p>
            <select name="" id="">
              <option value="">Any</option>
              <option value="">Loop</option>
              <option value="">One shot</option>
            </select>
          </div>
        </div>
        <p class={styles.resultsInfoText}>
          Page {props.query().page}{" "}
          <span>About {totalResults()} results (0.6 seconds)</span>{" "}
          <Show when={totalResults() > 25}>
            <Show when={props.query().page > 1}>
              <i
                onClick={() =>
                  props.setQuery({
                    query: props.query().query,
                    page: props.query().page - 1,
                  })
                }
                class="bi bi-arrow-left"
              ></i>
            </Show>{" "}
            <i
              onClick={() =>
                props.setQuery({
                  query: props.query().query,
                  page: props.query().page + 1,
                })
              }
              class="bi bi-arrow-right"
            ></i>
          </Show>
        </p>
        <div class={styles.tableHeaderContainer}></div>

        <div ref={resultsref}>
          <For each={data()}>
            {(sample, i) => {
              if ("name" in sample) {
                return (
                  <Sample
                    {...sample}
                    setPlayingData={props.setPlayingData}
                    header={i() == 0}
                    identifier={Math.random().toString(36).slice(2, 7)}
                  />
                );
              } else {
                setTotalResults(sample.total);
              }
              return <></>;
            }}
          </For>
        </div>
      </div>
    </div>
  );
}

export default Search;
