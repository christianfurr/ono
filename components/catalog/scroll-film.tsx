import Image from "next/image";
import styles from "./scroll-film.module.css";

const filmFrames = Array.from({ length: 8 }, (_, index) => ({
  src: `/images/sequence/oat-film-${String(index + 1).padStart(2, "0")}.webp`,
}));

const filmBeats = [
  {
    label: "Tonight",
    title: "The jar starts empty.",
    copy: "Oats, skim milk, yogurt, chia, honey, vanilla, and salt come together in one place.",
  },
  {
    label: "Overnight",
    title: "The quiet part does the work.",
    copy: "A thorough stir and a covered rest turn the base creamy while the kitchen goes dark.",
  },
  {
    label: "Tomorrow",
    title: "Morning is already made.",
    copy: "Stir once more, then add a small splash of skim milk when you want a looser spoonful.",
  },
] as const;

export function ScrollFilm() {
  return (
    <section className={styles.film} aria-labelledby="film-title">
      <header className={styles.intro}>
        <h2 id="film-title">Tonight, frame by frame.</h2>
        <p>
          An empty jar becomes tomorrow&apos;s breakfast. Scroll to move through
          the night.
        </p>
      </header>

      <div className={styles.sequence} data-scroll-film>
        <div className={styles.sticky}>
          <div className={styles.frames} aria-hidden="true">
            {filmFrames.map((frame, index) => (
              <figure
                className={styles.frame}
                data-film-frame
                key={frame.src}
              >
                <Image
                  alt=""
                  className={styles.frameImage}
                  fill
                  loading="lazy"
                  sizes="(max-width: 767px) 100vw, 100vw"
                  src={frame.src}
                />
                <figcaption>
                  {index === 0
                    ? "The beginning"
                    : index === filmFrames.length - 1
                      ? "Ready for morning"
                      : "The overnight base coming together"}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className={styles.filmEdge} aria-hidden="true">
            <span>OAT / NIGHT</span>
            <span>From evening to breakfast</span>
          </div>

          <ol className={styles.beats} aria-label="Overnight oat preparation">
            {filmBeats.map((beat) => (
              <li className={styles.beat} data-film-beat key={beat.label}>
                <p className={styles.beatLabel}>{beat.label}</p>
                <h3>{beat.title}</h3>
                <p className={styles.beatCopy}>{beat.copy}</p>
              </li>
            ))}
          </ol>

          <div className={styles.progress} aria-hidden="true">
            <span data-film-progress />
          </div>
        </div>
      </div>
    </section>
  );
}
