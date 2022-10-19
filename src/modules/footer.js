import "../styles/footer.css"

export const footer = () => {
  const div = document.createElement("div");
  div.classList.add("footer");
  div.innerHTML = ` Copyright &copy; 2022 Roopaksh <a href="https://github.com/Roopaksh1" target="_blank" rel="noreferrer"><i className="fa-brands fa-github fa-lg"></i></a>`;
  return div;
};
