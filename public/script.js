const urlParams = new URLSearchParams(window.location.search);
const date = urlParams.get("date");
//console.log(date);

fetch(`/data=${date}`)
  .then((res) => res.json())
  .then((data) => {
    // const container = document.getElementById('astro-container');
    const dataNasa = data;
    // console.log(data);
    if (!data) {
      container.innerHTML = "No data found";
      return;
    }

    // const container = document.createElement("div");
    // const properties = Object.entries(dataNasa);
    // console.log(properties);

    // const htmlContent = properties.map(([key, value]) => {
    //   return `<p><strong>${key}:</strong> ${value}</p>`;
    // }).join("");

    const titre = document.getElementById("titre");
    const astroTitre = dataNasa.title;
    titre.textContent = astroTitre;

    const aDate = document.getElementById("astroDate");
    const astroDate = dataNasa.date;
    aDate.textContent = "Date: " + astroDate;
    titre.append(aDate);

    const astroDay = dataNasa.url;
    const imgElement = document.getElementById("astroDay");
    imgElement.src = astroDay;
    imgElement.style.display = "block";

    const media = document.getElementById("mediatype");
    const mediatype = dataNasa.media_type;
    media.textContent = "Media Type: " + mediatype;

    const divImg = document.querySelector(".Conteneur-image");
    divImg.append(astroDay);
    divImg.append(media);

    const description = document.getElementById("explanation");
    const astroExp = dataNasa.explanation;
    description.textContent = "DESCRIPTION : " + astroExp;

    // const main = document.querySelector("#main");
    const article = document.querySelector(".Conteneur-astro");

    article.append(titre);
    article.append(divImg);
    // article.append(aDate);
    article.append(description);

    const main = document.querySelector("#main");
    main.append(article);

    // .... creer le div

    // document.body.appendChild(description);

    // // Set it into the container
    // container.innerHTML = htmlContent;
    // document.body.appendChild(container);
  })
  .catch((err) => {
    console.error("Fetch error:", err);
    document.body.innerHTML = "Failed to load data.";
  });
