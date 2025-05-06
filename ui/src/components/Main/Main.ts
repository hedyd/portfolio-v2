import styles from "./Main.module.scss";
import sidePanelStyles from "../SidePanel/SidePanel.module.scss";

const buttons = document.querySelectorAll(`.${sidePanelStyles.button}`);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonId = button.getAttribute("data-id");
    const selectedProject = document.getElementById(`${buttonId}`);
    const projects = document.querySelectorAll(`.${styles.project}`);
    projects.forEach((project) => project.classList.remove(styles.visible));
    selectedProject?.classList.add(styles.visible);
  });
});
