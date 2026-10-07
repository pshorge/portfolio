(() => {
  const projects = window.PORTFOLIO_PROJECTS || [];
  const grid = document.querySelector("#projects-grid");

  if (!grid) {
    return;
  }

  let activeCategory = "All";
  let activeTechnology = "All";

  function createTag(text) {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = text;
    return span;
  }

  function renderProjects() {
    grid.innerHTML = "";

    const visible = projects.filter((project) => {
      const categoryMatches =
        activeCategory === "All" ||
        project.categories.includes(activeCategory);

      const technologyMatches =
        activeTechnology === "All" ||
        project.technologies.includes(activeTechnology);

      return categoryMatches && technologyMatches;
    });

    for (const project of visible) {
      const article = document.createElement("article");
      article.className = "project-card";

      const imageWrapper = document.createElement("div");
      imageWrapper.className =
        `project-image ${project.imageMode || "wide"}`;

      const img = document.createElement("img");
      img.src = project.image;
      img.alt = project.title;
      img.loading = "lazy";

      imageWrapper.appendChild(img);

      const body = document.createElement("div");
      body.className = "project-body";

      const type = document.createElement("div");
      type.className = "project-type";
      type.textContent = project.type;

      const title = document.createElement("h3");
      title.textContent = project.title;

      const role = document.createElement("div");
      role.className = "project-role";
      role.textContent = project.role;

      const description = document.createElement("p");
      description.className = "project-description";
      description.textContent = project.description;

      const tags = document.createElement("div");
      tags.className = "tags";

      for (const tech of project.technologies) {
        tags.appendChild(createTag(tech));
      }

      body.append(type, title, role, description, tags);
      article.append(imageWrapper, body);

      grid.appendChild(article);
    }

    if (visible.length === 0) {
      const empty = document.createElement("p");
      empty.className = "section-copy";
      empty.textContent = "Brak projektów dla wybranych filtrów.";
      grid.appendChild(empty);
    }
  }

  function setupFilter(groupSelector, setter) {
    const buttons = document.querySelectorAll(groupSelector);

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((candidate) => {
          candidate.classList.remove("active");
        });

        button.classList.add("active");
        setter(button.dataset.value);
        renderProjects();
      });
    });
  }

  setupFilter(
    "[data-filter='category']",
    (value) => activeCategory = value
  );

  setupFilter(
    "[data-filter='technology']",
    (value) => activeTechnology = value
  );

  renderProjects();
})();
