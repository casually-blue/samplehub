import styles from '../styles/UploadModal.module.css';

function UploadModal() {

    return (
        <div class={styles.uploadModal}>
          <h1>Drop your samples or sample packs here</h1>
          <i class="bi bi-file-earmark-arrow-up"></i>
          <p>Accepted filetypes: .mp3, .wav, .zip</p>
        </div>
    );
}

export default UploadModal;