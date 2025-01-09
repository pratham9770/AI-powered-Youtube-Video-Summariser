import styles from '../styles/components/Avatar.module.css';

const Avatar = ({ src = "https://t4.ftcdn.net/jpg/01/97/15/87/360_F_197158744_1NBB1dEAHV2j9xETSUClYqZo7SEadToU.jpg", alt = "Default avatar"}) => (
  <div className={styles.avatar}>
    {src ? <img src={src} alt={alt} /> : null}
  </div>
);

export default Avatar;
