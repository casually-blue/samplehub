import { createSignal, onMount } from "solid-js";

import styles from "./styles/App.module.css";

// Components
import Header from "./components/Header";
import Search from "./components/Search";
import UploadModal from "./components/UploadModal";
import Player from "./components/Player";

function App() {
  const [dropzoneVisibility, setDropzoneVisibility] = createSignal(false);
  const [playingData, setPlayingData] = createSignal(null);
  const [query, setQuery] = createSignal({query: "kick", page: 1});

  return (
    <div
      onDragEnter={() => setDropzoneVisibility(!dropzoneVisibility())}
      onDragLeave={() => setDropzoneVisibility(!dropzoneVisibility())}
      class={styles.App}
    >
      <Show when={playingData() != null}>
        <Player setQuery={setQuery} playingData={playingData} />
      </Show>

      <Show when={dropzoneVisibility()}>
        <UploadModal />
      </Show>

      <Header />
      <Search query={query} setQuery={setQuery} setPlayingData={setPlayingData} />
    </div>
  );
}

export default App;
