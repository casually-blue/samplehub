import styles from "../styles/Player.module.css";

function Player(props) {
    return (
        <div class={styles.Player}>
            <img src={props.playingData().imgsrc} alt="" />
            <div class={styles.sampleInfo}>
                <b>{props.playingData().name}</b>
                <span>
                    <For each={props.playingData().audiosrc.split("/").slice(0, -1)}>
                        {(tag, i) => <a onClick={() => props.setQuery({query: props.playingData().audiosrc.split("/").slice(0, -1).slice(0,i()+1).join('>'), page: 1})}>{`${tag}${i()==props.playingData().audiosrc.split("/").length-2 ? "" : " > "}`}</a>}
                    </For>
                     <span class={styles.sampleNumbers}>1,349 <i class="bi bi-box-arrow-down"></i> 28 <i class="bi bi-heart"></i> 2 <i class="bi bi-arrow-down"></i></span></span>
            </div>
        </div>
    );
}

export default Player;