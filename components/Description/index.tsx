import Section from "@/common/Section";
import styles from "./Description.module.css";

export const dynamic = "force-dynamic";

const Description = () => {
  return (
    <Section>
      <h3 className={styles.title}>Powered by AI, Designed by the community</h3>
      <div className={styles.descriptions}>
        <div className={styles.descItem}>
          <h6 className={styles.descTitle}>
            The Competition
          </h6>
          <p className={styles.descContent}>
            Lorem ipsum dolor sit amet consectetur. Morbi vulputate aliquet non sed volutpat. Nibh integer congue tortor proin. Massa dui et feugiat aliquam id neque. Tincidunt purus neque arcu feugiat augue. Ut elit nisl tincidunt diam dui congue lobortis. Vestibulum parturient ridiculus ac sit placerat quis dui congue. Venenatis ornare nunc sit quam maecenas. Odio lorem feugiat lorem imperdiet commodo morbi ut congue. Purus dis nec euismod feugiat nulla viverra vel at. Non ut lectus tortor augue aliquam auctor nullam odio urna. Pellentesque malesuada iaculis ac massa in cras ultrices orci.
          </p>
        </div>
        <div className={styles.descItem}>
          <h6 className={styles.descTitle}>
            About Clé de Peau
          </h6>
          <p className={styles.descContent}>
            Lorem ipsum dolor sit amet consectetur. Morbi vulputate aliquet non sed volutpat. Nibh integer congue tortor proin. Massa dui et feugiat aliquam id neque. Tincidunt purus neque arcu feugiat augue. Ut elit nisl tincidunt diam dui congue lobortis. Vestibulum parturient ridiculus ac sit placerat quis dui congue. Venenatis ornare nunc sit quam maecenas. Odio lorem feugiat lorem imperdiet commodo morbi ut congue. Purus dis nec euismod feugiat nulla viverra vel at. Non ut lectus tortor augue aliquam auctor nullam odio urna. Pellentesque malesuada iaculis ac massa in cras ultrices orci.
          </p>
        </div>
        <div className={styles.descItem}>
          <h6 className={styles.descTitle}>
            Prize
          </h6>
          <p className={styles.descContent}>
            Duis feugiat in imperdiet congue ac egestas fames laoreet volutpat. Fermentum gravida et potenti pulvinar in nam. Dignissim sagittis magna odio etiam urna tristique varius eu. Pharetra ut nibh ornare semper eget integer sem lorem. Sed lectus quis ullamcorper proin pretium dolor quis massa placerat.
          </p>
        </div>
        <div className={styles.descItem}>
          <h6 className={styles.descTitle}>
            About Kaite Rodgers
          </h6>
          <p className={styles.descContent}>
            Duis feugiat in imperdiet congue ac egestas fames laoreet volutpat. Fermentum gravida et potenti pulvinar in nam. Dignissim sagittis magna odio etiam urna tristique varius eu. Pharetra ut nibh ornare semper eget integer sem lorem. Sed lectus quis ullamcorper proin pretium dolor quis massa placerat.
          </p>
        </div>
      </div>
    </Section>
  )
}

export default Description;